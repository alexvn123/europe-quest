let playerName = "";
let points = 0;
let lives = 3;
let currentLevel = 1;
let timer = null;
const TIME_LIMIT = 15;

const questions = [
    { level: 1, text: "In which hemisphere is Europe located?", image: "imagenes/europe.jpg", options: ["A) Southern", "B) Northern", "C) Eastern", "D) Western"], correct: "B) Northern" },
    { level: 2, text: "Which ocean is west of Europe?", image: "imagenes/atlantic.jpg", options: ["A) Pacific", "B) Indian", "C) Atlantic", "D) Arctic"], correct: "C) Atlantic" },
    { level: 3, text: "How many stars on EU flag?", image: "imagenes/eu.jpg", options: ["A) 10", "B) 12", "C) 15", "D) 20"], correct: "B) 12" },
    { level: 4, text: "Most spoken language in Europe?", image: "imagenes/europe.jpg", options: ["A) German", "B) Japanese", "C) Hindi", "D) Chinese"], correct: "A) German" },
    { level: 5, text: "Pizza and pasta come from?", image: "imagenes/italy.jpg", options: ["A) France", "B) Germany", "C) Italy", "D) Spain"], correct: "C) Italy" },
    { level: 6, text: "Greatest ancient civilization?", image: "imagenes/rome.jpg", options: ["A) Roman", "B) Mayan", "C) Inca", "D) Aztec"], correct: "A) Roman" },
    { level: 7, text: "Eiffel Tower is in?", image: "imagenes/france.jpg", options: ["A) Italy", "B) Spain", "C) France", "D) Portugal"], correct: "C) France" },
    { level: 8, text: "Alps mountains are in?", image: "imagenes/alps.jpg", options: ["A) Andes", "B) Europe", "C) Asia", "D) Africa"], correct: "B) Europe" },
    { level: 9, text: "Capital of Germany?", image: "imagenes/berlin.jpg", options: ["A) Paris", "B) Rome", "C) Berlin", "D) Madrid"], correct: "C) Berlin" },
    { level: 10, text: "EU stars represent?", image: "imagenes/eu.jpg", options: ["A) War", "B) Tourism", "C) Wealth", "D) Unity"], correct: "D) Unity" }
];

// Mezclar respuestas
function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

// Cargar puntuaciones
function loadScores() {
    try {
        const data = localStorage.getItem("europeQuestScores");
        return data ? JSON.parse(data) : [];
    } catch (err) {
        console.error("Error loading scores:", err);
        return [];
    }
}

// Guardar puntuación
function saveScore(name, maxLevel, totalPoints) {
    if (!name.trim()) return;
    const scores = loadScores();
    const existing = scores.find(p => p.name.toLowerCase() === name.toLowerCase());

    if (existing) {
        if (maxLevel > existing.maxLevel) existing.maxLevel = maxLevel;
        if (totalPoints > existing.points) existing.points = totalPoints;
    } else {
        scores.push({ name: name.trim(), maxLevel, points: totalPoints });
    }

    scores.sort((a, b) => b.maxLevel - a.maxLevel || b.points - a.points);
    localStorage.setItem("europeQuestScores", JSON.stringify(scores));
}

// Mostrar tabla con medallas
function renderScores() {
    const scores = loadScores();
    const tbody = document.getElementById("scoresBody");
    tbody.innerHTML = "";

    if (scores.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4">No scores yet. Play a game!</td></tr>`;
        return;
    }

    scores.forEach((player, index) => {
        let positionText;
        if (index === 0) positionText = "🥇 1";
        else if (index === 1) positionText = "🥈 2";
        else if (index === 2) positionText = "🥉 3";
        else positionText = index + 1;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${positionText}</td>
            <td>${player.name}</td>
            <td>Level ${player.maxLevel}</td>
            <td>${player.points} pts</td>
        `;
        tbody.appendChild(row);
    });
}

function startGame() {
    playerName = document.getElementById("playerName").value.trim();
    if (!playerName) return alert("Enter your name first!");
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("game").style.display = "block";
    resetGame();
}

function resetGame() {
    points = 0;
    lives = 3;
    currentLevel = 1;
    updateHUD();
    updateLevels();
}

function updateHUD() {
    document.getElementById("displayName").textContent = playerName;
    document.getElementById("points").textContent = points;
    document.getElementById("lives").textContent = lives;
}

function updateLevels() {
    document.querySelectorAll(".level").forEach((el, i) => {
        el.classList.toggle("unlocked", i + 1 <= currentLevel);
    });
}

function openScores() {
    renderScores();
    document.getElementById("scoresModal").style.display = "block";
}

function closeScores() {
    document.getElementById("scoresModal").style.display = "none";
}

function returnToMenu() {
    document.getElementById("game").style.display = "none";
    document.getElementById("startScreen").style.display = "flex";
}

function showQuestion(lvl) {
    const q = questions.find(q => q.level === lvl);
    if (!q) return;

    document.getElementById("questionText").textContent = q.text;
    document.getElementById("questionImage").src = q.image;
    const container = document.getElementById("optionsContainer");
    container.innerHTML = "";

    const shuffled = shuffleArray(q.options);
    shuffled.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(opt, q.correct, lvl);
        container.appendChild(btn);
    });

    document.getElementById("questionModal").style.display = "block";
    startTimer();
}

function checkAnswer(selected, correct, lvl) {
    clearInterval(timer);
    if (selected === correct) {
        points += 10;
        alert("✅ Correct!");
        if (lvl === currentLevel) currentLevel++;
        if (lvl === 10) {
            saveScore(playerName, 10, points);
            document.getElementById("finalScore").textContent = points;
            document.getElementById("questionModal").style.display = "none";
            document.getElementById("victoryModal").style.display = "block";
            return;
        }
    } else {
        lives--;
        alert("❌ Wrong!");
        if (lives <= 0) {
            saveScore(playerName, currentLevel - 1, points);
            alert(`Game Over! Score: ${points}`);
            returnToMenu();
            return;
        }
    }
    updateHUD();
    updateLevels();
    document.getElementById("questionModal").style.display = "none";
}

function startTimer() {
    let time = TIME_LIMIT;
    document.getElementById("timeLeft").textContent = time;
    clearInterval(timer);
    timer = setInterval(() => {
        time--;
        document.getElementById("timeLeft").textContent = time;
        if (time <= 0) {
            clearInterval(timer);
            checkAnswer(null, null, currentLevel);
        }
    }, 1000);
}

function closeQuestion() {
    clearInterval(timer);
    document.getElementById("questionModal").style.display = "none";
}

// Activar clic en niveles
window.addEventListener("load", () => {
    document.querySelectorAll(".level").forEach(level => {
        level.addEventListener("click", () => {
            const lvl = parseInt(level.dataset.level);
            if (lvl === currentLevel) showQuestion(lvl);
            else if (lvl > currentLevel) alert(`🔒 Complete level ${currentLevel} first!`);
        });
    });
});
