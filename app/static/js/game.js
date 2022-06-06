function setup() {

  var rows = 4;
  var cols = 6;

  var board = new Array(rows);
  for (var i = 0; i < board.length; i++) {
    board[i] = new Array(cols);
  }

  var mystery_id = 4;
  var gameboard = document.getElementById("gameboard");
  var html = "";
  for (var i = 0; i < board.length; i++) {
      html += "<tr>";
      for (var j = 0; j < board[i].length; j++) {
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
