const array = [
    {
        question: "What is the best programming language?",
        a: "Python",
        b: "C++",
        c: "JS",
        d: "YoptaScript",
        correct: "c",
    },
    {
        question: "What animal did Australian soldiers fight in 1932?",
        a: "Emus",
        b: "Parrots",
        c: "Pinguins",
        d: "Sparrows",
        correct: "a",
    }
]

const questionLabel = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submit = document.getElementById("submit");
const answerEls = document.querySelectorAll(".answer");
const quiz = document.getElementById("quiz")
let currentQuestion = 0;
let score = 0;

initQuiz();

function initQuiz() {
    unmarkRaduoButton();
    const currentQuiz = array[currentQuestion];
    questionLabel.innerText = currentQuiz.question;
    a_text.innerText = currentQuiz.a;
    b_text.innerText = currentQuiz.b;
    c_text.innerText = currentQuiz.c;
    d_text.innerText = currentQuiz.d;    
}

function getSelected() {
    let answer = undefined;

    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}



submit.addEventListener("click", () => {



    const answer = getSelected();

    if (answer) {
        if (answer === array[currentQuestion].correct) {
            score++;
        }

        currentQuestion++;
        if (currentQuestion < array.length) {
            initQuiz();
        } else {
            quiz.innerHTML = 
            `<h2>You answered correctly at ${score}/${array.length} questions.</h2>                
             <button onclick="location.reload()">Reload</button>`;
        }
    } else {
        alert("You have to choose befere submitting :(")
    }
});


function unmarkRaduoButton() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}



