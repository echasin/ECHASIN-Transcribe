
//"use strict";

// my color assigned by the server
var myColor = false;
// my name sent to the server
var myName = false;

var test = $('#test');

// open connection
var connection = new WebSocket('ws://127.0.0.1:1337');

connection.close= function () {
    console.log("connection.close")
    alert("test");
//     document.getElementById("test").innerHTML = "text";
}
