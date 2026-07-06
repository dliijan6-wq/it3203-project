// quiz.js
// handles scoring, feedback display, and reset for the PWA self assessment quiz
// derek lawson - it 3203

// answer key for all 5 questions
// q1 is a fill in the blank so its answer is a list of accepted strings
// q5 is multi select so its answer is an array of correct values
const answerKey = {
    q1: ["service worker", "service-worker", "serviceworker"],
    q2: "2015",
    q3: "manifest",
    q4: "cacheonly",
    q5: ["https", "thread", "lifecycle"]
};

const totalQuestions = 5;

const quizForm = document.getElementById("quiz-form");
const resultsSummary = document.getElementById("results-summary");
const resultsHeading = document.getElementById("results-heading");
const resultsScore = document.getElementById("results-score");
const resetBtn = document.getElementById("reset-btn");

// grabs the value typed into the fill in the blank box and checks it against
// the accepted answer list, ignoring case and extra spaces
function gradeFillBlank() {
    const input = document.getElementById("q1-input").value.trim().toLowerCase();
    return answerKey.q1.includes(input);
}

// checks a single choice question by reading the checked radio button
function gradeSingleChoice(name) {
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    if (!selected) return false;
    return selected.value === answerKey[name];
}

// checks the multi select question by comparing the set of checked boxes
// against the full correct set, order does not matter
function gradeMultiSelect(name) {
    const checked = document.querySelectorAll(`input[name="${name}"]:checked`);
    const checkedValues = Array.from(checked).map(box => box.value).sort();
    const correctValues = [...answerKey[name]].sort();
    return JSON.stringify(checkedValues) === JSON.stringify(correctValues);
}

// applies a colored pass or fail message under a question
function showFeedback(qId, isCorrect, correctText) {
    const feedbackEl = document.getElementById(`${qId}-feedback`);
    feedbackEl.textContent = isCorrect
        ? "correct"
        : `incorrect - correct answer: ${correctText}`;
    feedbackEl.className = isCorrect
        ? "q-feedback feedback-correct"
        : "q-feedback feedback-incorrect";
}

// handles the submit event for the whole quiz
quizForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let score = 0;

    // question 1
    const q1Correct = gradeFillBlank();
    if (q1Correct) score++;
    showFeedback("q1", q1Correct, "service worker");

    // question 2
    const q2Correct = gradeSingleChoice("q2");
    if (q2Correct) score++;
    showFeedback("q2", q2Correct, "2015");

    // question 3
    const q3Correct = gradeSingleChoice("q3");
    if (q3Correct) score++;
    showFeedback("q3", q3Correct, "web app manifest");

    // question 4
    const q4Correct = gradeSingleChoice("q4");
    if (q4Correct) score++;
    showFeedback("q4", q4Correct, "cache only");

    // question 5
    const q5Correct = gradeMultiSelect("q5");
    if (q5Correct) score++;
    showFeedback("q5", q5Correct, "must be served over https, runs on a separate thread, has its own lifecycle");

    // pass if 60% or higher, 3 out of 5
    const passed = score >= 3;

    resultsHeading.textContent = passed ? "Result: Pass" : "Result: Fail";
    resultsHeading.className = passed ? "pass-heading" : "fail-heading";
    resultsScore.textContent = `You scored ${score} out of ${totalQuestions}.`;

    resultsSummary.classList.remove("hidden");
    resultsSummary.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

// resets the whole quiz, clears inputs, clears feedback, hides the summary
resetBtn.addEventListener("click", function () {
    quizForm.reset();

    // clear every feedback line
    document.querySelectorAll(".q-feedback").forEach(el => {
        el.textContent = "";
        el.className = "q-feedback";
    });

    resultsSummary.classList.add("hidden");
    resultsHeading.className = "";
});
