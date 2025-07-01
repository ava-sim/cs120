const ROWS = 6;
const COLS = 5;
let answer = "";
let currentRow = 0;
const keyboard = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM←"];
const keyboardContainer = document.querySelector(".keyboard");
const container = document.querySelector(".word_box");

/********** createGrid ************************************************
 *
 * Creates a grid of input fields for the Wordle game.
 *
 * Parameters:
 * Return: None (void function)
 *
 **********************************************************************/
function createGrid() {
  for (let i = 0; i < ROWS; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < COLS; j++) {
      const cell = document.createElement("input");
      cell.classList.add("cell");
      cell.type = "text";
      cell.maxLength = 1;
      cell.disabled = i !== 0;
      cell.dataset.row = i;
      cell.dataset.col = j;
      row.appendChild(cell);
    }
    container.appendChild(row);
  }
}

/********** createKeyboard *********************************************
 *
 * Dynamically generates the virtual keyboard and handles input logic
 * for normal keys, backspace, and enter.
 *
 * Parameters:
 * Return: None (void function)
 *
 **********************************************************************/
function createKeyboard() {
  keyboard.forEach((row) => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("keyboard-row");
    row.split("").forEach((key) => {
      const keyButton = document.createElement("button");
      keyButton.classList.add("key");
      keyButton.textContent = key;
      rowDiv.appendChild(keyButton);
    });
    keyboardContainer.appendChild(rowDiv);
  });
}

/********** handleKeyboardInput ****************************************
 *
 * Handles keyboard input events for the virtual keyboard.
 *
 * Parameters: event - The click event triggered by the user.
 * Return: None (void function)
 *
 * **********************************************************************/
function handleKeyboardInput(event) {
  const key = event.target.textContent;
  if (!event.target.classList.contains("key")) return;

  const inputs = Array.from(
    document.querySelectorAll(`input[data-row="${currentRow}"]`)
  );

  if (key === "←") {
    for (let i = inputs.length - 1; i >= 0; i--) {
      if (inputs[i].value !== "") {
        inputs[i].value = "";
        inputs[i].focus();
        break;
      }
    }
  } else if (key === "ENTER") {
    submitCurrentRowGuess();
  } else {
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value === "") {
        inputs[i].value = key;
        if (i + 1 < inputs.length) inputs[i + 1].focus();
        break;
      }
    }
  }
}

/********** handleInput ***********************************************
 *
 * Handles input events for the Wordle game. This function is triggered
 * when the user types into the input fields.
 *
 * Parameters: event - The input event triggered by the user.
 * Return: None (void function)
 *
 **********************************************************************/
function handleInput(event) {
  const input = event.target;
  if (parseInt(input.dataset.row) !== currentRow) {
    input.value = "";
    return;
  }
  const cleaned = input.value.replace(/[^a-zA-Z]/g, "").toUpperCase();
  input.value = cleaned.slice(0, 1);
  if (input.value) {
    const next = document.querySelector(
      `input[data-row="${currentRow}"][data-col="${
        parseInt(input.dataset.col) + 1
      }"]`
    );
    if (next) next.focus();
  }
}

/********** handleKeyDown *********************************************
 *
 * Handles keydown events for the Wordle game including enter and backspace.
 * This function is triggered when the user presses keys on the keyboard.
 *
 * Parameters: event - The keydown event triggered by the user.
 * Return: None (void function)
 *
 **********************************************************************/
function handleKeyDown(event) {
  const input = event.target;
  const row = parseInt(input.dataset.row);
  const col = parseInt(input.dataset.col);

  if (event.key === "Backspace" && input.value === "") {
    const prev = document.querySelector(
      `input[data-row="${row}"][data-col="${col - 1}"]`
    );
    if (prev) prev.focus();
  }

  if (event.key === "Enter") {
    setTimeout(() => submitCurrentRowGuess(), 10);
  }
}

/********** updateEnabled **********************************************
 *
 * Updates the enabled state of input fields based on the current row.
 *
 * Parameters: row - The row number to enable inputs for.
 * Return: None (void function)
 *
 **********************************************************************/
