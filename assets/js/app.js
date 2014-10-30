function start(){
  addNewExercise();
  console.log("Starting engine");
}
// function addNewExercise(){
//   console.log("Enable add new exercise");
//
//   var exerciseCounter = 1;
//
//
//
// }

function addExcercisesSets(exerciseCounter){
  var counter = "exercise"+String(exerciseCounter)+"Counter";
  var setCounter = 1;
  console.log(counter);
  $('#ex'+exerciseCounter+' .addSet' ).click(function(event) {
    event.preventDefault();
    //this.closest length + 1

    $(".addSet").attr("href", "#set"+counter)
    $('#ex'+exerciseCounter+' .boxContent').append("<div class='row'><div class='col-1-2'><label for='set" + setCounter + "'>Set "+ setCounter +"</label></div><div class='col-1-2' id='set" + counter + "'><input type='text' name='exerciseInfo[exercise"+exerciseCounter+"][set][set"+counter+"][name]'></div></div>");
    setCounter++
  });
}

function addNewExercise(){
  console.log("this")
  var exerciseCounter = 1;

  $(".addExercise").click(function(){
    event.preventDefault();
    $( ".hidden #ex" ).clone().appendTo( ".exercises" );
    $("#ex").attr("id", "ex"+exerciseCounter);
    $("#ex" + exerciseCounter + " .boxHeader").text("Exercise #"+exerciseCounter);
    addExcercisesSets(exerciseCounter);
    exerciseCounter++
  });
}
