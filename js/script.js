// Globala variabler


// Array: med spelets alla ord
const wordList = [
  "madrid",
  "barcelona",
  "sevilla",
  "malaga",
  "valencia",
  "murcia",
  "zaragoza",
  "bilbao",
  "vigo",
  "almeria"
];      

let correctLetter = [];
const maxGuesses = 6;
let startGameBtnEl = document.querySelector("#startGameBtn") // DOM-nod: knappen som du startar spelet med
let msgHolderEl = document.querySelector("#message"); // DOM-nod: Ger meddelande när spelet är över
const resetButton = document.querySelector(".resetButton");
let guesses = 0; // Number: håller antalet gissningar som gjorts
let letterButtonEls = document.querySelectorAll("#letterButtons button"); // Array av DOM-noder: Knapparna för bokstäverna
let letterBoxEls = document.querySelector("#letterBoxes > ul"); // Array av DOM-noder: Rutorna där bokstäverna ska stå
letterBoxEls.innerHTML="";
let hangmanImgEl = document.querySelector("#hangman"); // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`
let selectedWord = ""; // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan



startGameBtnEl.addEventListener("click", startGame); 

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner

function startGame() {
  startGameBtnEl.setAttribute("disabled", true);
  generateRandomWord();
  createLetterBoxes();
  clickButton();
  resetButton.addEventListener("click", restartGame);
}

// Funktion som slumpar fram ett ord

function generateRandomWord() {
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  console.log("", selectedWord);
}

// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram

function createLetterBoxes() {
   for(let i=0; i < selectedWord.length; i++ ) {
   letterBoxEls.innerHTML+= `<li><input disabled value="_" type="text"></li>`;
  } 
}

// Funktion som körs när du trycker på bokstäverna och gissar bokstav

 function clickButton() { 
  letterBoxEls = document.querySelectorAll("#letterBoxes > ul > li > input");
  for (let i = 0; i < letterButtonEls.length; i++) {
    guesses=0;
    letterButtonEls[i].addEventListener("click", ()=> {
         for(let j = 0; j < selectedWord.length; j++) {
            if (letterButtonEls[i].value.toLowerCase() === selectedWord[j].toLowerCase()) {
                console.log('Log for when word is correct',letterButtonEls[i].value);
                letterBoxEls[j].value = selectedWord[j];
            } 
        }
        if (!selectedWord.includes(letterButtonEls[i].value.toLowerCase())) {
            guesses+=1;
            hangmanImgEl.src=`images/h${guesses}.png`;
            checkLoss();
          } 
        },{ once: true }); // Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på 
      }
    }
    function checkLoss(){
      if (guesses === maxGuesses) {
         console.log("du förlorade");
        msgHolderEl.style.display="flex";
        guesses=0;
     //   indexOfbtn.removeEventListener("click", ()=> {});
      }
}


function restartGame() {
  startGameBtnEl.addEventListener("click", startGame); 
  msgHolderEl.style.display="none";
  selectedWord = "";
  letterBoxEls = document.querySelector("#letterBoxes > ul");
  letterBoxEls.innerHTML="";
  guesses=0;
  hangmanImgEl.src=`images/h`+ guesses + ".png";
  startGameBtnEl.removeAttribute("disabled");
}

// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet

