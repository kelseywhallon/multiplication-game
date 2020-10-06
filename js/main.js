console.log("Sanity Check!")

//set initial stage of game to off 
let playGame = false
//set score at 0
let score = 0
//set timer to 60 seconds
let time = 10;

const gameContainer = document.querySelector('.game-container')


//create start game button to initiate game
const startGameButton = document.querySelector('.start-reset')
startGameButton.addEventListener('click', startGame = () => {
    if (playGame === true) {
        //if game is already being played reload to start page
        document.reload()
    } else {
        //when game is initiated 
        //change start button to "reset game"
        document.querySelector('.start-reset').innerHTML = "Reset Game"
        //start the timer
        // startTimer()
        setTime()
        //show level 

        //show timer

        //generate a question and answers
        newQA()
    }
})


//timer function
function setTime(timeRemaining){
    //set the interval
    time = timeRemaining
    const timeInterval = setInterval(() => {
        //create a check to stop at 0
        if (time === 0) {
            //clear the interval
            clearInterval(timeInterval)
            //remove eventListerner on start button?

            //increase the level player is currently on
            // level++

        } else {
            //decrement timer--
            time--
            console.log(time)
        }   
    },1000) 
    const updateTime = document.querySelector('.time-remaining')
    updateTime.innerHTML = `Time: ${time}s`  
    gameContainer.appendChild.updateTime
}

//change level to 1 once game is started


//fill question box with 2 random numbers
function newQA() {
    let num1 = Math.floor(Math.random() * 9)
    let num2 = Math.floor(Math.random() * 9)
    //define the correct answer
    let correctAnswer = num1 * num2
    document.querySelector('.question-box').innerHTML = `${num1} x ${num2}`
    //define correct square of correct answer
    let correctSquare = Math.floor(Math.random() * 4)
}
//fill answer boxes with random numbers
//make sure one of these numbers is the correct answer
//shuffle the position of the correct answer each round

//if player chooses incorrect answer - try again message appears

//if player chooses the correct answer new round of questions/answers appears
//if player chooses correct answer increase score++

//once timer runs out "game over" box appears
//change button to "Next Level" or at last level change to "Start Game"





