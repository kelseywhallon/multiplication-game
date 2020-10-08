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

//when game is initiated 
function startGame() {
    //change start button to "reset game"
    playGame = true
    //once game is started remove startGameButton
    gameContainer.removeChild(startGameButton)

    //show level-box & update innerHTML as score increases
    document.getElementById('level-box').style.display = "inline-block"
    document.getElementById('level-box').innerHTML = `Level: ${level}`
    //invoke level function - start at level 1
    setUpLevels()
    //show time box & update innerHTML
    document.getElementById('time').style.display = "inline-block"
    document.getElementById('time').innerHTML = `Time: ${time} s`
    //show score box
    document.getElementById('score').style.display = "inline-block"

    //generate a question and answers
    newQA()
}

//define all buttons in gloabl scope
//start game button
const startGameButton = document.querySelector('.start-game')
//create start game button to initiate game
startGameButton.addEventListener('click', startGame)
//create button for player to skip a question
const skipQuestionBtn = document.querySelector('.skip-question')
function skipQuestion() {
    if (playGame === true) {
        newQA()
    }
}
//next level button when time is at 0
const nextLevelBtn = document.querySelector('.next-level')
//reset game button at gameOver
const newGameButton = document.querySelector('.reset-game')
//reset game function so player can restart at beginning
newGameButton.addEventListener('click', resetGame)

//move to next level function
function moveToNextLevel() {
    document.getElementById('next-level-alert').style.display = "none"
    level++
    document.getElementById('level-box').innerHTML = 'Level: ' + level
    setUpLevels()
    newQA()
}

//reload / reset the game at gameover
function resetGame() {
    location.reload()
}

//set up the timers at each level
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
            //hide any potential try-again messages
            document.getElementById('try-again').style.display = "none"
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
            //make sure player cannot click skip question and hide button
            //hide any potential try-again messages
            document.getElementById('try-again').style.display = "none"
            skipQuestionBtn.style.display = 'none'
            //remove event listener on answer buttons
            removeAnswerBtn()
            //Time's Up / Next Level window
            document.getElementById('next-level-alert').style.display = "inline-block"
            //show next level button
            nextLevelBtn.style.display = 'block'
            nextLevelBtn.addEventListener('click', moveToNextLevel)
        } else {
            //decrement timer--
            time--
            console.log(time)
            //update timer's innerHTML
            const updateTime = document.getElementById('time')
            updateTime.innerHTML = `Time: ${time} s`
        }
    }, 1000)
}

//add event listener to answer boxes & compare if it is the correct answer
function chooseAnswer(event) {
    console.log('innerHTML ', event.target.innerHTML)
    console.log(playGame)
    if (playGame === true) {
        console.log(typeof event.target.innerHTML)
        console.log(correctAnswer)
        if (parseInt(event.target.innerHTML) === correctAnswer) {
            // if player chooses correct answer make sure try again window is hidden
            document.getElementById('try-again').style.display = 'none'
            console.log('good job!')
            //increment score
            score++
            //update innerHTML of score
            document.getElementById('score').innerHTML = `Score: ${score}`
            //invoke new QA
            newQA()
        } else {
            // if player chooses incorrect answer show try again window 
            document.getElementById('try-again').style.display = "inline-block"
        }
    }
}
//create function to loop through answer-boxes and add click event 
function addAnswerBtn() {
    for (i = 1; i < 5; i++) {
        const answerButtons = document.getElementById('box' + `${i}`)
        answerButtons.addEventListener('click', chooseAnswer)
    }
}
//create function to remove event listener on answer boxes
function removeAnswerBtn() {
    for (i = 1; i < 5; i++) {
        const answerButtons = document.getElementById('box' + `${i}`)
        answerButtons.removeEventListener('click', chooseAnswer)
    }
}

//create function to fill question box with 2 random numbers
function newQA() {
    //hide next level button
    nextLevelBtn.style.display = 'none'
    //show skip question button
    skipQuestionBtn.style.display = 'block'
    //add event listener to skipQbtn
    skipQuestionBtn.addEventListener('click', skipQuestion)
    //call function for answer box event listener
    addAnswerBtn()
    //2 random numbers
    let num1 = Math.floor(1 + Math.random() * 12)
    let num2 = Math.floor(1 + Math.random() * 12)
    //define the correct answer
    correctAnswer = num1 * num2
    //update innerHTML of Q box
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
            //if the random num does not equal the correct answer assign it to a wrong answer box
            if (wrongAnswer !== correctAnswer) {
                document.getElementById('box' + `${i}`).innerHTML = wrongAnswer
            }
        }
    }
}


