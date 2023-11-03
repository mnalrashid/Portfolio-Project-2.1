const questions = [
    {
        question: "What is the population of the County Sligo?",
        answers : [
            {text: "20,198", correct: false },
            {text: "50,198", correct: false },
            {text: "70,000", correct: true },
        ]
    },
    {
        question: "Which mountain situated in Sligo?",
        answers: [
            {text: "Carrauntoohil", correct: false },
            {text: "Benbulbin", correct: true },
            {text: "Errigal", correct: false },
        ]
    },
    {
        question: "Which beach is located in Sligo?",
        answers: [
            {text: "Glanleam", correct: false },
            {text: "Inchydoney", correct: false },
            {text: "Strandhill", correct: true },
        ]
    },
    {
        question: "Which archaeological site is in Sligo?",
        answers: [
            {text: "Dún Aonghasa", correct: false },
            {text: "Carrowmore Megalithic Cemetery", correct: true },
            {text: "Brú na Bóinne", correct: false },
        ]
    },
    {
        question: "Who was born in Sligo?",
        answers: [
            {text: "William Butler Yeats", correct: false },
            {text: "James Kerry", correct: true },
            {text: "Conor Anthony McGregor", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerText = answers.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answers.correct){
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer (e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    if(score > 4){
        questionElement.innerHTML = "Welldone, you know very well about Sligo.";
        nextButton.innerHTML = "Ask your friend to try!";
        nextButton.style.display = "block";
        document.body.style.backgroundImage = "url(win.jpg)";
    }else if( score >= 3){
        questionElement.innerHTML = "You are almost there, Visit Sligo again";
        nextButton.innerHTML = "Try Again!";
        nextButton.style.display = "block";
        document.body.style.background = "Blue";
    }else if( score >= 0){
        questionElement.innerHTML = "Come and visit Sligo";
        nextButton.innerHTML = "Visit Sligo and try again!";
        nextButton.style.display = "block";
        document.body.style.background = "Red";

    }
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
        document.body.style.backgroundImage = "url(background.jpg)";
    }
});

startQuiz();
