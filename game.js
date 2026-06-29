// Configuración del juego
const TIME_LIMIT = 15;
const MAX_LIVES = 3;
const POINTS_CORRECT = 10;

// Preguntas con tus imágenes
const questions = [
    {
        question: "What is the capital of France?",
        image: "imagenes/eiffel-tower.jpg",
        options: ["London", "Paris", "Berlin", "Madrid"],
        correct: 1
    },
    {
        question: "In which city can you visit the Colosseum?",
        image: "imagenes/colosseum.jpg",
        options: ["Rome", "Athens", "Lisbon", "Vienna"],
        correct: 0
    },
    {
        question: "What is the capital of Germany?",
        image: "imagenes/berlin.jpg",
        options: ["Madrid", "Paris", "Berlin", "Amsterdam"],
        correct: 2
    },
    {
        question: "Which mountain range runs across Central Europe?",
        image: "imagenes/alps.jpg",
        options: ["Andes", "Alps", "Himalayas", "Rockies"],
        correct: 1
    },
    {
        question: "Which ocean borders Western Europe?",
        image: "imagenes/atlantic-ocean.jpg",
        options: ["Pacific", "Indian", "Atlantic", "Arctic"],
        correct: 2
    },
    {
        question: "Which country is shaped like a boot?",
        image: "imagenes/italy.jpg",
        options: ["Spain", "Italy", "Greece", "Portugal"],
        correct: 1
    },
    {
        question: "Which is the official currency of the European Union?",
        image: "imagenes/eu-flag.jpg",
        options: ["Dollar", "Pound", "Euro", "Franc"],
        correct: 2
    }
];

// Variables de estado
let playerName = "";
let currentScore = 0;
let currentLives = 0;
let currentQuestionIndex = 0;
let timerInterval;

// --- Funciones de puntajes ---
function loadScores() {
    const saved = localStorage.getItem("europeQuestScores");
    return saved ? JSON.parse(saved) : [];
}

function saveScore(name, score) {
    const scores = loadScores();
    scores.push({ name, score });
    scores.sort((a, b) => b.score - a.score);
    localStorage.setItem("europeQuestScores", JSON.stringify(scores));
    renderScores();
}

function renderScores() {
    const scores = loadScores();
    const tbody = document.getElementById("scoresBody");
    tbody.innerHTML = "";
    if (scores.length === 0) {
        tbody.innerHTML = `<tr><td colspan="2">No scores yet</td></tr>`;
        return;
    }
    scores.forEach(entry => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${entry.name}</td><td>${entry.score}</td>`;
        tbody.appendChild(row);
    });
}

// --- Lógica del juego ---
function startGame() {
    playerName = document.getElementById("playerName").value.trim();
    if (!playerName) {
        alert("Please enter your name!");
        return;
    }
    currentScore = 0;
    currentLives = MAX_LIVES;
    currentQuestionIndex = 0;

    document.getElementById("startScreen").classList.add("hidden");
    document.getElementById("endScreen").classList.add("hidden");
    document.getElementById("gameScreen").classList.remove("hidden");

    document.getElementById("displayName").textContent = playerName;
    document.getElementById("lives").textContent = currentLives;
    document.getElementById("score").textContent = currentScore;

    showQuestion();
}

function showQuestion() {
    clearInterval(timerInterval);
    if (currentQuestionIndex >= questions.length) {
        endGame();
        return;
    }
    const q = questions[currentQuestionIndex];
    document.getElementById("questionText").textContent = q.question;

    // Mostrar imagen de la pregunta
    const imgBox = document.getElementById("questionImage");
    imgBox.innerHTML = `<img src="${q.image}" alt="Clue">`;

    const optionsDiv = document.getElementById("optionsContainer");
    optionsDiv.innerHTML = "";
    q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(i);
        optionsDiv.appendChild(btn);
    });

    startTimer();
}

function startTimer() {
    let timeLeft = TIME_LIMIT;
    document.getElementById("timer").textContent = timeLeft;
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! ❌");
            loseLife();
        }
    }, 1000);
}

function checkAnswer(selectedIndex) {
    clearInterval(timerInterval);
    const q = questions[currentQuestionIndex];
    if (selectedIndex === q.correct) {
        alert("Correct! ✅");
        currentScore += POINTS_CORRECT;
        document.getElementById("score").textContent = currentScore;
    } else {
        alert("Wrong answer! ❌");
        loseLife();
    }
    currentQuestionIndex++;
    setTimeout(showQuestion, 800);
}

function loseLife() {
    currentLives--;
    document.getElementById("lives").textContent = currentLives;
    if (currentLives <= 0) {
        setTimeout(endGame, 800);
    }
}

function endGame() {
    clearInterval(timerInterval);
    document.getElementById("gameScreen").classList.add("hidden");
    document.getElementById("endScreen").classList.remove("hidden");
    document.getElementById("finalScore").textContent = currentScore;
    saveScore(playerName, currentScore);
}

function restartGame() {
    document.getElementById("endScreen").classList.add("hidden");
    document.getElementById("startScreen").classList.remove("hidden");
}

// Cargar puntajes al inicio
window.onload = renderScores;
