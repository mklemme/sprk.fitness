function start(){
  addNewExercise();
  console.log("Starting engine");
}

var exerciseCounter = 0;


function addExcercisesSets(){
  var counter = "exercise"+String(exerciseCounter)+"Counter";
  var setCounter = 1;
  //console.log(counter);
  $('#ex'+exerciseCounter+' .addSet' ).click(function(event) {
    event.preventDefault();
    //this.closest length + 1

    $(".addSet").attr("href", "#set"+counter)
    $('#ex'+exerciseCounter+' .boxContent').append("<div class='row'><div class='col-1-2'><label for='set" + setCounter + "'>Set "+ setCounter +"</label></div><div class='col-1-2' id='set" + setCounter + "'><input type='text' name='exerciseInfo[exercise"+exerciseCounter+"][set][set"+setCounter+"][reps]'></div></div>");
    setCounter++
  });

  $('#ex'+exerciseCounter+' .removeExercise' ).click(function(event) {
    event.preventDefault();
    $('#ex'+exerciseCounter).remove();
    exerciseCounter--
    console.log(exerciseCounter);
  });
}

function addNewExercise(){
  console.log("this")
  $(".addExercise").click(function(){
    exerciseCounter++
    event.preventDefault();
    $( ".hidden #ex" ).clone().appendTo( ".exercises" );
    $("#ex").attr("id", "ex"+exerciseCounter);
    $("#ex" + exerciseCounter + " .boxHeader").text("Exercise #"+exerciseCounter);
    $("#ex" + exerciseCounter + " #workoutName").attr("name", "exerciseInfo[exercise"+ exerciseCounter +"][name]")
    addExcercisesSets();
    console.log(exerciseCounter);
  });
}
