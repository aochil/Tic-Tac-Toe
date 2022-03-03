//can make new players and assign marks
const playerFactory = (name, mark) => {             
    return { name, mark}
}

//gameboard and it's methods
const gameboard = ( () => {
    const board = new Array(9).fill(null)
    
    const getBoard = {...board};

    const setCell = ((index, playerMark) => {       // sets mark on cell
        getBoard[index] = `${playerMark}`;

    });

    const clearCell = ()=> {
        Object.keys(getBoard).forEach(key => {
            getBoard[key] = null;
        })
    }
        
        return{
        board,
        setCell,
        getBoard,
        clearCell
    }
})();

const cells = document.querySelectorAll('.cell');
const container = document.querySelector('#gameboard');
const clearBoardBtn = document.querySelector('#clearBoard');
let moves = 0;
let win = 0;


//game setup 
const game = (()=>{
    
    const start = ()=>{
        displayGameboard();
        play();
        displayScore('playerX', player1Score, 'scoreX');
        displayScore('playerO', player2Score, 'scoreO');
        resetScore(); //allows resetScore button to work from the start
        document.querySelector('#playerX').style.color = 'red' //players know which player goes first
    }

    //visual display of the 3x3 gameboard
    const displayGameboard = ()=>{
        gameboard.board.forEach(() => {
            const createCell = document.createElement('div');
            createCell.classList.add('cell');
            container.appendChild(createCell);
        })
    }

    const player1 = playerFactory('Player 1', 'X');
    const player2 = playerFactory('Player 2', 'O');
    
    let currentPlayer = player1;

    //current player is shown in red to indicate which player's turn it is
    const switchPlayers = ()=> {
        if(currentPlayer === player1){
            currentPlayer = player2
            document.querySelector('#playerO').style.color = 'red'
            document.querySelector('#playerX').style.color = 'black'
            
        } else {
            currentPlayer = player1;
            document.querySelector('#playerX').style.color = 'red'
            document.querySelector('#playerO').style.color = 'black'
        }
    }

    let player1Score = 0;
    let player2Score = 0;

    const displayScore = (id, score, scoreId)=> {
        const players = document.getElementById(id);
        const playerScore = document.createElement('h3');
        playerScore.textContent = `${score}`;
        playerScore.style.textAlign = 'center';
        playerScore.id = scoreId
        players.appendChild(playerScore);
        
    }

    const resetScore = ()=> {
        document.querySelector('#resetScore').addEventListener('click', ()=>{
            player1Score = 0;
            player2Score = 0;
            document.querySelector('#scoreX').textContent = '0';
            document.querySelector('#scoreO').textContent = '0';
        })
    }


    const play = () => {
        
        const cell = document.querySelectorAll('.cell'); 
        cell.forEach((el,index)=>{
        
            el.addEventListener('click', ()=>{
                if(el.textContent === '') {
                gameboard.setCell(index, currentPlayer.mark);
                el.textContent = gameboard.getBoard[index];
                moves += 1;     //every time a player makes a move, it is counted and if moves = 9, its a draw
                switchPlayers();

                didPlayerWin(player1);              //checks if either player won after every mark
                didPlayerWin(player2);  

                
                
                
                // if a player wins, stop the game
                    if(win == 1) {
                    stopPlay();
                    clearBoard();
                    win = 0;
                    }
                    
                    if(moves == 9) {
                        showWinnerMsg(`It's a draw.`)
                        gameboard.clearCell();
                        stopPlay();
                        clearBoard();
                        play();
                        moves = 0;
                    }
                } 
                    
            })        
            
        })
    }

    const clearBoard = ()=> {
        clearBoardBtn.addEventListener('click', ()=>{

            const cell = document.querySelectorAll('.cell')
            cell.forEach((el) =>{
            el.textContent = '';
            })
            gameboard.clearCell();
            removeStopPlay();
            play();
            removeWinnerMsg();
            win = 0;
            moves = 0;
        })
    }

    //sets unclickable div over gameboard to prevent player's setting mark
   const stopPlay = () => {
        const coverGameboard = document.createElement('div')
        coverGameboard.id = 'coverGameboard';
        container.appendChild(coverGameboard);
   }
   //removes the cover of gameboard
   const removeStopPlay = () => {
       const coverGameboard = document.querySelector('#coverGameboard')
        if(document.contains(coverGameboard)) {
            coverGameboard.remove();
        }
       
   }
    //can display any message
   const showWinnerMsg = (message) => {
        
        const msg = document.querySelector('#winnerMsg')
            if(document.contains(msg)){
                    msg.remove();
            } else {
                const winnerBox = document.getElementById('winner');
                const winnerMsg = document.createElement('h3');
                winnerMsg.id = 'winnerMsg'
                winnerMsg.textContent = `${message}`;
                winnerBox.appendChild(winnerMsg);

            }
   } 
    
   const removeWinnerMsg = ()=> {
       const msg = document.querySelector('#winnerMsg')
            if(document.contains(msg)){
                msg.remove();
            }
   }

    //checks if a row contains the same mark to establish a win

    const fullRow = (cell1, cell2, cell3, player) => {
        if(gameboard.getBoard[cell1] === player.mark && 
                gameboard.getBoard[cell2] === player.mark && 
                    gameboard.getBoard[cell3] === player.mark){
                        showWinnerMsg('Congratulations ' + `${player.name}!` + ` Victory is yours this round.`)
                        
                        win = 1;

                        //score updates depending on which player wins
                        if(currentPlayer == player1) {
                            player1Score += 1;
                            document.getElementById('scoreX').textContent = player1Score;
                        } else if(currentPlayer == player2){
                            player2Score += 1;
                            document.getElementById('scoreO').textContent = player2Score;
                        }
                    }
    
                }
    

    //checks win conditions 
    const didPlayerWin = (player) => {
        fullRow(0,1,2, player);
        fullRow(3,4,5, player); 
        fullRow(6,7,8, player);
        fullRow(0,3,6, player);
        fullRow(1,4,7, player);
        fullRow(2,5,8, player);
        fullRow(0,4,8, player); 
        fullRow(2,4,6, player);  
    }

    return {
        start
    }
})();

