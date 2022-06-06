function setup() {

  pics = ["alex.png", "anne.jpg", "bernard.png", "david.png", "paul.png", "max.png", "tom.png", "susan.png", "richard.png", "philip.png", "sam.png", "robert.png", "peter.png", "charles.png", "joe.png", "maria.png", "claire.png", "eric.png", "george.png", "herman.png", "bill.png", "frans.png", "anita.png", "alfred.png"];

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
        html += "<td> <img src=\"static/img/"+pics[i*cols+j]+"\" width=\"100\"> </td>";
      }
      html += "</tr>";
  }
  gameboard.insertAdjacentHTML("beforeend", html);
}

// takes in an image's link
function name(str) {
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

test();
setup();
