// This hides The Game until the Start Button is Clicked On
$(".gameRow").hide();

// Clicking the Start Button will Start the Game
$("#startBtn").on("click", function() {
  $(".gameRow").show();
  $("#startBtn").hide();
});

var numberOfQuestions = 30;
var currentScore = "";

var results = "";
var question = "";
var correctAnswer = "";
var incorrectAnswer1 = "";
var incorrectAnswer2 = "";
var incorrectAnswer3 = "";


// The Function that renders the Question with Answer Choices
var question = $(this).attr("data-name");
var queryURL = "https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple";

// Creating an AJAX call for the specific movie button being clicked
$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response) {

  // results = response.results;
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

  $(".gameButton").click(function() {
    $(this).hide();
    $(".gameRow").hide();
    var questionDiv = $("<div>");
    questionDiv.addClass("question");
    questionDiv.html(response.results["0"].question);
    $(".question").html(question);

    document.getElementById("choices-div").appendChild(makeUL(options[0]));
    $(".gameButton").prop("onclick", null).off("click");

  });

});
// var choicesOrder = [correctAnswer, incorrectAnswer1, incorrectAnswer2, incorrectAnswer3]
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
// console.log(choices);

/////////////////////////////////////////////// END RANDOM SHUFFLE

// Display Question and Choices on Click

//Brandon's Testing here
// $(document).on("click", "li.answers", function() {
//
//   var usersGuess = $(this).text();
//
//   if (usersGuess == correctAnswer) {
//     alert("you are correct");
//   }
//end of Brandon's Testing
// });

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

    // Add it to the list:
    list.appendChild(item);

    //Brandon's Testing there
    // $("li").addClass("answer");
    //End Brandon's Testing
    // }

    // Finally, return the constructed list:
    return list;
  }

  // Display the choices

};
