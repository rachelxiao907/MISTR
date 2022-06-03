function display() {

  pics = ["alex.png", "anne.jpg", "bernard.png", "david.png", "paul.png", "max.png"];

  var rows = 4;
  var cols = 6;

  var board = new Array(rows);
  for (var i = 0; i < board.length; i++) {
    board[i] = new Array(cols);
  }

  var gameboard = document.getElementById("gameboard");
  var html = "";
  for (var i = 0; i < board.length; i++) {
      html += "<tr>";
      for (var j = 0; j < board[i].length; j++) {
        if (j < pics.length) {
          html += "<td> <img src=\"static/img/"+pics[i]+"\" width=\"100\"> </td>";
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
display();
