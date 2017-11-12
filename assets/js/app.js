// This hides The Game until the Start Button is Clicked On
$("#gameGrid").hide();

// Clicking the Start Button will Start the Game
$("#startBtn").on("click", function() {
  $("#gameGrid").show();
  $("#startBtn").hide();
});

var numberOfQuestions = 30;

var results = "";
var question = "";
var correctAnswer = "";
var incorrectAnswer1 = "";
var incorrectAnswer2 = "";
var incorrectAnswer3 = "";

var playerScore = 0;
var pointValue = "";


// The Function that renders the Question with Answer Choices
var question = $(this).attr("data-name");
var queryURL = "https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple";

// Creating an AJAX call for the specific movie button being clicked
$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response) {

  results = response.results;
  // console.log(results);

  // Storing the question data
  question = response.results["0"].question;
  // console.log(question);

  correctAnswer = response.results["0"].correct_answer;
  // console.log(correctAnswer)

  incorrectAnswer1 = response.results["0"].incorrect_answers["0"];
  // console.log(incorrectAnswer1)

  incorrectAnswer2 = response.results["0"].incorrect_answers["1"];
  // console.log(incorrectAnswer2)

  incorrectAnswer3 = response.results["0"].incorrect_answers["2"];
  // console.log(incorrectAnswer3)

  var choicesOrder = [correctAnswer, incorrectAnswer1, incorrectAnswer2, incorrectAnswer3];
  // console.log(choicesOrder)

  /////////////////////////////////////////////// RANDOM SHUFFLE

  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  // Used like so
  var choices = [correctAnswer, incorrectAnswer1, incorrectAnswer2, incorrectAnswer3];
  arr = shuffle(choices);
  //console.log(arr);

  /////////////////////////////////////////////// END RANDOM SHUFFLE

  // Display Question and Choices on Click

  // var gamePlay = function() {
  //     // Some code
  // };


  $(".gameButton").click(function() {
    $("#gameGrid").hide();
    var questionDiv = $("<div>");
    questionDiv.addClass("question");
    questionDiv.html(response.results["0"].question);
    $(".question").html(question);


    // Display Answers
    var options = [
      choices = [correctAnswer, incorrectAnswer1, incorrectAnswer2, incorrectAnswer3]
    ];

    function makeUL(array) {
      // Create the list element:
      var list = document.createElement("ul");

      for (var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement("li");

        // Set its contents:
        item.appendChild(document.createTextNode(array[i]));
        $(item).addClass("answers");
        $(item).val($(item).val() + '100');

        // Add it to the list:
        list.appendChild(item);
      }

      // Finally, return the constructed list:
      return list;
    }

    // Display the choices
    document.getElementById("choices-div").appendChild(makeUL(arr));
    $(".gameButton").prop("onclick", null).off("click");
  });
});

$(document).on("click", "li.answers", function() {

  var usersGuess = $(this).text();
  var correctAnswer = results["0"].correct_answer;

  if (usersGuess == correctAnswer) {
    alert("correct!");

    //get point value from Button (this dont work)
    pointValue = $(this).val();
    console.log(pointValue);
    playerScore = playerScore + pointValue;
    $("#choices-div").empty();
    $("#question").empty();
    $("#gameGrid").show();


    //assign to var
    $("#playerScore").html(playerScore);
  } else {
    alert("incorrect!");
    playerScore = playerScore - pointValue;
    $("#choices-div").empty();
    $("#question").empty();
    $("#gameGrid").show();


  }
});

// scoring logic
