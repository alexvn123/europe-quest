// Configuración
const TIME_LIMIT = 15;
const MAX_LIVES = 3;
const POINTS_CORRECT = 10;

// ✅ NIVELES 1 A 10 con tus preguntas e imágenes
const levels = [
    {
        id: 1,
        question: "Where is Europe located?",
        image: "imagenes/europe-map.jpg",
        options: ["A) Southern Hemisphere", "B) Northern Hemisphere", "C) Africa", "D) Asia"],
        correct: 1
    },
    {
        id: 2,
        question: "What ocean borders Europe to the west?",
        image: "imagenes/atlantic-ocean.jpg",
        options: ["A) Atlantic Ocean", "B) Pacific Ocean", "C) Indian Ocean", "D) Southern Ocean"],
        correct: 0
    },
    {
        id: 3,
        question: "How many stars are on the European Union flag?",
        image: "imagenes/eu-flag.jpg",
        options: ["A) 10", "B) 12", "C) 15", "D) 20"],
        correct: 1
    },
    {
        id: 4,
        question: "Which language is common in Europe?",
        image: "imagenes/europe-countries.jpg",
        options: ["A) German", "B) Japanese", "C) Hindi", "D) Chinese"],
        correct: 0
    },
    {
        id: 5,
        question: "Which country is famous for pizza and pasta?",
        image: "imagenes/italy.jpg",
        options: ["A) France", "B) Germany", "C) Italy", "D) Spain"],
        correct: 2
    },
    {
        id: 6,
        question: "Which civilization influenced European philosophy and politics?",
        image: "imagenes/colosseum.jpg",
        options: ["A) Roman Empire", "B) Maya", "C) Inca", "D) Aztec"],
        correct: 0
    },
    {
        id: 7,
        question: "Where is the Eiffel Tower located?",
        image: "imagenes/eiffel-tower.jpg",
        options: ["A) Italy", "B) Spain", "C) France", "D) Germany"],
        correct: 2
    },
    {
        id: 8,
        question: "Which mountain range is in Europe?",
        image: "imagenes/alps.jpg",
        options: ["A) Andes", "B) Alps", "C) Rockies", "D) Himalayas"],
        correct: 1
    },
    {
        id: 9,
        question: "Europe has more than...",
        image: "imagenes/europe-countries.jpg",
        options: ["A) 10 countries", "B) 20 countries", "C) 40 countries", "D) 30 countries"],
        correct: 2
    },
    {
        id: 10,
        question: "What do the stars on the EU flag represent?",
        image: "imagenes/eu-flag.jpg",
        options: ["A) War", "B) Tourism", "C) Money", "D) Unity and Harmony"],
        correct: 3
    }
];

// Variables globales
let playerName = "";
let unlockedLevel = 1;
let currentLevel = null;
let currentScore = 0;
let currentLives = 0;
let timerInterval;

// --- ✅ Guardado de TODOS los participantes ---
function loadAllPlayers() {
    const saved = localStorage.getItem("europeQuestAllPlayers");
    return saved ? JSON.parse(saved) : [];
}

function savePlayerProgress(name, maxLevel, bestScore) {
    const players = loadAllPlayers();
    const existing = players.find(p => p.name.trim().toLowerCase() === name.trim().toLowerCase());

    if (existing) {
        if (maxLevel > existing.maxLevel) existing.maxLevel = maxLevel;
        if (bestScore > existing.bestScore) existing.bestScore = bestScore;
    } else {
        players.push({
            name: name.trim(),
            maxLevel: maxLevel,
            bestScore: bestScore
        });
    }

    // Ordenar por nivel y puntaje
    players.sort((a, b) => b.maxLevel - a.maxLevel || b.bestScore - a.bestScore);
    localStorage.setItem("europeQuestAllPlayers", JSON.stringify(players));
    unlockedLevel = maxLevel;
}

