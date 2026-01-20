const answers: string[] = [
  "It is certain",
  "It is decidedly so",
  "Without a doubt",
  "Yes definitely",
  "You may rely on it",
  "As I see it, yes",
  "Most likely",
  "Outlook good",
  "Yes",
  "Signs point to yes",
  "Reply hazy, try again",
  "Ask again later",
  "Better not tell you now",
  "Cannot predict now",
  "Concentrate and ask again",
  "Don't count on it",
  "My reply is no",
  "My sources say no",
  "Outlook not so good",
  "Very doubtful"
];

const questionInput = document.getElementById('question-input') as HTMLInputElement;
const clearButton = document.getElementById('clear-button') as HTMLButtonElement;
const shakeButton = document.getElementById('shake-button') as HTMLButtonElement;
const eightBall = document.getElementById('eight-ball') as HTMLDivElement;
const answerContainer = document.getElementById('answer-container') as HTMLDivElement;
const answerText = document.getElementById('answer-text') as HTMLDivElement;

let isShaking = false;

function getAnswer(): string {
  const randomIndex = Math.floor(Math.random() * answers.length);
  return answers[randomIndex];
}

function resetBall() {
  eightBall.classList.remove('show-answer', 'shaking');
  answerContainer.classList.add('hidden');
  answerContainer.classList.remove('fade-in');
}

function handleShake() {
  if (isShaking) return;

  const question = questionInput.value.trim();
  if (!question) {
    alert("Please ask a question first!");
    return;
  }

  isShaking = true;

  // Reset visual state
  eightBall.classList.remove('show-answer');
  answerContainer.classList.add('hidden');
  answerContainer.classList.remove('fade-in');

  // Start shaking
  eightBall.classList.add('shaking');

  // After 1.5 seconds, stop shaking and show answer
  setTimeout(() => {
    eightBall.classList.remove('shaking');
    eightBall.classList.add('show-answer');

    const answer = getAnswer();
    answerText.textContent = answer;

    answerContainer.classList.remove('hidden');
    answerContainer.classList.add('fade-in');

    isShaking = false;
  }, 1500);
}

shakeButton.addEventListener('click', handleShake);

// Clear button logic
clearButton.addEventListener('click', () => {
  questionInput.value = '';
  clearButton.style.display = 'none';
  resetBall();
  questionInput.focus();
});

// Show/hide clear button based on input
questionInput.addEventListener('input', () => {
  const hasText = questionInput.value.length > 0;
  clearButton.style.display = hasText ? 'block' : 'none';
  if (!hasText) {
    resetBall();
  }
});

// Also shake on 'Enter' key
questionInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleShake();
  }
});
