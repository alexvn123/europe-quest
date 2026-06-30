// ---------------- CONFIGURACIÓN AUTOMÁTICA GITHUB GIST ----------------
const GIST_ID = "9e578094f485cb35ff0b76f37c5cb5b6";
const GIST_FILENAME = "europe-quest-ranking.json";
const GITHUB_TOKEN = "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";
// -----------------------------------------------------------------------

let playerName = "";
let points = 0;
let lives = 3;
let currentLevel = 1;
let timer = null;
const TIME_LIMIT = 15;

const questions = [
    { level: 1, text: "In which hemisphere is Europe located?", image: "imagenes/europe.jpg", options: ["A) Southern", "B) Northern", "C) Eastern", "D) Western"], correct: "B) Northern" },
    { level: 2, text: "Which ocean is west of Europe?", image: "imagenes/atlantic.jpg", options: ["A) Pacific", "B) Indian", "C) Atlantic", "D) Arctic"], correct: "C) Atlantic" },
    { level: 3, text: "How many stars on EU flag?", image: "imagenes/eu.jpg", options: ["A) 10", "B) 12", "C) 15", "D) 20"], correct: "B) Northern" },
    { level: 4, text: "Most spoken language in Europe?", image: "imagenes/europe.jpg", options: ["A) German", "B) Japanese", "C) Hindi", "D) Chinese"], correct: "A) German" },
    { level: 5, text: "Pizza and pasta come from?", image: "imagenes/italy.jpg", options: ["A) France", "B) Germany", "C) Italy", "D) Spain"], correct: "C) Italy" },
    { level: 6, text: "Greatest ancient civilization?", image: "imagenes/rome.jpg", options: ["A) Roman", "B) Mayan", "C) Inca", "D) Aztec"], correct: "A) Roman" },
    { level: 7, text: "Eiffel Tower is in?", image: "imagenes/france.jpg", options: ["A) Italy", "B) Spain", "C) France", "D) Portugal"], correct: "C) France" },
    { level: 8, text: "Alps mountains are in?", image: "imagenes/alps.jpg", options: ["A) Andes", "B) Europe", "C) Asia", "D) Africa"], correct: "B) Europe" },
    { level: 9, text: "Capital of Germany?", image: "imagenes/berlin.jpg", options: ["A) Paris", "B) Rome", "C) Berlin", "D) Madrid"], correct: "C) Berlin" },
    { level: 10, text: "EU stars represent?", image: "imagenes/eu.jpg", options: ["A) War", "B) Tourism", "C) Wealth", "D) Unity"], correct: "D) Unity" }
];

function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

// ---------------- FUNCIONES 100% AUTOMÁTICAS ----------------
async function loadScores() {
    try {
        const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
            headers: { "Authorization": `token ${GITHUB_TOKEN}` }
        });
        if (!res.ok) throw new Error("Error al cargar");
        const data = await res.json();
        return JSON.parse(data.files[GIST_FILENAME].content) || [];
    } catch (err) {
        console.warn("Cargando desde almacenamiento local:", err);
        return JSON.parse(localStorage.getItem("europeQuestScores") || "[]");
    }
}

async function saveScore(name, maxLevel, totalPoints) {
    if (!name.trim()) return;

    try {
        // Cargar puntuaciones actuales
        let scores = await loadScores();

        // Actualizar o agregar jugador
        const existing = scores.find(p => p.name.toLowerCase() === name.toLowerCase());
        if (existing) {
            existing.maxLevel = Math.max(existing.maxLevel, maxLevel);
            existing.points = Math.max(existing.points, totalPoints);
        } else {
            scores.push({ name: name.trim(), maxLevel, points: totalPoints });
        }

        // Ordenar: primero por nivel, luego por puntos
        scores.sort((a, b) => b.maxLevel - a.maxLevel || b.points - a.points);

        // Guardar en GIST automáticamente
        await fetch(`https://api.github.com/gists/${GIST_ID}`, {
            method: "PATCH",
            headers: {
                "Authorization": `token ${GITHUB_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                files: {
                    [GIST_FILENAME]: {
                        content: JSON.stringify(scores, null, 2)
                    }
                }
            })
        });

        // Guardar copia local por si falla internet
        localStorage.setItem("europeQuestScores", JSON.stringify(scores));
        console.log("✅ Puntuación guardada automáticamente en la nube");

    } catch (err) {
        console.error("❌ Error al guardar en nube, guardado en local:", err);
        // Respaldo local
        const scores = JSON.parse(localStorage.getItem("europeQuestScores") || "[]");
        const existing = scores.find(p => p.name.toLowerCase() === name.toLowerCase());
        if (existing) {
            existing.maxLevel = Math.max(existing.maxLevel, maxLevel);
            existing.points = Math.max(existing.points, totalPoints);
        } else scores.push({ name: name.trim(), maxLevel, points: totalPoints });
        scores.sort((a, b) => b.maxLevel - a.maxLevel || b.points - a.points);
        localStorage.setItem("europeQuestScores", JSON.stringify(scores));
    }
}

async function renderScores() {
    const tbody = document.getElementById("scoresBody");
    tbody.innerHTML = `<tr><td colspan="4">Cargando ranking...</td></tr>`;

    const scores = await loadScores();
    tbody.innerHTML = "";

    if (scores.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4">No hay puntuaciones todavía. ¡Juega una partida!</td></tr>`;
        return;
    }

    scores.forEach((player, index) => {
        const pos = index + 1;
        const medal = pos === 1 ? "🥇" : pos === 2 ? "🥈" : pos === 3 ? "🥉" : "";
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${medal} ${pos}</td>
            <td>${player.name}</td>
            <td>Level ${player.maxLevel}</td>
            <td>${player.points} pts</td>
        `;
        tbody.appendChild(row);
    });
}

// ---------------- RESTO DEL JUEGO ----------------
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
    document.getElementById("scoresModal").style.display = "block";
    renderScores();
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

window.addEventListener("load", () => {
    document.querySelectorAll(".level").forEach(level => {
        level.addEventListener("click", () => {
            const lvl = parseInt(level.dataset.level);
            if (lvl === currentLevel) showQuestion(lvl);
            else if (lvl > currentLevel) alert(`🔒 Complete level ${currentLevel} first!`);
        });
    });
});