function updateEnabled(row) {
  document.querySelectorAll(".cell").forEach((input) => {
    input.disabled = parseInt(input.dataset.row) !== row;
    if (!input.disabled) input.value = "";
  });
  const firstInput = document.querySelector(
    `input[data-row="${row}"][data-col="0"]`
  );
  if (firstInput) firstInput.focus();
}

/********** updateGridRow *********************************************
 *
 * Updates the grid row with the user's guess.
 *
 * Parameters: guess - The user's guess string, 5 letter input.
 * Return: None (void function)
 *
 **********************************************************************/
function updateGridRow(guess) {
  for (let i = 0; i < COLS; i++) {
    const cell = document.querySelector(
      `.cell[data-row="${currentRow}"][data-col="${i}"]`
    );
    if (cell) cell.value = guess[i];
  }
}

/********** submitCurrentRowGuess **************************************
 *
 * Collects and validates the user's guess from the current row.
 * Called by both physical and virtual keyboards.
 *
 * Parameters:
 * Return: None (void function)
 *
 **********************************************************************/
function submitCurrentRowGuess() {
  let guess = Array.from(
    document.querySelectorAll(`input[data-row="${currentRow}"]`)
  )
    .map((cell) => cell.value)
    .join("");

  if (guess.length === 5) {
    checkGuess(guess);
  } else {
    const guessInputBox = document
      .getElementById("guessInput")
      ?.value.trim()
      .toUpperCase();
    if (guessInputBox && guessInputBox.length === 5) {
      checkGuess(guessInputBox);
      document.getElementById("guessInput").value = "";
    } else {
      alert("Please fill all 5 letters before submitting.");
    }
  }
}

/********** checkGuess ************************************************
 *
 * Checks the user's guess against the answer and updates the game state.
 *
 * Parameters: guess - The user's guess string, 5 letter input.
 * Return: None (void function)
 *
 **********************************************************************/
function checkGuess(guess) {
  if (guess.length !== 5) {
    alert("Please enter a 5-letter word.");
    return;
  }

  updateGridRow(guess);
  updateColors(guess);
  updateKeyboardColors(guess);

  if (guess === answer) {
    wonGame();
      const totalGames = getCookie("games");
  const totalGuesses = getCookie("guesses");

  setCookie("games", totalGames + 1);
  setCookie("guesses", totalGuesses + (currentRow + 1));
    return;
  } else if (currentRow < ROWS - 1) {
    currentRow++;
    updateEnabled(currentRow);
  } else {
    alert(`Game Over! The word was ${answer}`);
    document.getElementById("restartGame").style.display = "block";
      const totalGames = getCookie("games");
  const totalGuesses = getCookie("guesses");

  setCookie("games", totalGames + 1);
  setCookie("guesses", totalGuesses + (currentRow + 1));
  }
}

/********** updateColors ***********************************************
 * Updates the colors of the input cells based on the guess.
 *
 * Parameters: guess - The user's guess string, 5 letter input.
 * Return: None (void function)
 *
 * **********************************************************************/
function updateColors(guess) {
  const cells = Array.from(
    document.querySelectorAll(`.cell[data-row="${currentRow}"]`)
  );
  cells.forEach((cell) =>
    cell.classList.remove("correct", "wrongSpot", "wrong")
  );

  const guessLetters = guess.split("");
  let answerArray = answer.split("");

  let statuses = Array(COLS).fill("wrong");

  for (let i = 0; i < COLS; i++) {
    if (guessLetters[i] === answerArray[i]) {
      statuses[i] = "correct";
      answerArray[i] = null;
    }
  }

  for (let i = 0; i < COLS; i++) {
    if (statuses[i] === "correct") continue;

    let indexInAnswer = answerArray.indexOf(guessLetters[i]);
    if (indexInAnswer !== -1) {
      statuses[i] = "wrongSpot";
      answerArray[indexInAnswer] = null;
    }
  }

  for (let i = 0; i < COLS; i++) {
    cells[i].classList.add(statuses[i]);
  }
}

/********** updateKeyboardColors ***************************************
 *
 * Updates the colors of the virtual keyboard based on the current guess.
 *
 * Parameters: None
 * Return: None (void function)
 *
 * **********************************************************************/
