// -------------------------------
// 1. Math Questions
// -------------------------------
const questions = [
  {
    question: "What is 2 × 2?",
    answers: [
      { text: "2", correct: false },
      { text: "4", correct: true },
      { text: "6", correct: false },
      { text: "8", correct: false }
    ]
  },
  {
    question: "What is 5 + 3?",
    answers: [
      { text: "7", correct: false },
      { text: "8", correct: true },
      { text: "9", correct: false },
      { text: "10", correct: false }
    ]
  },
  {
    question: "What is 10 ÷ 2?",
    answers: [
      { text: "2", correct: false },
      { text: "5", correct: true },
      { text: "10", correct: false },
      { text: "20", correct: false }
    ]
  },
  {
    question: "What is 7 - 3?",
    answers: [
      { text: "4", correct: true },
      { text: "3", correct: false },
      { text: "5", correct: false },
      { text: "6", correct: false }
    ]
  },
  {
    question: "What is 3 × 3?",
    answers: [
      { text: "6", correct: false },
      { text: "9", correct: true },
      { text: "12", correct: false },
      { text: "3", correct: false }
    ]
  }
];

// -------------------------------
// 2. DOM Elements
// -------------------------------
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');

// -------------------------------
// 3. Game State
// -------------------------------
let currentQuestionIndex = 0;
let score = 0;

// -------------------------------
// 4. Start Quiz
// -------------------------------
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreElement.innerText = "";
  nextButton.style.display = "none";
  nextButton.innerText = "Next Question";
  showQuestion();
}

// -------------------------------
// 5. Show Question
// -------------------------------
function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
}

// -------------------------------
// 6. Reset State
// -------------------------------
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// -------------------------------
// 7. Select Answer
// -------------------------------
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  if (correct) score++;

  Array.from(answerButtons.children).forEach(button => {
    setStatus(button, button.dataset.correct === "true");
  });

  nextButton.style.display = "block";
}

// -------------------------------
// 8. Set Button Color
// -------------------------------
function setStatus(button, correct) {
  button.style.backgroundColor = correct ? "green" : "red";
  button.disabled = true;
}

// -------------------------------
// 9. Next Button Click
// -------------------------------
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

// -------------------------------
// 10. Show Final Score
// -------------------------------
function showScore() {
  questionElement.innerText = "Quiz Completed!";
  scoreElement.innerText = `Your Score: ${score} / ${questions.length}`;
  nextButton.innerText = "Restart Quiz";
  nextButton.style.display = "block";
  nextButton.addEventListener('click', startQuiz, { once: true });
}

// -------------------------------
// 11. Initialize Quiz
// -------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const questions = [
      { question: "What is 2 × 2?", answers: [{text:"2",correct:false},{text:"4",correct:true},{text:"6",correct:false},{text:"8",correct:false}] },
      { question: "What is 5 + 3?", answers: [{text:"7",correct:false},{text:"8",correct:true},{text:"9",correct:false},{text:"10",correct:false}] },
      { question: "What is 10 ÷ 2?", answers: [{text:"2",correct:false},{text:"5",correct:true},{text:"10",correct:false},{text:"20",correct:false}] },
      { question: "What is 7 - 3?", answers: [{text:"4",correct:true},{text:"3",correct:false},{text:"5",correct:false},{text:"6",correct:false}] },
      { question: "What is 3 × 3?", answers: [{text:"6",correct:false},{text:"9",correct:true},{text:"12",correct:false},{text:"3",correct:false}] }
    ];

    const questionEl = document.getElementById('question');
    const answerButtonsEl = document.getElementById('answer-buttons');
    const nextBtn = document.getElementById('next-btn');
    const scoreEl = document.getElementById('score');

    let currentIndex = 0;
    let score = 0;

    function startQuiz() {
      currentIndex = 0;
      score = 0;
      scoreEl.textContent = '';
      nextBtn.style.display = 'none';
      nextBtn.textContent = 'Next Question';
      showQuestion();
    }

    function showQuestion() {
      resetState();
      const q = questions[currentIndex];
      questionEl.textContent = q.question;
      q.answers.forEach((a, idx) => {
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.textContent = a.text;
        btn.dataset.correct = a.correct ? 'true' : 'false';
        btn.dataset.index = idx;
        btn.addEventListener('click', selectAnswer);
        answerButtonsEl.appendChild(btn);
      });
    }

    function resetState() {
      nextBtn.style.display = 'none';
      while (answerButtonsEl.firstChild) answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }

    function selectAnswer(e) {
      const selected = e.currentTarget;
      const isCorrect = selected.dataset.correct === 'true';
      if (isCorrect) score++;
      Array.from(answerButtonsEl.children).forEach(btn => {
        const correct = btn.dataset.correct === 'true';
        btn.style.backgroundColor = correct ? '#4caf50' : '#f44336';
        btn.disabled = true;
      });
      scoreEl.textContent = `Score: ${score} / ${questions.length}`;
      nextBtn.style.display = 'inline-block';
    }

    nextBtn.addEventListener('click', () => {
      currentIndex++;
      if (currentIndex < questions.length) {
        showQuestion();
      } else {
        questionEl.textContent = 'Quiz Completed!';
        resetState();
        nextBtn.textContent = 'Restart Quiz';
        nextBtn.style.display = 'inline-block';
        nextBtn.removeEventListener('click', arguments.callee);
        nextBtn.addEventListener('click', startQuiz, { once: true });
      }
    });

    startQuiz();
});