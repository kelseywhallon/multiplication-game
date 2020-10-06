console.log("Sanity Check!")

//set initial stage of game to off 
let playGame = false
//set score at 0
let score = 0
//set timer to 60 seconds
let time = 10

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
        setTime(10)
        //show level 

        //show timer

        //generate a question and answers
        newQA()
    }
})

//change level to 1 once game is started

// timer function
function setTime(timeRemaining) {
    //set the interval
    time = timeRemaining
    let timeInterval = setInterval(() => {
        //create a check to stop at 0
        if (time === 0) {
            //clear the interval
            clearInterval(timeInterval)
            //remove eventListerner on start button?
            startGameButton.removeEventListener('click', startGame)
            //increase the level player is currently on

        } else {
            //decrement timer--
            time--
            console.log(time)
            const updateTime = document.getElementById('time')
            updateTime.innerHTML = `Time: ${time} s`
        }
    }, 1000)

}



//fill question box with 2 random numbers
function newQA() {
    let num1 = Math.floor(1 + Math.random() * 9)
    let num2 = Math.floor(1 + Math.random() * 9)
    //define the correct answer
    let correctAnswer = num1 * num2
    document.querySelector('.question-box').innerHTML = `${num1} x ${num2}`
    //define correct square of correct answer
    //assign the correct answer a random index
    let correctAnswerIndex = Math.floor(Math.random() * 4)
    document.getElementById('box' + `${correctAnswerIndex}`).innerHTML = correctAnswer


    //fill one of the answer boxes with the correct answer
    //fill the remainder boxes with incorrect answers
    //create an array for 4 answers

    //loop through the answer boxes and assign random index positions to wrong answers
    for (i = 1; i < 5; i++) {
        console.log('on loop: ', i)
        if (i !== correctAnswerIndex) {
            //create an inccorect answer
            wrongAnswer = (1 + Math.floor(Math.random() * 9)) * (1 + Math.floor(Math.random() * 9))

            document.getElementById('box' + `${i}`).innerHTML = wrongAnswer
        }
    }
}





//fill answer boxes with random numbers
//make sure one of these numbers is the correct answer
//shuffle the position of the correct answer each round

//if player chooses incorrect answer - try again message appears

//if player chooses the correct answer new round of questions/answers appears
//if player chooses correct answer increase score++

//once timer runs out "game over" box appears
//change button to "Next Level" or at last level change to "Start Game"





