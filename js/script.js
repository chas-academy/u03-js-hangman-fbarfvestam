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

// Globala variabler

const maxGuesses = 6; // Maxgissningar för felsvar
let startGameBtnEl = document.querySelector("#startGameBtn") // DOM-nod: knappen som du startar spelet med
let msgHolderEl = document.querySelector("#message"); // DOM-nod: Ger meddelande när spelet är över
const resetButton = document.querySelector(".resetButton"); // Knapp för att resetta spelet
let guesses = 0; // Number: håller antalet gissningar som gjorts
let letterButtonEls = document.querySelectorAll("#letterButtons button"); // Array av DOM-noder: Knapparna för bokstäverna
let letterBoxEls = document.querySelector("#letterBoxes > ul"); // Array av DOM-noder: Rutorna där bokstäverna ska stå
letterBoxEls.innerHTML=""; // Gör boxarna tomma 
let hangmanImgEl = document.querySelector("#hangman"); // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`
let selectedWord = ""; // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan
let letterArray = []; // Default värde på arrayen
let gameFinished = document.querySelector(".endGamemsg");


// Eventlistener som lyssnar på klick, då startar startGame funktionen

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
}

// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram

function createLetterBoxes() {
   for(let i=0; i < selectedWord.length; i++ ) {
   letterBoxEls.innerHTML+= `<li><input disabled value="_" type="text"></li>`;
  } 
} 

 // Lägg eventlistener på alla knappar

 function clickButton() { 

  letterBoxEls = document.querySelectorAll("#letterBoxes > ul > li > input");
  
  // For loop som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på 

  for (let i = 0; i < letterButtonEls.length; i++) {
    letterButtonEls[i].addEventListener("click", checkClick, { once: true });
  }       
  
  
  
} // Funktion som körs när du trycker på bokstäverna och gissar bokstav
    function checkClick() {
      this.setAttribute("disabled", true);

      for (let i = 0; i < selectedWord.length; i++) {

       if (this.value.toLowerCase() === selectedWord[i].toLowerCase()) { 

         letterBoxEls[i].value = this.value;
         letterArray.push(letterBoxEls[i].value);

         if (letterArray.length === selectedWord.length) {
          checkWin();
         }
       }
     }
      if (!selectedWord.includes(this.value.toLowerCase())) {

        guesses+=1;
        hangmanImgEl.src=`images/h${guesses}.png`;
        checkLoss();
      }
    }     

    // Funktion som ropas vid vinst

    function checkWin () {

      letterBoxEls = document.querySelectorAll('#letterBoxes > ul > li > input');
      let boxElsArray = Array.from(letterBoxEls).filter(valueInput => valueInput !== "_")

      for (let i = 0; i < selectedWord.length; i++) {

        boxElsArray[i] = boxElsArray[i].value;
      }
      let letterArrayWord = boxElsArray.join("");

      if (letterArrayWord.toLowerCase() === selectedWord.toLowerCase()) {

        setTimeout(function(){
          msgHolderEl.style.display="flex";
          gameFinished.innerHTML = "Grattis du vann! :)";
          
        }, 1000);
      }
    }

    // Funktion som ropas vid förlust

    function checkLoss(){

      if (guesses === maxGuesses) {

        setTimeout(function(){
          msgHolderEl.style.display="flex";
          gameFinished.innerHTML = "Åh nej! Du förlorade :(";
        }, 1000);
      }
}

// Funktion som resettar spelet

function restartGame() {
  startGameBtnEl.addEventListener("click", startGame); 
  msgHolderEl.style.display="none";
  selectedWord = "";
  letterBoxEls = document.querySelector("#letterBoxes > ul");
  letterBoxEls.innerHTML="";
  guesses=0;
  hangmanImgEl.src=`images/h`+ guesses + ".png";
  startGameBtnEl.removeAttribute("disabled");
  letterArray = [];
  boxElsArray = [];
  for (let i = 0; i < letterButtonEls.length; i++) {
    letterButtonEls[i].removeAttribute("disabled", false);
  }
}