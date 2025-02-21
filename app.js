const questions = [
     {
         question: "What is the largest planet in our solar system?",
         answers: [
             { text: "Earth", correct: false },
             { text: "Jupiter", correct: true },
             { text: "Mars", correct: false },
             { text: "Venus", correct: false }
         ]
     },
     {
         question: "Who developed the theory of relativity?",
         answers: [
             { text: "Isaac Newton", correct: false },
             { text: "Albert Einstein", correct: true },
             { text: "Nikola Tesla", correct: false },
             { text: "Galileo Galilei", correct: false }
         ]
     },
     {
         question: "Which element has the chemical symbol 'O'?",
         answers: [
             { text: "Gold", correct: false },
             { text: "Oxygen", correct: true },
             { text: "Silver", correct: false },
             { text: "Osmium", correct: false }
         ]
     },
     {
         question: "Which is the longest river in the world?",
         answers: [
             { text: "Amazon", correct: false },
             { text: "Nile", correct: true },
             { text: "Yangtze", correct: false },
             { text: "Mississippi", correct: false }
         ]
     }
 ];
 
 const questionElement = document.getElementById("question");
 const answerButtons = document.getElementById("answer-buttons");
 const nextButton = document.getElementById("next-btn");
 
 let currentQuestionIndex = 0;
 let score = 0;
 
 function startQuiz() {
     currentQuestionIndex = 0;
     score = 0;
     nextButton.style.display = "none";
     showQuestion();
 }
 
 function showQuestion() {
     resetState();
     const currentQuestion = questions[currentQuestionIndex];
     questionElement.textContent = currentQuestion.question;
     
     currentQuestion.answers.forEach(answer => {
         const button = document.createElement("button");
         button.textContent = answer.text;
         button.classList.add("btn");
         answerButtons.appendChild(button);
         
         if (answer.correct) {
             button.dataset.correct = answer.correct;
         }
         
         button.addEventListener("click", selectAnswer);
     });
 }
 
 function resetState() {
     nextButton.style.display = "none";
     while (answerButtons.firstChild) {
         answerButtons.removeChild(answerButtons.firstChild);
     }
 }
 
 function selectAnswer(e) {
     const selectedBtn = e.target;
     const isCorrect = selectedBtn.dataset.correct === "true";
 
     selectedBtn.classList.add(isCorrect ? "correct" : "incorrect");
 
     Array.from(answerButtons.children).forEach(button => {
         button.disabled = true;
         if (button.dataset.correct === "true") {
             button.classList.add("correct");
         }
     });
 
     if (isCorrect) {
         score++;
     }
 
     nextButton.style.display = "block";
 }
 
 function showScore() {
     resetState();
     questionElement.innerHTML = `🎉 Your score: <strong>${score}</strong> / ${questions.length}`;
     nextButton.textContent = "Play Again";
     nextButton.style.display = "block";
 }
 
 function handleNextButton() {
     currentQuestionIndex++;
     if (currentQuestionIndex < questions.length) {
         showQuestion();
     } else {
         showScore();
     }
 }
 
 nextButton.addEventListener("click", () => {
     if (currentQuestionIndex < questions.length) {
         handleNextButton();
     } else {
         startQuiz();
     }
 });
 
 startQuiz();
 