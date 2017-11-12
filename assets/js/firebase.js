console.log("firebase.js loaded b");

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCnD00DCXAEUzyEJQVNwA7yI7G5OUstYHs",
  authDomain: "chat-test-56e7c.firebaseapp.com",
  databaseURL: "https://chat-test-56e7c.firebaseio.com",
  projectId: "chat-test-56e7c",
  storageBucket: "chat-test-56e7c.appspot.com",
  messagingSenderId: "1003382859041"
};
firebase.initializeApp(config);

var database = firebase.database();

//begin database js File
var loginData = database.ref("/login");
var playersRef = database.ref("players");
var scoreData = database.ref("/scores");
var currentPlayers = null;
var currentTurn = null;
var playerNum = false;
var playerOneExists = false;
var playerTwoExists = false;
var playerOneData = null;
var playerTwoData = null;

//auth js File

var provider = new firebase.auth.FacebookAuthProvider();
var displayName = "";

firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // ...
    console.log(token);
    displayName = result.user.displayName;
    $("#player1").html(displayName);

    console.log(displayName);
    console.log("connected to Facebook");


    var loginObj = {
      name: displayName,
      time: firebase.database.ServerValue.TIMESTAMP

    };

    console.log(loginObj);

    loginData.push(loginObj);

  }
  // The signed-in user info.
  var user = result.user;
  console.log(user);
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  console.log("error code: " + errorCode);
  console.log("error message: " + errorMessage);

  // ...
});

firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});

//log on and log off button on click events

$("#facebookBtn").on("click", function() {
  firebase.auth().signInWithRedirect(provider);
  $("#facebookBtn").hide();
  $("#logOffFacebook").show();

});

$("#logOffFacebook").on("click", function() {
  firebase.auth().signOut().then(function() {

    var scoreObj = {
      name: displayName,
      high_score: playerScore,
      time: firebase.database.ServerValue.TIMESTAMP

    };

    console.log(scoreObj);

    scoreData.push(scoreObj);


    $("#player1").html("Player Name");
    $("#facebookBtn").show();
    $("#logOffFacebook").hide();


    // Sign-out successful.
    console.log("signed out of FB");
  }).catch(function(error) {
    // An error happened.
  });

});