function updateKeyboardColors() {
  const cells = Array.from(
    document.querySelectorAll(`.cell[data-row="${currentRow}"]`)
  );
  const guessLetters = cells.map((cell) => cell.value);
  const answerArray = answer.split("");

  const keyStatus = {};

  for (let i = 0; i < COLS; i++) {
    const letter = guessLetters[i];
    if (!letter) continue;

    if (letter === answerArray[i]) {
      keyStatus[letter] = "correct";
    } else if (answerArray.includes(letter)) {
      if (keyStatus[letter] !== "correct") {
        keyStatus[letter] = "wrongSpot";
      }
    } else {
      if (!keyStatus[letter]) {
        keyStatus[letter] = "wrong";
      }
    }
  }

  document.querySelectorAll(".key").forEach((key) => {
    const letter = key.textContent;

    const status = keyStatus[letter];
    if (status) {
      key.classList.add(status);
    }
  });
}

/********** resetGame *************************************************
 *
 * Resets the game state, clears the grid, and fetches a new word.
 *
 * Parameters: row - The row number to enable inputs for.
 * Return: None (void function)
 *
 **********************************************************************/
function resetGame() {
  currentRow = 0;

  document.querySelectorAll(".cell").forEach((cell) => {
    cell.value = "";
    cell.disabled = true;
  });
  updateEnabled(currentRow);
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("correct", "wrongSpot", "wrong");
  });

  document.querySelectorAll(".key").forEach((key) => {
    key.classList.remove("correct", "wrongSpot", "wrong");
  });

  document.getElementById("restartGame").style.display = "none";

  fetch("https://random-word-api.vercel.app/api?words=1&length=5")
    .then((res) => res.json())
    .then((data) => {
      answer = data[0].toUpperCase();
    });
  showStats();
}

/********** wonGame ***************************************************
 *
 * Handles the game-winning logic, disables further input.
 *
 * Parameters: None
 * Return: None (void function)
 *
 **********************************************************************/
async function wonGame() {
  const cells = Array.from(
    document.querySelectorAll(`.cell[data-row="${currentRow}"]`)
  );
  cells.forEach((cell) => {
    cell.disabled = true;
    cell.classList.add("correct");
  });
  document.getElementById("restartGame").style.display = "block";
  await new Promise((resolve) => setTimeout(resolve, 300));
  alert("Congratulations! You've guessed the word!");
}


/********** Cookie Management (EX) ************************************/


/********** setCookie ************************************************
 * 
 * Sets a cookie with the specified name, value, and expiration days.
 * 
 * Parameters:
 *  name - The name of the cookie.
 *  value - The value of the cookie.
 *  days - The number of days until the cookie expires.
 * 
 * Return: None (void function)
 * 
 * **********************************************************************/
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

/********** getCookie ************************************************
 * 
 * Retrieves the value of a cookie by its name.
 * 
 * Parameters: name - The name of the cookie to retrieve.
 * 
 * Return: The value of the cookie as an integer, or 0 if not found.
 * 
 * **********************************************************************/
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return parseInt(value);
    }
  }
  return 0;
}


/********** showStats *************************************************
 * 
 * Displays the game statistics including total games played and
 * average guesses per game.
 * 
 * Parameters: None
 * Return: None (void function)
 * 
 * **********************************************************************/
function showStats() {
  const totalGames = getCookie("games");
  const totalGuesses = getCookie("guesses");
  console.log(`Total Games: ${totalGames}, Total Guesses: ${totalGuesses}`);
  const averageGuesses = totalGames
    ? (totalGuesses / totalGames).toFixed(2)
    : 0;

  if (totalGames > 0) {
    document.getElementById(
      "stats"
    ).textContent = `Average guesses per game: ${averageGuesses}`;
  }
}

/********** Javascript to Run ******************************************
 *
 * Initializes the Wordle game by creating the grid, resetting the game,
 *
 **********************************************************************/
document.addEventListener("DOMContentLoaded", () => {
  createGrid();
  createKeyboard();
  resetGame();

  showStats();

  document
    .getElementById("submitGuess")
    .addEventListener("click", submitCurrentRowGuess);
  container.addEventListener("input", handleInput);
  document.addEventListener("keydown", handleKeyDown);
  keyboardContainer.addEventListener("click", handleKeyboardInput);
  document.getElementById("restartGame").addEventListener("click", resetGame);
});
