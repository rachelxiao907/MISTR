function display() {

  var rows = 3;
  var cols = 8;

  var board = new Array(rows);
  for (var i = 0; i < board.length; i++) {
    board[i] = new Array(cols);
  }

  var gameboard = document.getElementById("gameboard");
  var html = "";
  for (var i = 0; i < board.length; i++) {
      html += "<tr>";
      for (var j = 0; j < board[i].length; j++) {
        html += "<td> hello </td>";
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