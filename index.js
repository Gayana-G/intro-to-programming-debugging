const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const tooHighMessage = document.getElementById("too-high");
const tooLowMessage = document.getElementById("too-low");
const maxGuessesMessage = document.getElementById("max-guesses");
const numberOfGuessesMessage = document.getElementById("number-of-guesses");
const correctMessage = document.getElementById("correct");
const outOfRangeMessage = document.getElementById("out-of-range");

let targetNumber;
let attempts = 0;
let maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);

  // Exclude numbers out of range 1-99
  if (guess < 1 || guess > 99) {
    outOfRangeMessage.style.display = "";
    outOfRangeMessage.innerText = `You entered ${guess}. Please enter a number from 1 to 99 included`;

    guessInput.value = "";
    submitButton.disabled = true;
    guessInput.disabled = true;
    resetButton.style.display = "";
  } else {
    attempts += 1;

    hideAllMessages();

    if (guess === targetNumber) {
      numberOfGuessesMessage.style.display = "";
      numberOfGuessesMessage.innerText = `You made ${attempts} guesses`;

      correctMessage.style.display = "";

      submitButton.disabled = true;
      guessInput.disabled = true;
      resetButton.style.display = "";
    } else {
      if (guess < targetNumber) {
        tooLowMessage.style.display = "";
      } else {
        tooHighMessage.style.display = "";
      }
    }

    let remainingAttempts = maxNumberOfAttempts - attempts;

    if (remainingAttempts === 0) {
      maxGuessesMessage.style.display = "";
      submitButton.disabled = true;
      guessInput.disabled = true;

      // Reset number of attempts
      attempts = 0;
      resetButton.style.display = "";
    }

    //these 2 lines of code were reachable only if condition from the line 45 was true
    numberOfGuessesMessage.style.display = "";
    if (remainingAttempts === 1) {
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guess remaining`;
    } else {
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
    }

    guessInput.value = "";
  }
}

function hideAllMessages() {
  const messages = document.getElementsByClassName("message");
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    // <= changed to <
    messages[elementIndex].style.display = "none";
  }
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  hideAllMessages();
  resetButton.style.display = "none";

  submitButton.disabled = false;
  guessInput.disabled = false;
}

resetButton.addEventListener("click", setup);
submitButton.addEventListener("click", checkGuess);


setup();
