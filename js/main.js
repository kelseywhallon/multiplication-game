console.log("Sanity Check!")

//set initial stage of game to off 
let playGame = false
//set score at 0
let score = 0
//set timer to 60 seconds
let time = 0
//level starts at 1 when game begins
let level = 1
//set correct answer to a global variable
let correctAnswer = 0

//define game container
const gameContainer = document.querySelector('.game-container')

function startGame() {
    //when game is initiated 
    //change start button to "reset game"
    playGame = true
    //once game is started remove start game button
    gameContainer.removeChild(startGameButton)

    //show level
    document.getElementById('level-box').style.display = "inline-block"
    document.getElementById('level-box').innerHTML = `Level: ${level}`
    //show timer
    setUpLevels()
    document.getElementById('time').style.display = "inline-block"
    document.getElementById('time').innerHTML = `Time: ${time} s`

    document.getElementById('score').style.display = "inline-block"

    //generate a question and answers
    newQA()


}

//all buttons
const startGameButton = document.querySelector('.start-game')
const nextLevelBtn = document.querySelector('.next-level')

const newGameButton = document.querySelector('.reset-game')

//create start game button to initiate game
startGameButton.addEventListener('click', startGame)

//create button for player to skip a question
const skipQuestionBtn = document.querySelector('.skip-question')
function skipQuestion() {
    if (playGame === true) {
        newQA()
    }
}

//stop game / reset game function so player can restart at beginning
newGameButton.addEventListener('click', resetGame)

function moveToNextLevel() {
    document.getElementById('next-level-alert').style.display = "none"
    level++
    document.getElementById('level-box').innerHTML = 'Level: ' + level
    setUpLevels()
    newQA()
}

function resetGame() {
    location.reload()
}

function setUpLevels() {
    if (level === 1) {
        console.log(`level:  ${level}`)
        setTime(40)
    } else if (level === 2) {
        console.log(`level:  ${level}`)
        setTime(20)
    } else if (level === 3) {
        console.log(`level:  ${level}`)
        setTime(10)
    }
}

// timer function
function setTime(timeRemaining) {
    //set the interval
    time = timeRemaining
    let timeInterval = setInterval(() => {
        //create a check to stop at 0
        if (level === 3 && time === 0) {
            //game over pop 
            document.getElementById('game-over').style.display = "inline-block"
            document.getElementById('game-over').innerHTML = `GAME OVER! <br /> Your score is: ${score}`
            //clear the interval
            clearInterval(timeInterval)
            removeAnswerBtn()
            //remove skip question button
            skipQuestionBtn.style.display = 'none'
            //have button reset game
            newGameButton.addEventListener('click', resetGame)
            newGameButton.style.display = 'block'


        } else if (time === 0) {
            //clear the interval
            clearInterval(timeInterval)
            //hide skip quetion button
            //make sure player cannot click skip question and hide button
            skipQuestionBtn.style.display = 'none'
            removeAnswerBtn()
            //Time's Up alert
            document.getElementById('next-level-alert').style.display = "inline-block"

            //show next level button
            nextLevelBtn.style.display = 'block'
            nextLevelBtn.addEventListener('click', moveToNextLevel)
        } else {
            //decrement timer--
            time--
            console.log(time)
            const updateTime = document.getElementById('time')
            updateTime.innerHTML = `Time: ${time} s`
        }
    }, 1000)
}


function chooseAnswer(event) {
    console.log('innerHTML ', event.target.innerHTML)
    console.log(playGame)
    if (playGame === true) {
        console.log(typeof event.target.innerHTML)
        console.log(correctAnswer)
        if (parseInt(event.target.innerHTML) === correctAnswer) {
            // alert('CORRECT')
            document.getElementById('try-again').style.display = 'none'
            console.log('good job!')
            score++
            document.getElementById('score').innerHTML = `Score: ${score}`
            newQA()
        } else {
            document.getElementById('try-again').style.display = "inline-block"
        }
    }
}
//loop through answer-boxes and add click event 
function addAnswerBtn() {
    for (i = 1; i < 5; i++) {
        const answerButtons = document.getElementById('box' + `${i}`)
        answerButtons.addEventListener('click', chooseAnswer)
    }
}

function removeAnswerBtn() {
    for (i = 1; i < 5; i++) {
        const answerButtons = document.getElementById('box' + `${i}`)
        answerButtons.removeEventListener('click', chooseAnswer)
    }
}



//fill question box with 2 random numbers
function newQA() {
    nextLevelBtn.style.display = 'none'
    skipQuestionBtn.style.display = 'block'
    skipQuestionBtn.addEventListener('click', skipQuestion)
    addAnswerBtn()
    let num1 = Math.floor(1 + Math.random() * 12)
    let num2 = Math.floor(1 + Math.random() * 12)
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
            wrongAnswer = (1 + Math.floor(Math.random() * 12)) * (1 + Math.floor(Math.random() * 12))
            if (wrongAnswer !== correctAnswer) {
                document.getElementById('box' + `${i}`).innerHTML = wrongAnswer
            }
        }
    }
}


