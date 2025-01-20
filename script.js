let boardSize = 3;
let boxes = [];
let turn = "X";
let score = {X: 0, O: 0};
let moves;

function init() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = "";
    boxes = [];
    let identifier = 1;

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.identifier = identifier;
            identifier++
            cell.addEventListener('click',set);
            gameBoard.appendChild(cell);
            boxes.push(cell)

            cell.classList.add('row' + i, 'col' + j)
            if (i === j) {
                cell.classList.add('diagonal-main')
            }else if(i + j === boardSize - 1 ){
                cell.classList.add('diagonal-sec')

            }
        }        
    }

}

function startNewGame() {
    moves = 0;
    turn = 'X';

    boxes.forEach((square) => {
        square.classList.remove('X', 'O','win')
        square.innerHTML = ""
    });
}


function updateScore() {
    document.getElementById('X-score').textContent = `X: ${score.X}`
    document.getElementById('O-score').textContent = `O: ${score.O}`
}
function win(clicked) {
    const memberOf = clicked.className.split(/\s+/); // Get all classes of the clicked cell

    for (const className of memberOf) {
        if (className.startsWith('row') || className.startsWith('col') || className.startsWith('diagonal')) {
            const items = document.querySelectorAll('.' + className);
            const allMatch = Array.from(items).every((item) => item.textContent === turn);
            if (allMatch) {
                Array.from(items).forEach((item) => item.classList.add('win')); // Highlight winning cells
               score[turn] ++; 
               updateScore();
                return true; 
            }
        }
    }
    return false;
}

function set(){
    if (this.innerHTML !== "") return

    this.innerHTML = turn
    moves += 1
    // score[turn] += this.identifier 
    this.classList.add(turn.toLowerCase())

    if (win(this)) {
        document.getElementById('turn').textContent = `Player ${turn} wins!`
        setTimeout(startNewGame(), 2000)
    } else if (moves === boardSize * boardSize) {
        document.getElementById('turn').textContent = `It's a draw!`
        setTimeout(startNewGame(), 2000)
    }else{
        turn = turn === 'X' ? 'O' : 'X';
        document.getElementById('turn').textContent = `Player ${turn}`
    }
    
}

const resetScore = () => {
    score = {X: 0, O: 0}
    updateScore()
}


    document.getElementById('theme-switch').addEventListener('change',  function () {
    document.body.classList.toggle('dark', this.checked)
    document.getElementById('game-board').classList.toggle('dark-mode', this.checked)
    document.getElementById('turn').classList.toggle('dark-text', this.checked)
    document.getElementById('rules-heading').classList.toggle('dark-text', this.checked)
    document.getElementById('game-heading').classList.toggle('dark-text', this.checked)
    document.getElementById('rules-info').classList.toggle('dark-text', this.checked)
    document.getElementById('score-heading').classList.toggle('dark-text', this.checked)
    document.getElementById('score-board').classList.toggle('dark-text', this.checked)
    document.getElementById('X-score').classList.toggle('dark-text', this.checked);
    document.getElementById('O-score').classList.toggle('dark-text', this.checked);

    document.querySelectorAll('label').forEach((label)=>{
        label.classList.toggle('dark-label', this.checked)
    })
})

document.getElementById('reset-game').addEventListener('click', startNewGame);
document.getElementById('reset-score').addEventListener('click', resetScore);

init()