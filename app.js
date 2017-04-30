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
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',function(req,res){
	
})

//Api to generate deck for new users
app.get('/deck/username',function(req,res){
	console.log("requested deck");
	console.log(req);
	// console.log(req.Url.query);
	console.log(req.query.username);
	// var username = req.Url.query;
	client.sismember('users',username,function(err,result){
		console.log(err,result);
		if(result==0){
			//Not a member

			client.sadd('users',username,function(err,re){
				client.sunionstore(username+':deck',deck,function(err,resp){
					//prepared deck
					// console.log(err,res);
					client.smembers(username+':deck',function(err,resp){
						// var result = res;
						res.send(resp);
					})	
				})	
			})
		}else{
			client.smembers(username+':deck',function(err,resp){
				// var result = res;
				res.send(resp);
			})
		}
	})
})


app.listen(3000);
console.log('Listening on port 3000...');