function renderAllScores() {
    const players = loadAllPlayers();
    const tbody = document.getElementById("allScoresBody");
    tbody.innerHTML = "";

    if (players.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4">No players registered yet</td></tr>`;
        return;
    }

    players.forEach((player, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${player.name}</td>
            <td>Level ${player.maxLevel}</td>
            <td>${player.bestScore}</td>
        `;
        tbody.appendChild(row);
    });
}

// --- Interfaz ---
function openLevelMap() {
    playerName = document.getElementById("playerName").value.trim();
    if (!playerName) {
        alert("⚠️ Please enter your name first!");
        return;
    }
    // Cargar progreso del jugador actual
    const players = loadAllPlayers();
    const me = players.find(p => p.name.toLowerCase() === playerName.toLowerCase());
    unlockedLevel = me ? me.maxLevel : 1;

    document.getElementById("mainStartScreen").classList.add("hidden");
    document.getElementById("levelMapScreen").classList.remove("hidden");
    updateLevelNodes();
}

function openScores() {
    document.getElementById("mainStartScreen").classList.add("hidden");
    document.getElementById("scoresScreen").classList.remove("hidden");
    renderAllScores();
}

function backToMain() {
    document.getElementById("levelMapScreen").classList.add("hidden");
    document.getElementById("gameScreen").classList.add("hidden");
    document.getElementById("endScreen").classList.add("hidden");
    document.getElementById("victoryScreen").classList.add("hidden");
    document.getElementById("scoresScreen").classList.add("hidden");
    document.getElementById("mainStartScreen").classList.remove("hidden");
}

function updateLevelNodes() {
    const nodes = document.querySelectorAll(".level-node");
    nodes.forEach(node => {
        const lvl = parseInt(node.dataset.level);
        node.classList.toggle("locked", lvl > unlockedLevel);
        node.onclick = lvl <= unlockedLevel ? () => startLevel(lvl) : null;
    });
    document.getElementById("unlockedDisplay").textContent = unlockedLevel;
}

function returnToMap() {
    clearInterval(timerInterval);
    document.getElementById("gameScreen").classList.add("hidden");
    document.getElementById("endScreen").classList.add("hidden");
    document.getElementById("victoryScreen").classList.add("hidden");
    document.getElementById("levelMapScreen").classList.remove("hidden");
}

// --- Lógica del juego ---
function startLevel(levelId) {
    currentLevel = levels.find(l => l.id === levelId);
    currentScore = 0;
    currentLives = MAX_LIVES;

    document.getElementById("levelMapScreen").classList.add("hidden");
    document.getElementById("gameScreen").classList.remove("hidden");

    document.getElementById("displayName").textContent = playerName;
    document.getElementById("currentLevel").textContent = currentLevel.id;
    document.getElementById("lives").textContent = currentLives;
    document.getElementById("score").textContent = currentScore;

    showQuestion();
}

function showQuestion() {
    clearInterval(timerInterval);
    const q = currentLevel;

    document.getElementById("questionText").textContent = q.question;
    document.getElementById("questionImage").innerHTML = `<img src="${q.image}" alt="Clue">`;

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
            wrongAnswer();
        }
    }, 1000);
}

function checkAnswer(selectedIndex) {
    clearInterval(timerInterval);
    const q = currentLevel;

    if (selectedIndex === q.correct) {
        alert("✅ Correct!");
        currentScore += POINTS_CORRECT;
        document.getElementById("score").textContent = currentScore;
        levelCompleted();
    } else {
        wrongAnswer();
    }
}

function wrongAnswer() {
    alert("❌ Wrong answer!");
    currentLives--;
    document.getElementById("lives").textContent = currentLives;
    if (currentLives <= 0) {
        gameOver();
    } else {
        levelFailed();
    }
}

function levelCompleted() {
    const newMaxLevel = currentLevel.id;
    savePlayerProgress(playerName, newMaxLevel, currentScore);

    // Victoria final al terminar nivel 10
    if (currentLevel.id === 10) {
        document.getElementById("gameScreen").classList.add("hidden");
        document.getElementById("finalVictoryScore").textContent = currentScore;
        document.getElementById("victoryScreen").classList.remove("hidden");
        return;
    }

    document.getElementById("gameScreen").classList.add("hidden");
    document.getElementById("endScreen").classList.remove("hidden");
    document.getElementById("resultTitle").textContent = `🎉 Level ${currentLevel.id} Completed!`;
    document.getElementById("resultText").innerHTML = `Great job! Score: <strong>${currentScore}</strong><br>Next level unlocked.`;
}

function levelFailed() {
    document.getElementById("gameScreen").classList.add("hidden");
    document.getElementById("endScreen").classList.remove("hidden");
    document.getElementById("resultTitle").textContent = `⚠️ Level ${currentLevel.id} Not Passed`;
    document.getElementById("resultText").innerHTML = `Answer correctly to advance.<br>Try again!`;
}

function gameOver() {
    document.getElementById("gameScreen").classList.add("hidden");
    document.getElementById("endScreen").classList.remove("hidden");
    document.getElementById("resultTitle").textContent = `💀 Game Over`;
    document.getElementById("resultText").innerHTML = `You lost all lives.<br>Final score: <strong>${currentScore}</strong>`;
}

// Cargar datos al inicio
window.onload = renderAllScores;
