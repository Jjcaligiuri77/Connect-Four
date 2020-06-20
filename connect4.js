let WIDTH = 7;
let HEIGHT = 6;

const discColors = ['#C5C5CB', '#1019C8'];
let currentPlayer = 1; 
const board = [];   

function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    const row = [];
    for (let x = 0; x < WIDTH; x++) {
      row.push(null);
    }
    board.push(row);
  }
  return board;
}
//board and table row elements are assigned and created
function makeHtmlBoard() {
  const htmlBoard = document.querySelector('#board'); //sets the board variable to the HTML board DOM node
  const topRow = document.createElement('tr'); 
  topRow.setAttribute('id', 'column-top');  //setting top's id to 'column-top'
  //add click, mouseover and mouseout event listeners to top (table row)
  topRow.addEventListener('click', handleClick);
  topRow.addEventListener('mouseover', handleHover);
  topRow.addEventListener('mouseout', handleLeave);

  //Top row of board created
  for (let x = 0; x < WIDTH; x++) {
    const headNode = document.createElement('td');
    headNode.setAttribute('id', x);   //setting the id of variable headNode to the value of x
    topRow.append(headNode);
  }
  htmlBoard.append(topRow);

  //creates the main, visual board starting with row elements
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement('tr');
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`); //use template literals to update value for cell's id
      row.append(cell);
    }
    htmlBoard.append(row); //rows are added to htmlboard
  }
}


function findSpotForCol(x) {
  for (let i = board.length - 1; i >= 0; i--) {
    if (board[i][x] === null) {
      return i;
    }
  }
  return null;
}

function placeInTable(y, x) {
  const gameDisc = document.createElement('div');
  gameDisc.classList.add('disc', `player${currentPlayer}`, 'disc-animation');


  const cell = document.getElementById(`${y}-${x}`);
  cell.classList.add('td-animation');
  cell.append(gameDisc);
}

function endGame(message) {
  endMessage.innerText = message;
  toggleEndGameResults();
}
const endOverlay = document.querySelector('.overlay');
const newGameButton = document.querySelector('.new-game');
const endMessage = document.querySelector('.message');
const outro = document.querySelector('.end-game');
newGameButton.addEventListener('click', () => {
  toggleEndGameResults();
  resetBoard();
});

function toggleEndGameResults() {
  outro.classList.toggle('exit');
  endOverlay.classList.toggle('exit');
}

function handleHover(event) {
  const topNode = event.target;

  if (currentPlayer === 1) {
    topNode.style.backgroundColor = discColors[0];
  } else {
    topNode.style.backgroundColor = discColors[1];
  }
}

function handleLeave(event) {
  const topNode = event.target;
  topNode.style.backgroundColor = null;
}

  function handleClick(event) {
  const x = +event.target.id;
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  //toggle colors so players know whos turn it is
  const topNode = event.target;
  if (currentPlayer === 2) {
    topNode.style.backgroundColor = discColors[0];
  } else {
    topNode.style.backgroundColor = discColors[1];
  }
  // place disc in board and add to HTML table
  placeInTable(y, x);
  board[y][x] = currentPlayer;

  if (checkForWin()) {
    return endGame(`Player ${currentPlayer} is Victorious!`);
  }
  let tieChecker = board.every(array => {
    return array.every(value => {
      return value !== null;
    });
  });

  if (tieChecker) {
    endGame('Tie Game!');  //if the game board is full with no victor, tie game is triggered
  }
  currentPlayer = currentPlayer === 1 ? 2 : 1;
}

function checkForWin() {
  function _win(cells) {
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currentPlayer
    );
  }
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
  const horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3]
      ];
  const vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x]
      ];
  const diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3]
      ];
  const diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3]
      ];
  if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

function resetBoard() {
  board.length = 0;
  document.querySelector('#board').innerHTML = '';
  currentPlayer = 1;
  makeBoard();
  makeHtmlBoard();
}
makeBoard();
makeHtmlBoard();

function reset(){
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      board[y][x] = null;
    }
  }
  Array.from(document.querySelectorAll('td div.disc')).forEach((el) => el.remove());
  currentPlayer = 1;
  document.querySelector('body').style.backgroundColor = '';
  isOver = false;
}
document.querySelector('#restart').addEventListener('click', function(event){
  reset();
})

function randomRGB(){
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`
}
const h2 = document.querySelector("h2");
h2.style.color = "purple";
setInterval(function () {
  h2.style.color = randomRGB();
}, 2000);