game.start();









//previous attempts in starting project down below


//     const play = (() => {
//         renderGameboard.newBoard;

//     })();
    
//     let player1 = playerFactory('Player1', 'X');
//     let player2 = playerFactory('Player2', 'O');

//     let turn = 0;
//     const currentPlayer = () => {
        
//     }
    
    
    // const setCell = (() => {
    //     const cells = document.querySelectorAll('.square');
    //     cells.forEach((el, index) => {
    //         el.addEventListener('click', () => {
    //             board[index] = 'X'
    //             console.table(board);
    //         })
    //     })
        
    // })

//     return {
//         setCell:setCell
//     }
// })()

// game.setCell();






// const gameboard = (function () {
//     function displayGameboard() {
        
//         let id = 0;
        
//         function createSquares() {
//             const gameboard = document.getElementById('gameboard');
//             const square = document.createElement('div')
//             square.classList.add('square')
//             square.id = 'R' + id++;
//             gameboard.appendChild(square);
//         }
        
//         for(let i = 0; i < 9; i++) {
//             createSquares();
//         }
//     }
//     return{
//         show: displayGameboard
//     }
    
// })();

// gameboard.show();

// const takeTurns = (function () {
    
//     let playerTurn = 0;
    
//     function turns () {
//         const squares = document.querySelectorAll('.square')
//             squares.forEach(el => {
//             el.addEventListener('click', () => {
        
//                 if(playerTurn === 0) {
//                 el.textContent = 'X';
//                 playerTurn += 1;
        
//             } else if(playerTurn === 1){
//                 el.textContent = 'O';
//                 playerTurn -= 1;
                
//             }
//         }, {once:true})
//     });
// }
//     return{
//         turn : turns
//     }
// })();

// takeTurns.turn();


// const win = (function() {
//     function winningRow() {
    
//         function row (id1, id2, id3) {
//         let sq1 = document.getElementById(id1);
//         let sq2 = document.getElementById(id2);
//         let sq3 = document.getElementById(id3);
        
//         if(sq1.textContent === 'X' && 
//            sq2.textContent === 'X' && 
//            sq3.textContent === 'X') {
//             let straightRow = document.querySelectorAll(sq1,sq2,sq3);
//             console.log(straightRow);
//            }
//         }
//         row('R0', 'R1', 'R2');
//     }
//         return{
//             rowX: winningRow
//         }
// })();

// win.rowX();


// function winningRow (id1, id2, id3) {
// let row = document.querySelectorAll(id1, id2, id3);
// console.log(row)
// }
// winningRow("#R0", "#R1", "#R2")

   // let board = [0,1,2,
    //              3,4,5,
    //              6,7,8]
    
    
//     const renderGameboard = () => {
//     let id = 0;
//     board.forEach( () => {
//         const board = document.getElementById('gameboard');
//         const square = document.createElement('div');
//         square.classList.add('square');
//         square.id = 'R' + id++;
//         board.appendChild(square);
//     })
//



