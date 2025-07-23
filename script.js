let secretNumber = Math.floor(Math.random() * 20) + 1;
let attempts = 0;
let guessedNumbers = [];

const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const feedback = document.getElementById('feedback');
const history = document.getElementById('history');
const attemptsDisplay = document.getElementById('attempts');
const restartBtn = document.getElementById('restartBtn');

guessBtn.addEventListener('click', handleGuess);
restartBtn.addEventListener('click', resetGame);

function handleGuess() {
  const guess = Number(guessInput.value);

  if (!guess || guess < 1 || guess > 20) {
    feedback.textContent = "⛔ Enter a number between 1 and 20!";
    feedback.style.color = '#ff4d4d';
    return;
  }

  if (guessedNumbers.includes(guess)) {
    feedback.textContent = `⚠️ You already guessed ${guess}. Try a new number!`;
    feedback.style.color = '#ffaa00';
    return;
  }

  guessedNumbers.push(guess);
  attempts++;
  attemptsDisplay.textContent = `Attempts: ${attempts}`;
  history.textContent = `Previous guesses: ${guessedNumbers.join(', ')}`;

  if (guess === secretNumber) {
    feedback.textContent = `🎉 Correct! The number was ${secretNumber}.`;
    feedback.style.color = '#00ff99';
    guessBtn.disabled = true;
    guessInput.disabled = true;
    restartBtn.classList.remove('hidden');
  } else {
    const diff = Math.abs(secretNumber - guess);
    let hint = diff <= 2 ? "🔥 Very close!" : diff <= 5 ? "🌡️ Warm" : "🧊 Cold";
    feedback.textContent = guess < secretNumber
      ? `📉 Too low! ${hint}`
      : `📈 Too high! ${hint}`;
    feedback.style.color = '#ffcc00';
  }

  guessInput.value = "";
  guessInput.focus();
}

function resetGame() {
  secretNumber = Math.floor(Math.random() * 20) + 1;
  attempts = 0;
  guessedNumbers = [];

  feedback.textContent = "";
  history.textContent = "";
  attemptsDisplay.textContent = "Attempts: 0";
  guessInput.value = "";
  guessBtn.disabled = false;
  guessInput.disabled = false;
  restartBtn.classList.add('hidden');
  feedback.style.color = '#fff';
}
