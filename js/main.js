console.log("Sanity Check!")

//set initial stage of game to off 
let playGame = false
//set score at 0
let score = 0
//set timer to 60 seconds
let timer = 10



//create start game button to initiate game
const startGameButton = document.querySelector('.start-reset')
startGameButton.addEventListener('click', startGame = () => {
    if(playGame === true) {
    //if game is already being played reload to start page
    document.reload()
} else {
    //when game is initiated 
    //change start button to "reset game"
    document.querySelector('.start-reset').innerHTML = "Reset Game"
    //start the timer
    // startTimer()
    
    //show level 

    //show timer
    
    //generate a question and answers
    // newQA()
    
}
})



//timer function

//change level to 1 once game is started


//fill question box with 2 random numbers

//fill answer boxes with random numbers
//make sure one of these numbers is the correct answer
//shuffle the position of the correct answer each round

//if player chooses incorrect answer - try again message appears

//if player chooses the correct answer new round of questions/answers appears
//if player chooses correct answer increase score++

//once timer runs out "game over" box appears
//change button to "Next Level" or at last level change to "Start Game"





