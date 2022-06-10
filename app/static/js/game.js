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

function shuffleArray(array) {
   for (var i = array.length - 1; i > 0; i--) {

       // Generate random number
       var j = Math.floor(Math.random() * (i + 1));

       var temp = array[i];
       array[i] = array[j];
       array[j] = temp;
   }

   return array;
}

pics = ["alex.png", "anne.jpg", "bernard.png", "david.png", "paul.png", "max.png", "tom.png", "susan.png", "richard.png", "philip.png", "sam.png", "robert.png", "peter.png", "charles.png", "joe.png", "maria.png", "claire.png", "eric.png", "george.png", "herman.png", "bill.png", "frans.png", "anita.png", "alfred.png"];
pics = shuffleArray(pics);

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

//populating array of objects
for (var i = 0; i < board.length; i++) {
  for (var j = 0; j < board[i].length; j++) {
    board[i][j] = {
      name: names[i * cols + j],
      pic: pics[i * cols + j]
    }
  }
}

opp_mystery = Math.floor(Math.random() * 24); //opponent's mystery person
user_mystery = Math.floor(Math.random() * 24); //user's mystery person

var select_mode;
//setting up the board
function setup() {
  select_mode = false;
  update_turn();
  var gameboard = document.getElementById("gameboard");
  var html = "";
  for (var i = 0; i < board.length; i++) {
      html += "<tr>";
      for (var j = 0; j < board[i].length; j++) {
        cell_id = (i * cols + j);
        // if (cell_id == user_mystery) {
        //   cell_id = "m"; //m for mystery
        // }
        if (j < pics.length) {
          html += "<td id=" + cell_id + " class=show> <img src=\"static/img/"+board[i][j].pic+"\" width=\"100\"> <p>" + board[i][j].name + " </p> </td>";
        }
      }
      html += "</tr>";
  }
  gameboard.insertAdjacentHTML("beforeend", html);
}

var selected_cell;
char_name = "";
var click = 0;
//clicking a table cell "flips" the card
function flip() {
  // console.log("select_mode: " + select_mode);
  document.querySelectorAll('td').forEach(cell => {
    cell.addEventListener('click', event => {
      console.log("select_mode: " + select_mode);
      if (select_mode == false) {
        if (click < 1) {
          cell.className = "chosen";
          click++;
          char_name = nameString(pics[cell.id]);
          console.log(char_name);
          firstClick();
        } else {
          if (cell.className == "show") {
            cell.className = "flipped";
          } else {
            if (cell.className == "flipped") {
              cell.className = "show";
            }
          }
        }
      } else {
        if (click > 0) {
          if (cell.className != "flipped") {
            if (selected_cell == undefined) {
              selected_cell = cell;
              cell.className = "selected";
            } else {
              selected_cell.className = "show";
              selected_cell = cell;
              cell.className = "selected";
            }
          }
        }
      }
    })
  })
}

console.log(click);

function firstClick() {
  $.ajax({
    url : '/firstclick',
    type : 'POST',
    contentType: "application/json",
    data : JSON.stringify({
      "char_name" : char_name
    }),
  })
}

console.log(click);

//function for toggle select
function toggle_select() {
  var selectmode_btn = document.getElementById("select_mode");
  if (select_mode == false) {
    select_mode = true;
    selectmode_btn.innerText = "Select Mode ON";
  } else {
    select_mode = false;
    if (selected_cell != undefined){
      selected_cell.className = "show";
      selected_cell = undefined;
    }
    selectmode_btn.innerText = "Select Mode OFF";

  }
  console.log("select_mode: " + select_mode);
}

var confirmed_select;

//function for select confirm button
function select() {
  if (select_mode){
    is_confirmed = confirm("Select this character? Selecting a character will pass your turn.\n " + selected_cell.innerText);
    if (is_confirmed) {
      confirmed_select = selected_cell;
      //do smth about confirmed_select
      console.log(confirmed_select.innerText);
      confirmed_select.className = "show";
      selected_cell = undefined;
      if (select_mode == true) {
        select_mode = false;
        var selectmode_btn = document.getElementById("select_mode");
        if (selected_cell != undefined){
          selected_cell = undefined;
        }
        selectmode_btn.innerText = "Select Mode OFF";

      }
    }
  }
  console.log("select_mode: " + select_mode);
}

function selectmode_btn() {
  selectmode_btn = document.getElementById("select_mode");
  selectmode_btn.addEventListener('click', toggle_select);
}

// function select_btn() {
//   select_btn = document.getElementById("select");
//   select_btn.addEventListener('click', select);
// }

chat = "";
//chatbox
$(function() {
  $('#submitmsg').bind('click', function() {
    var usermsg = $('#usermsg').val();
    console.log(usermsg);
    update_chat();
    $.ajax({
      url : '/chatbox',
      type : 'POST',
      contentType: "application/json",
      data : JSON.stringify({
        "usermsg" : usermsg
      }),

    })
    .done(function(data){
      console.log(data);
      update_chat(data);
    });
  });
})


$(function() {
  $('#end_turn').bind('click', function() {
    $.getJSON('/turn_process', function(data) { //receive data from python!

    })

  });
})

mode_btn = document.getElementById("select_mode");
confirm_btn = document.getElementById("select");
endturn_btn = document.getElementById("end_turn");

function update_turn() {
  $.getJSON('/updateturn_process', function(data) { //receive data from python!
  })
  .done(function(data){ //do this once you get data
    var turn = document.getElementById("turn");
    turn.innerText = "Turn: " + data["turn"];
    if (data["turn"] != data["username"]) {
      mode_btn.style.visibility = "hidden";
      confirm_btn.style.visibility = "hidden";
      end_turn.style.visibility = "hidden";
    } else {
      mode_btn.style.visibility = "visible";
      confirm_btn.style.visibility = "visible";
      end_turn.style.visibility = "visible";
    }
  });
}

var is_win = false;
$(function() {
  $('#select').bind('click', function() {
    $.getJSON('/select_process', function(data) { //receive data from python!

    })
    .done(function(data){
      select();
      console.log("winner char: " + data["chosen"]);
      var win_char = data["chosen"];
      if (win_char == confirmed_select.innerText) {
        console.log("asdfsfsfasdfs. YOU WIN");
        is_win = true;
        win_alert();
      }
    });
  });
})

function gameover_redirect() {
  var site_location = window.location.toString();
  var len = site_location.length - 4;
  var new_location = site_location.substring(0,len) + "gameover"
  console.log("location: " + new_location);
  window.location.replace(new_location);
}

function win_alert() {
  $.ajax({
    url : '/win',
    type : 'POST',
    contentType: "application/json",
    data : JSON.stringify({
      "win" : true
    })
  })
  gameover_redirect();
}


function update_chat(data) {
  var chatbox = document.getElementById("container");
  chatbox.innerHTML = data;
}

function get_chatData(){
  console.log("work?");
  $.getJSON('/updating_chat', function(data) { //receive data from python!
  })
  .done(function(data){ //do this once you get data
    update_chat(data["chat"]);
  });
  return false;
}

function is_win_yet(){
  $.getJSON('/iswin_process', function(data) { //receive data from python!

  })
  .done(function(data){
    console.log(data["winner"]);
    winner = data["winner"];
    username = data["username"];
    if (winner != username && winner != null) {
      console.log("nah, you lost mate");
      gameover_redirect();
    }
  })
}




setup();
flip();
selectmode_btn();

setInterval(get_chatData, 20000); //every 1 second
setInterval(is_win_yet, 5000); //every 1 second
setInterval(update_turn, 5000); //every 1 second
