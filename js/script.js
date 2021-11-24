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

let startGameBtnEl = document.querySelector("#startGameBtn") // DOM-nod: knappen som du startar spelet med
let msgHolderEl = document.querySelector("#message"); // DOM-nod: Ger meddelande när spelet är över
let guesses = 0; // Number: håller antalet gissningar som gjorts
let letterButtonEls = document.querySelectorAll("#letterButtons button"); // Array av DOM-noder: Knapparna för bokstäverna
let letterBoxEls = document.querySelector("#letterBoxes > ul"); // Array av DOM-noder: Rutorna där bokstäverna ska stå
let hangmanImgEl = document.querySelector("#hangman"); // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`
let selectedWord = ""; // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan


startGameBtnEl.addEventListener("click", startGame); 

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner

function startGame() {
  startGameBtnEl.setAttribute("disabled", true);
  generateRandomWord();
  createLetterBoxes();
  clickButton();
}

// Funktion som slumpar fram ett ord

function generateRandomWord() {
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  console.log("", selectedWord);
}

// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram

function createLetterBoxes() {
    letterBoxEls.innerHTML="";
   for(let i=0; i < selectedWord.length; i++ ) {
   letterBoxEls.innerHTML+= `<li><input disabled value="_" type="text"></li>`;
  } 
}

// Funktion som körs när du trycker på bokstäverna och gissar bokstav

 function clickButton() { 
  letterBoxEls = document.querySelectorAll("#letterBoxes > ul > li > input");
  for (let i = 0; i < letterButtonEls.length; i++) {
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
        }
    });
  }
}

function checkFail ()


// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet

// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på 



/*
const clickCheck = (e) => { //sätt funktioner till const då du inte behöver ändra dem 
  // gameProgress(e.target.value);
  letterBoxEls = document.querySelectorAll("#letterBoxes > ul > li > input");
  console.log(e.target.value);
  for (let i = 0; i < selectedWord.length; i++) {
    if (e.target.value.toLowerCase() === selectedWord[i].toLowerCase()) {
      letterBoxEls[i].value = e.target.value;
      correctLetter.push(e.target.value);
    } 
  }
  testFail(e.currentTarget.value);
/*   for(let i=0; i < letterButtonEls.length; i++) {
    for(let j=0; j < selectedWord.length; j++) {
      if(letterButtonEls[i].value.toLowerCase() != selectedWord[j].toLowerCase()) {
        alert("hej");
      }
    }
  } */
/*   if (selectedWord.indexOf(e.target.value) === -1) {
    alert("hej");
   // guesses++;
   // hangmanImgEl.src = `images/h${guesses}.png`;

    //du skulle även behöva ta bort eventListener på knappen här om du vill undvika att det går att klicka igen. 
  } 
  e.target.setAttribute("disabled", true);
  console.log(guesses);
  console.log(correctLetter);
};	

function testFail (clickedButton) {
  if (selectedWord.indexOf(clickedButton) < 0) {
    alert(clickedButton);
/*     guesses++; 
    hangmanImgEl.src = `images/h${guesses}.png`; 
  }

}



/* function clickButton() {
  let clickCheck = (e)=> {
     letterBoxEls = document.querySelectorAll("#letterBoxes > ul > li > input");
    console.log(e.target.value);
    for(let i=0; i < selectedWord.length; i++ ) {
      if(e.target.value.toLowerCase()===selectedWord[i].toLowerCase()) {
        letterBoxEls[i].value=e.target.value;
      }
    }
    if(selectedWord.indexOf(e.target.value)===-1) { 
      guesses++; 
      hangmanImgEl.src=`images/h${guesses}.png`;
      }
    console.log(guesses);
   }

  for(let i=0; i < letterButtonEls.length; i++ ) {
    letterButtonEls[i].addEventListener("click", clickCheck);
  } console.log(letterBoxEls);
  }
 */