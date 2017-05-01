var express = require('express');
var redis = require('redis');
var path = require('path');
var cors = require('cors')
var client = redis.createClient(6379,"127.0.0.1");
var app = express();
client.sadd('deck',["C1","C2","C3","C4","C5","C6","C7","C8","C9","C10","C11","C12","C13","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","H1","H2","H3","H4","H5","H6","H7","H8","H9","H10","H11","H12","H13","S1","S2","S3","S4","S5","S6","S7","S8","S9","S10","S11","S12","S13"],function(err,result){
	console.log(err,result);
});


app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
	res.render('index')
})

//Api to generate deck for new users
app.get('/deck/',function(req,res){
	console.log("requested deck");
	var username = req.query.username;
	client.sismember('users',username,function(err,result){
		console.log("ismember",result);
		if(result==0){
			//Not a member
			client.sadd('users',username,function(err,re){
				console.log("added user",re);
				client.sunionstore(username+':deck','deck',function(err,resp){
					//prepared deck
					console.log("union",resp);
					client.smembers(username+':deck',function(err,arr){
						// var result = res;
						console.log("userdeck",arr);
						res.send(arr);
						// res.render('index');
					})	
				})	
			})
		}else{
			client.smembers(username+':deck',function(err,resp){
				res.send(resp);
				// res.render('index');
			})
		}
	})
})

app.get('/updateDeck/',function(req,res){
	// console.log("pressed");
	var username = req.query.username;
	var card = req.query.val;
	var deck = username+':deck';
	console.log(card);
	client.srem(deck,card,function(err,resp){
		// console.log("srem",err,res);
		client.scard(deck,function(err,result){
			res.send(result.toString());
		})
	})
})


app.get('/removeUser/',function(req,res){
	var username = req.query.username;
	// var card = req.query.val;
	var deck = username+':deck';
	client.srem('users',username,function(err,resp){
		client.del(username+":deck",function(err,re){
			// console.log(re);
			res.send(re);
		})
	})
})


app.listen(3000);
console.log('Listening on port 3000...');