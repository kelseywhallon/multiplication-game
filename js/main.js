console.log("Sanity Check!")

//set initial stage of game to off 
let playGame = false
//set score at 0
let score = 0
//set timer to 60 seconds
let time = 10
//level starts at 1 when game begins
let level = 1
//set correct answer to a global variable
let correctAnswer = 0


function startGame() {
    //when game is initiated 
    //change start button to "reset game"
    playGame = true
    document.querySelector('.start-reset').innerHTML = "Reset Game"

    //show level
        document.getElementById('level-box').innerHTML = `Level: ${level}`
    //show timer
    setUpLevels()
    //generate a question and answers
    newQA()
}
//create start game button to initiate game
const startGameButton = document.querySelector('.start-reset')
startGameButton.addEventListener('click', startGame)

//create button for player to skip a question
const skipQuestionBtn = document.querySelector('.skip-question')
function skipQuestion() {
    if (playGame === true) {
        newQA()
    } else {
        skipQuestionBtn.removeEventListener('click', skipQuestion)
    }

}

//stop game / reset game function so player can restart at beginning
function resetGame() {
    location.reload()
}

// timer function
function setTime(timeRemaining) {
    //set the interval
    time = timeRemaining
    let timeInterval = setInterval(() => {
        //create a check to stop at 0
        if (level === 3 && time === 0) {
            //game over pop up
            //clear the interval
            clearInterval(timeInterval)
            //change innerHTML of button
            startGameButton.innerHTML = "Start New Game"
            //give player option to restart a new game
            startGameButton.addEventListener('click', startGame)
            //make sure player cannot reload another question
            skipQuestionBtn.removeEventListener('click', skipQuestion)

        } else if (time === 0) {
            //game over pop up
            alert("Time's Up!!")
            //make sure player cannot click skip question
            skipQuestionBtn.removeEventListener('click', skipQuestion)
            //clear the interval
            clearInterval(timeInterval)
            //change button to "Next Level"
            document.querySelector('.start-reset').innerHTML = "Next Level"
            //increase the level player is currently on
            document.querySelector('.start-reset').onclick = function () {
                
                    newQA()
                
                
                
            }
            document.getElementById('level-box').innerHTML = `Level: ${level}`
            //remove event listener from answer boxes
            // document.querySelectorAll('.answer-box').removeEventListener('click', chooseAnswer(eventObject))
        } else {
            //decrement timer--
            time--
            console.log(time)
            const updateTime = document.getElementById('time')
            updateTime.innerHTML = `Time: ${time} s`
            //be able to click on reset game
            startGameButton.addEventListener('click', resetGame)
            //be able to skip questions
            skipQuestionBtn.addEventListener('click', skipQuestion)
        }
    }, 1000)
}

function setUpLevels() {
    if (level === 1) {
        setTime(5)
    } else if (level === 2) {
        setTime(10)
    } else if (level === 3) {
        setTime(15)
    }
}


//loop through answer-boxes and add click event 
for (i = 1; i < 5; i++) {
    const answerButtons = document.getElementById('box' + `${i}`)
    answerButtons.addEventListener('click', function chooseAnswer(event) {
        console.log('innerHTML ', event.target.innerHTML)
        console.log(playGame)
        if (playGame === true) {
            console.log(typeof event.target.innerHTML)
            console.log(correctAnswer)
            if (parseInt(event.target.innerHTML) === correctAnswer) {
                console.log('good job!')
                score++
                document.getElementById('score').innerHTML = `Score: ${score}`
                newQA()
            } else {
                alert("TRY AGAIN!")
            }
        }
    })
}


//fill question box with 2 random numbers
function newQA() {
    let num1 = Math.floor(1 + Math.random() * 9)
    let num2 = Math.floor(1 + Math.random() * 9)
    //define the correct answer
    correctAnswer = num1 * num2
    document.querySelector('.question-box').innerHTML = `${num1} x ${num2}`
    //define correct square of correct answer
    //assign the correct answer a random index
    let correctAnswerBox = (1 + Math.floor(Math.random() * 4))
    document.getElementById('box' + `${correctAnswerBox}`).innerHTML = correctAnswer
    console.log(correctAnswer)
    console.log(correctAnswerBox)

    //loop through the answer boxes and assign random index positions to wrong answers
    for (i = 1; i < 5; i++) {
        console.log('on loop: ', i)
        if (i !== correctAnswerBox) {
            //create an inccorect answer
            wrongAnswer = (1 + Math.floor(Math.random() * 9)) * (1 + Math.floor(Math.random() * 9))
            if (wrongAnswer !== correctAnswer) {
                document.getElementById('box' + `${i}`).innerHTML = wrongAnswer
            }
        }
    }
}
