var numberOfClicks = 0;

// Creates a 9 divs as containers for the Tic-Tac-Toe grid
function createGrid() {
  var mainBody = document.getElementsByTagName("body");
  for (var i = 0; i < 9; i++) {
    var divItem = document.createElement("div");
    var jsScript = document.getElementsByTagName("script");
    divItem.classList.add("grid-item");
    mainBody[0].insertBefore(divItem, jsScript[0]);
  }
}

// This adds click events to all grid divs so when clicked, an X or O will be added
function addClickEvents() {
  var divItem = document.getElementsByClassName("grid-item");
  for (var i = 0; i < 9; i++) {
    divItem[i].addEventListener("click",addXO);
  }
}

// This removes all click events from the program
function removeAllClickEvents() {
  var divItem = document.getElementsByClassName("grid-item");
  for (var i = 0; i < 9; i++) {
    divItem[i].removeEventListener("click",addXO);
  }
}

// This function adds an X or O based on the number of click recorded so far
//  It puts the X or O text in the clicked div
//  It also removes the listenerEvent so the user can't keep clicking the same div 
function addXO() {
  if (numberOfClicks % 2 === 0) {
    this.classList.add("X");
    this.style.color = "red";
    this.innerText = "X";
  } else {
    this.classList.add("O");
    this.style.color = "blue";
    this.innerText = "O";
  }
  this.removeEventListener("click", addXO);
  numberOfClicks++;
  buildXOArray();
}

// This creates an array of X's and O's from the classes within each grid div
function buildXOArray() {
  var divItem = document.getElementsByTagName("div");
  var divCheckX = [];
  var divCheckO = [];

  for (var i = 0; i < 9; i++) {
    divCheckX.push(divItem[i].classList.contains("X"));
    divCheckO.push(divItem[i].classList.contains("O"));
  }
  checkHorizontal(divCheckX, divCheckO);
  checkVertical(divCheckX, divCheckO);
  checkDiagonal(divCheckX, divCheckO);
}

// The vanilla check grid which looks to see if the either X or O has three in a row
function checkXO(divCheckX, divCheckO, firstGrid, secondGrid, thirdGrid) {
  var xCheck = divCheckX[firstGrid] && divCheckX[secondGrid] && divCheckX[thirdGrid];
  var oCheck = divCheckO[firstGrid] && divCheckO[secondGrid] && divCheckO[thirdGrid];

  var itemCheck = [
    { itemTrue: xCheck,
      winMessage: "You Won X!",
    },
    { itemTrue: oCheck,
      winMessage: "You Won O!",
    },
    { itemTrue: numberOfClicks === 9,
      winMessage: "It's a tie!",
    }
  ];

  for (var i = 0; i < 3; i++) {
      if (itemCheck[i].itemTrue) {
        numberOfClicks = 0;
        console.log("itemCheck"+i, itemCheck[i].itemTrue);
        addWinnerToDom(itemCheck[i].winMessage);
        addPlayAgainButton();
        break;
      }
  }
}

function addWinnerToDom(winMessage) {
  var mainBody = document.getElementsByTagName("body");
  var jsScript = document.getElementsByTagName("script");
  var winDisplay = document.createElement("p");
  winDisplay.innerText = winMessage;
  mainBody[0].insertBefore(winDisplay, jsScript[0]);
}

// This checks the grids for three in a row horizontally
function checkHorizontal(divCheckX, divCheckO) {
  for (var i = 0; i < 3; i++) {
    var firstGrid = 0 + 3*i;
    var secondGrid = 1 + 3*i;
    var thirdGrid = 2 + 3*i;
    checkXO(divCheckX, divCheckO, firstGrid, secondGrid, thirdGrid);
  }
}

// This checks the grids for three in a row vertically
function checkVertical(divCheckX, divCheckO) {
  for (var i = 0; i < 3; i++) {
    var firstGrid = 0 + 1*i;
    var secondGrid = 3 + 1*i;
    var thirdGrid = 6 + 1*i;
    checkXO(divCheckX, divCheckO, firstGrid, secondGrid, thirdGrid);
  }
}

// This checks the grids for three in a row diagonally
function checkDiagonal(divCheckX, divCheckO) {
  for (var i = 0; i < 2; i++) {
    var firstGrid = 0 + 2*i;
    var secondGrid = 4;
    var thirdGrid = 8 - 2*i;
    checkXO(divCheckX, divCheckO, firstGrid, secondGrid, thirdGrid);
  }
}

// This adds the PlayAgainButton for a win or tie.  And ties a click event to it
//  to reset the board
function addPlayAgainButton() {

  var mainBody = document.getElementsByTagName("body");
    var playAgainButton = document.createElement("p");
    playAgainButton.innerText = "**PLAY AGAIN**";
    var jsScript = document.getElementsByTagName("script");
    playAgainButton.classList.add("button");
    mainBody[0].insertBefore(playAgainButton, jsScript[0]);
    playAgainButton.addEventListener("click", resetGame);
}

// This checks the body child elements and deletes everything but the <script> tag
//  Effectively, resetting the grid.
function resetGrid() {
  var mainBody = document.getElementsByTagName("body");
  var lengthOfChildren = mainBody[0].childElementCount ;
  for (var i = 1; i < lengthOfChildren; i++) {
    mainBody[0].removeChild(mainBody[0].firstChild);
  }
}

// This runs all the major setup functions
function resetGame() {
  resetGrid();
  createGrid();
  addClickEvents();
}

resetGame();