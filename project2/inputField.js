// const ROWS = 6;
// const COLS = 5;
// let answer = "";
// let currentRow = 0;

// const container = document.querySelector(".word_box");

// function createGrid() {
//   container.innerHTML = "";
//   for (let i = 0; i < ROWS; i++) {
//     const row = document.createElement("div");
//     row.classList.add("row");

//     for (let j = 0; j < COLS; j++) {
//       const cell = document.createElement("div");
//       cell.classList.add("cell");
//       cell.setAttribute("data-row", i);
//       cell.setAttribute("data-col", j);
//       row.appendChild(cell);
//     }

//     container.appendChild(row);
//   }
// }

// function checkGuess(guess) {
//   console.log(`Checking guess: ${guess}`);
//   if (guess === answer) {
//     alert("🎉 Congratulations! You guessed the word!");
//     document.getElementById("restartGame").style.display = "block";
//     return true;
//   } else {
//     return false;
//   }
// }

// function updateGridRow(guess) {
//   for (let i = 0; i < COLS; i++) {
//     const cell = document.querySelector(
//       `.cell[data-row="${currentRow}"][data-col="${i}"]`
//     );
//     if (cell) {
//       cell.textContent = guess[i];
//     }
//   }
// }

// function restartGame() {
//   currentRow = 0;
//   document.getElementById("guessInput").value = "";
//   document.getElementById("restartGame").style.display = "none";
//   createGrid();

//   fetch("https://random-word-api.vercel.app/api?words=1&length=5")
//     .then((res) => res.json())
//     .then((data) => {
//       answer = data[0].toUpperCase();
//       console.log(`The answer is: ${answer}`);
//     });
// }

// document.addEventListener("DOMContentLoaded", () => {
//   createGrid();
//   restartGame();

//   document
//     .getElementById("submitGuess")
//     .addEventListener("click", () => {
//       const input = document.getElementById("guessInput");
//       const guess = input.value.trim().toUpperCase();

//       if (guess.length !== 5 || /[^A-Z]/.test(guess)) {
//         alert("Please enter a valid 5-letter word.");
//         return;
//       }

//       updateGridRow(guess);

//       if (!checkGuess(guess)) {
//         if (currentRow < ROWS - 1) {
//           currentRow++;
//           input.value = "";
//         } else {
//           alert(`Game Over! The word was ${answer}`);
//           document.getElementById("restartGame").style.display = "block";
//         }
//       }
//     });

//   document
//     .getElementById("restartGame")
//     .addEventListener("click", restartGame);
// });



const ROWS = 6;
const COLS = 5;
let answer = "";
let currentRow = 0;

const container = document.querySelector(".word_box");

function createGrid() {
  for (let i = 0; i < ROWS; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < COLS; j++) {
      const cell = document.createElement("input");
      cell.classList.add("cell");
      cell.setAttribute("data-row", i);
      cell.setAttribute("data-col", j);
      cell.setAttribute("maxlength", "1");
      cell.setAttribute("type", "text");
      cell.disabled = true;
      cell.disabled = i !== 0;

      row.appendChild(cell);
    }
    container.appendChild(row);
  }
}

function handleInput(event) {
  const input = event.target;

  if (parseInt(input.dataset.row) !== currentRow) {
    input.value = "";
    return;
  }
  let cleaned = input.value.replace(/[^a-zA-Z]/g, "").toUpperCase();

  input.value = cleaned;

  if (cleaned.length === 0) {
    return;
  } else if (cleaned.length > 1) {
    input.value = cleaned.slice(0, 1);
  }

  let row = parseInt(input.dataset.row);
  let col = parseInt(input.dataset.col);

  col++;

  const nextInput = document.querySelector(
    `input[data-row="${row}"][data-col="${col}"]`
  );
  if (nextInput) {
    nextInput.focus();
  }
}

function handleKeyDown(event) {
  const input = event.target;
  let row = parseInt(input.dataset.row);
  let col = parseInt(input.dataset.col);
  if (event.key === "Backspace" && input.value === "") {
    const previousInput = document.querySelector(
      `input[data-row="${row}"][data-col="${col - 1}"]`
    );
    if (previousInput) {
      previousInput.focus();
    }
    return;
  }

  if (event.key === "Enter" && input.value.length === 1) {
    const guess = Array.from(
      document.querySelectorAll(`input[data-row="${row}"]`)
    )
      .map((cell) => cell.value)
      .join("");
    checkGuess(guess);
    return;
  }
}

function updateEnabled(row) {
  const inputs = document.querySelectorAll(".cell");
  inputs.forEach((input) => {
    input.disabled = parseInt(input.dataset.row) !== row;
    if (!input.disabled) {
      input.value = "";
    }
  });
  const firstInput = document.querySelector(
    `input[data-row="${row}"][data-col="0"]`
  );
  if (firstInput) {
    firstInput.focus();
  }
}

document.getElementById("submitGuess").addEventListener("click", () => {
  const guessInput = document.getElementById("guessInput");
  const guess = guessInput.value.trim().toUpperCase();

  if (guess.length !== 5 || /[^A-Z]/.test(guess)) {
    alert("Please enter a valid 5-letter word.");
    return;
  }

  // Display guess in current row
  for (let i = 0; i < 5; i++) {
    const cell = document.querySelector(
      `input[data-row="${currentRow}"][data-col="${i}"]`
    );
    if (cell) {
      cell.value = guess[i];
    }
  }
});

function updateGridRow(guess) {
  for (let i = 0; i < COLS; i++) {
    const cell = document.querySelector(
      `.cell[data-row="${currentRow}"][data-col="${i}"]`
    );
    if (cell) {
      cell.textContent = guess[i];
    }
  }
}

function checkGuess(guess) {
  console.log(`Checking guess: ${guess}`);
  if (guess === answer) {
    console.log("Congratulations! You've guessed the word!");
    alert("Congratulations! You've guessed the word!");
  } else {
    if (currentRow < ROWS - 1) {
      currentRow++;
      updateEnabled(currentRow);
    } else {
      console.log("Game Over! No more rows available.");
    }
  }
}

document.getElementById("submitGuess").addEventListener("click", () => {
  const input = document.getElementById("guessInput");
  const guess = input.value.trim().toUpperCase();

  if (guess.length !== 5 || /[^A-Z]/.test(guess)) {
    alert("Please enter a valid 5-letter word.");
    return;
  }

  updateGridRow(guess);
  checkGuess(guess);
  input.value = ""; 
});


document.addEventListener("DOMContentLoaded", () => {
  createGrid();

  fetch("https://random-word-api.vercel.app/api?words=1&length=5")
    .then((res) => res.json())
    .then((data) => {
      answer = data[0].toUpperCase();
      console.log(`The answer is: ${answer}`);
    });

  const inputs = document.querySelectorAll(".cell");

  inputs.forEach((input) => {
    input.addEventListener("input", handleInput);
    input.addEventListener("keydown", handleKeyDown);
  });
});
