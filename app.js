let random=parseInt(Math.random()*100 + 1);

const submit=document.querySelector('#subt');
const userInp=document.querySelector('#guessField');
const guessSlot=document.querySelector('.guesses');
const remaining=document.querySelector('.lastResult');
const lowOrHi=document.querySelector('.lowOrHi');
const startOver=document.querySelector('.resultParas');

const p=document.createElement('p');

let prevGuess=[];
let numGuess=1;
let playGame=true;

if(playGame){
    submit.addEventListener('click',(ev)=>{
        ev.preventDefault();
        const guess=parseInt(userInp.value);
        //console.log(guess);
        validateGuess(guess);
    })
}

function validateGuess(guess){
    if(isNaN(guess) || guess<1 || guess>100){
       alert('Please enter a valid number between 1 to 100');
    }
    else{
       prevGuess.push(guess);
       if(numGuess===11){
           displayGuess(guess);
           displayMessage(`Game Over. Random Number was ${random}`)
           endGame();
       }
       else{
          displayGuess(guess);
          checkGuess(guess);
       }
    }
}

function checkGuess(guess){
    if(guess==random){
        displayMessage('You guessed it Right')
    }
    else if(guess<random){
        displayMessage('You guessed a low number')
    }
    else if(guess>random){
        displayMessage('You guessed a high number')
    }
}

function displayGuess(guess){
    userInp.value=''
    guessSlot.innerHTML += `${guess} , `
    numGuess++;
    remaining.innerHTML = `${11-numGuess}`
}

function displayMessage(message){
   lowOrHi.innerHTML = `<h2>${message}</h2>`
}

function endGame(){
    userInp.value='';
    userInp.setAttribute('disabled','');
    p.classList.add('button');
    p.innerHTML='<h2 id="newGame">Start New Game</h2>';
    startOver.appendChild(p);
    playGame=false;
    newGame();
}

function newGame(){
    const newGameButton=document.querySelector('#newGame');
    newGameButton.addEventListener('click',(ev)=>{
        random=parseInt(Math.random()*100 + 1);
        prevGuess=[];
        numGuess=1;
        guessSlot.innerHTML='';
        remaining.innerHTML = `${11-numGuess} `;
        userInp.removeAttribute('disabled');
        startOver.removeChild('p');
        playGame=true;
    });
}