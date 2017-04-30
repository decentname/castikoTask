var correctCards = 0;
var username;
var cards = [];
$("#entry").click(function(){
  console.log('clicked');
  username = $("#user").val();
  console.log(username);
  getCards(username);
})

$("#again").click(function(){
  //remove user
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/removeUser/",
    data: {'username':username},
    success: function(data,textStatus,xhr){
      console.log(data);
      getCards(username);
    }
  });
})

$('#logout').click(function(){
  $('#content').css('display','none');
  $('#logout').css('display','none');
  $('#user').css("display","block");
$('#entry').css("display","block");
})



function getCards(username){

  $.ajax({
    type: "GET",
    url: "http://localhost:3000/deck/",
    data: {'username':username},
    success: function(data,textStatus,xhr){
      console.log(data);
      cards = data;
      $(init);
      // console.log(cards);
      // console.log(cards.length());
    }
  });
}
 
function popCards(username,val){
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/updateDeck/",
    data: {'username':username,'val':val},
    success: function(data,textStatus,xhr){
      console.log(data);
      // console.log(cards);
      // console.log(cards.length());
    }
  });
} 

function init() {
 
$('#logout').css("display","block");
$('#content').css("display","block");
$('#user').css("display","none");
$('#entry').css("display","none");

//   $('body').html(`<button id ="logout">Logout</button>
// <div id="content">
 
//   <div id="cardPile"> </div>
//   <div id="cardSlots"> </div>
 
//   <div id="successMessage">
//     <h2>You did it!</h2>
//     <button onclick="init()">Play Again</button>
//   </div>
 
// </div>
// <script src="main.js"></script>`);


  // Hide the success message
  $('#successMessage').hide();
  $('#successMessage').css( {
    left: '580px',
    top: '250px',
    width: 0,
    height: 0
  } );
 
  // Reset the game
  correctCards = 0;
  $('#cardPile').html( '' );
  $('#cardSlots').html( '' );
 
  // Create the pile of shuffled cards
  // var house = ["Heart","Diamond","Spade","Club"];
  var house = ["H","D","S","C"];
  var numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  numbers.sort( function() { return Math.random() - .5 } );
  house.sort( function() { return Math.random() - .5 } );
 

  var len = cards.length;
  for(var i =0;i<len;i++){
      $('<div>' + cards[i] + '</div>').data( 'house', cards[i][0] ).attr( 'id', 'card'+cards[i]).appendTo( '#cardPile' ).draggable( {
        containment: '#content',
        stack: '#cardPile div',
        cursor: 'move',
        revert: true
      } );
  }

  // Create the card slots
  var words = ['H','D','C','S'];
  for ( var i=1; i<=4; i++ ) {
    $('<div>' + words[i-1] + '</div>').data( 'house', words[i-1] ).appendTo( '#cardSlots' ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }
 
}

function handleCardDrop( event, ui ) {
  var slotHouse = $(this).data( 'house' );
  var cardHouse = ui.draggable.data( 'house' );
  var val = ui.draggable.text(); 
  // console.log(val);
  if ( slotHouse == cardHouse ) {
    ui.draggable.addClass( 'correct' );
    ui.draggable.draggable( 'disable' );
    // $(this).droppable( 'disable' );
    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    ui.draggable.draggable( 'option', 'revert', false );
    correctCards++;
    //spop each card
    popCards(username,val);
  } 
   
  // If all the cards have been placed correctly then display a message
  // and reset the cards for another go
 
  if ( correctCards == 52 ) {
    $('#successMessage').show();
    $('#successMessage').animate( {
      left: '380px',
      top: '200px',
      width: '400px',
      height: '100px',
      opacity: 1
    } );
  }
}

