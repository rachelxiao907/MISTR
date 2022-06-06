pics = ["alex.png", "anne.jpg", "bernard.png", "david.png", "paul.png", "max.png"];
names = ["alex", "anne", "bernard", "david", "paul", "max"]

var rows = 3;
var cols = 2;

var board = new Array(rows);
for (var i = 0; i < board.length; i++) {
  board[i] = new Array(cols);
}

for (var i = 0; i < board.length; i++) {
  for (var j = 0; j < board[i].length; j++) {
    board[i][j] = {
      name: names[i * cols + j],
      pic: pics[i * cols + j]
    }
  }
}

function setup() {
  var mystery_id = 4;
  var gameboard = document.getElementById("gameboard");
  var html = "";
  for (var i = 0; i < board.length; i++) {
      html += "<tr>";
      for (var j = 0; j < board[i].length; j++) {
        if (j < pics.length) {
          html += "<td> <img src=\"static/img/"+board[i][j].pic+"\" width=\"100\"> </td>";
          // html += "<td> <img src=\"static/img/"+pics[i]+"\" width=\"100\"> </td>";
        }
      }
      html += "</tr>";
  }
  gameboard.insertAdjacentHTML("beforeend", html);
}

function test() {
  console.log("hello");
}

test();
setup();
