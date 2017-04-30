var correctCards = 0;
$(init);
// var username;

// $("#entry").click(function(){
//   console.log('clicked');
//   username = $("#user").val();
//   ajax_call(username);
// })


// function ajax_call(username){

//   $.ajax({
//     type: "GET",
//     url: "http://localhost:3000/deck/username",
//     data: username,
//     success: function(data,textStatus,xhr){
//       console.log(data);
//       init(data);
//     }
//   });
// }
 
function init() {
 
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
 


  for(var j=0;j<4;j++){
    for (var i=0; i<13;i++) {
      $('<div>' + house[j] + numbers[i] + '</div>').data( 'house', house[j] ).attr( 'id', 'card'+house[j]+numbers[i]).appendTo( '#cardPile' ).draggable( {
        containment: '#content',
        stack: '#cardPile div',
        cursor: 'move',
        revert: true
      } );
    }
  }
 
  // Create the card slots
  // var words = [ 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten' ];
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
  if ( slotHouse == cardHouse ) {
    ui.draggable.addClass( 'correct' );
    ui.draggable.draggable( 'disable' );
    // $(this).droppable( 'disable' );
    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    ui.draggable.draggable( 'option', 'revert', false );
    correctCards++;
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

