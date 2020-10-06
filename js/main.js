console.log("Sanity Check!")

//set initial stage of game to off 
let playGame = false
//set score at 0
let score = 0
//set timer to 60 seconds
let time = 10
//level starts at 0
let level = 1
//set correct answer to a global variable
let correctAnswer = 0

const gameContainer = document.querySelector('.game-container')

//create start game button to initiate game
const startGameButton = document.querySelector('.start-reset')
startGameButton.addEventListener('click', startGame = () => {
    if (playGame === true) {
        //if game is already being played reload to start page
        // location.reload()
    } else {
        //when game is initiated 
        //change start button to "reset game"
        playGame = true
        document.querySelector('.start-reset').innerHTML = "Reset Game"
        //start the timer
        // startTimer()
        // setTime(10)
        //show level 
        document.getElementById('level-box').innerHTML = `Level: ${level}`
        //show timer
        setUpLevels()
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
        if (time === 0 && level === 3) {
            //game over pop up
            alert("GAME OVER!!")
            //clear the interval
            clearInterval(timeInterval)
        } else if (time === 0) {
            //game over pop up
            alert("Time's Up!!")
            //clear the interval
            clearInterval(timeInterval)   
            //change button to "Next Level"
            document.querySelector('.start-reset').innerHTML = "Next Level"
            //increase the level player is currently on
            document.getElementById('level-box').innerHTML = `Level: ${level}`
            document.querySelector('.start-reset').onclick = function() {
                newQA()
            }

        } else {
            
            
            //decrement timer--
            time--
            console.log(time)
            const updateTime = document.getElementById('time')
            updateTime.innerHTML = `Time: ${time} s`
        }
    }, 1000)

}

function setUpLevels() {
    if(level === 1) {
        setTime(10)
        level++
    } else if (level === 2) {
        setTime(10)
        level++
    } else if (level === 3) {
        setTime(10)
    } else {
        alert("GAME OVER!")
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

            document.getElementById('box' + `${i}`).innerHTML = wrongAnswer
        }
    }
}


//if player chooses incorrect answer - try again message appears

//if player chooses the correct answer new round of questions/answers appears
//if player chooses correct answer increase score++

//once timer runs out "game over" box appears
//change button to "Next Level" or at last level change to "Start Game"





