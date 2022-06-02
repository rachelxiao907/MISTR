function display() {

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
        html += "<td> <img src=\"https://cdn.britannica.com/28/215028-050-94E9EA1E/American-actor-Chris-Evans-2019.jpg\" width=\"100\"> </td>";
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
