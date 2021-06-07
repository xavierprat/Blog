/**
 * @Author: xavier
 * @Date:   2020-04-24T11:07:58-05:00
 * @Last modified by:   xavier
 * @Last modified time: 2020-05-21T21:14:11-05:00
 */

function init(info) {

  $('#successMessage').hide();
  $('#successMessage').css({
    left: '580px',
    top: '250px',
    width: 0,
    height: 0
  });

  // Reset the game
  correctCards = 0;
  $('#cardPile').html('');
  $('#cardSlots').html('');

  // create the cards with names
  //save the info array
  infoSave = [];
  for (var i=0; i<info.length; i++){
    infoSave.push(info[i]);
  }
  // randomize card order
  info.sort(function(){ return Math.random() - 0.5});
  for (i=0; i< info.length; i++){
    var event = info[i];
    $('<div>' + event.name + '</div>').data('name',event.name).appendTo('#cardPile').draggable({
      //containment: '#content',
      stack: '#cardPile div',
      scroll: false,
      cursor: 'move',
      revert: true
    });
  }
  // Create the card slots
  // randomize slots order
  var nCards = infoSave.length;
  for (var i = 0; i < nCards; i++) {
    // Create the dates in the right order
    var date = infoSave[i].date;
    var name = infoSave[i].name;
    //background:
    $('<div class="solution" style="background-color: '+date+';" >'+date+' </div>').data('name', name).appendTo('#cardSlots').droppable({
      accept: '#cardPile div',
      hoverClass: 'hovered',
      scroll: false,
      drop: handleCardDrop
    });
  }
}

function handleCardDrop(event, ui) {
     var slotNumber = $(this).data('name');
     var cardNumber = ui.draggable.data('name');
     var nCards = infoSave.length;

     if (slotNumber == cardNumber) {
         ui.draggable.addClass('correct');
         ui.draggable.draggable('disable');
         $(this).droppable('disable');
         ui.draggable.position({
             of: $(this),
             my: 'left top',
             at: 'left top',
             using: function (css, calc) {
                 $(this).animate(css, 200, "linear");
             }
         });
         ui.draggable.draggable('option', 'revert', false);
         correctCards++;
     }

     // If all the cards have been placed correctly then display a message
     // and reset the cards for another go

     if (correctCards == nCards) {
         $('#successMessage').show();
         $('#successMessage').animate({
             left: '380px',
             top: '200px',
             width: '400px',
             height: '100px',
             opacity: 1
         });
     }

}
