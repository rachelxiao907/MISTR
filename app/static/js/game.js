// takes in an image's link
function nameString(str) {
  name = "";
  for (var i = 0; i < str.length; i++) {
    if (str.charAt(i) != ".") {
      name += str.charAt(i);
    } else {
      break;
    }
  }
  return name;
}

pics = ["alex.png", "anne.jpg", "bernard.png", "david.png", "paul.png", "max.png", "tom.png", "susan.png", "richard.png", "philip.png", "sam.png", "robert.png", "peter.png", "charles.png", "joe.png", "maria.png", "claire.png", "eric.png", "george.png", "herman.png", "bill.png", "frans.png", "anita.png", "alfred.png"];
var names = new Array(pics.length);
for (var i = 0; i < pics.length; i++) {
  names[i] = nameString(pics[i]);
}

var rows = 4;
var cols = 6;

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
        }
      }
      html += "</tr>";
  }
  gameboard.insertAdjacentHTML("beforeend", html);
}



setup();
