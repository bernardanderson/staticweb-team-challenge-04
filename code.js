var numberOfClicks = 0;

// 1. Flexbox with 3x3 stack of divs
function createGrid() {
  var mainBody = document.getElementsByTagName("body");
  for (var i = 0; i < 9; i++) {
    var divItem = document.createElement("div");
    var jsScript = document.getElementsByTagName("script");
    divItem.id = "grid-" + i;
    divItem.classList.add("grid-item");
    mainBody[0].insertBefore(divItem, jsScript[0]);
  }
}

function addClickEvents() {
  var divItem = document.getElementsByClassName("grid-item");
    for (var i = 0; i < 9; i++) {
      divItem[i].addEventListener("click",addXO);
    }
}

function addXO() {
  var XorO = document.createElement("p");
  XorO.classList.add("X");
  if (numberOfClicks % 2 === 0) {
    XorO.innerText = "X";
    numberOfClicks++;
  } else {
    XorO.innerText = "O";
    numberOfClicks++;
  }
  this.appendChild(XorO);
  this.removeEventListener("click", addXO);
}

createGrid();
addClickEvents();

//1a. 
// 2. counter to keep track of current click
// 3. "this" for adding alternating x/o
// 4. if's to check for x or o in a line
// 5. if won, turn off click events, add "reset" button, alert box for winner