// ---------------- CONFIGURACIÓN ----------------
const GIST_ID = "9e578094f485cb35ff0b76f37c5cb5b6";
const GIST_FILENAME = "europe-quest-ranking.json";
const GITHUB_TOKEN = "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";

let playerName = "";
let points = 0;
let lives = 3;
let currentLevel = 1;
let timer = null;
const TIME_LIMIT = 15;

// ✅ RUTAS DE IMÁGENES AJUSTADAS A TUS ARCHIVOS
const questions = [
    { level: 1, text: "In which hemisphere is Europe located?", image: "imagenes/europe-map.jpg", options: ["A) Southern", "B) Northern", "C) Eastern", "D) Western"], correct: "B) Northern" },
    { level: 2, text: "Which ocean is west of Europe?", image: "imagenes/atlantic-ocean.jpg", options: ["A) Pacific", "B) Indian", "C) Atlantic", "D) Arctic"], correct: "C) Atlantic" },
    { level: 3, text: "How many stars on EU flag?", image: "imagenes/eu-flag.jpg", options: ["A) 10", "B) 12", "C) 15", "D) 20"], correct: "B) 12" },
    { level: 4, text: "Most spoken language in Europe?", image: "imagenes/europe-map.jpg", options: ["A) German", "B) Japanese", "C) Hindi", "D) Chinese"], correct: "A) German" },
    { level: 5, text: "Pizza and pasta come from?", image: "imagenes/italy.jpg", options: ["A) France", "B) Germany", "C) Italy", "D) Spain"], correct: "C) Italy" },
    { level: 6, text: "Greatest ancient civilization?", image: "imagenes/colosseum.jpg", options: ["A) Roman", "B) Mayan", "C) Inca", "D) Aztec"], correct: "A) Roman" },
    { level: 7, text: "Eiffel Tower is in?", image: "imagenes/eiffel-tower.jpg", options: ["A) Italy", "B) Spain", "C) France", "D) Portugal"], correct: "C) France" },
    { level: 8, text: "Alps mountains are in?", image: "imagenes/alps.jpg", options: ["A) Andes", "B) Europe", "C) Asia", "D) Africa"], correct: "B) Europe" },
    { level: 9, text: "Capital of Germany?", image: "imagenes/berlin.jpg", options: ["A) Paris", "B) Rome", "C) Berlin", "D) Madrid"], correct: "C) Berlin" },
    { level: 10, text: "EU stars represent?", image: "imagenes/eu-flag.jpg", options: ["A) War", "B) Tourism", "C) Wealth", "D) Unity"], correct: "D) Unity" }
];

function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

async function loadScores() {
    try {
        const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
            headers: {
                "Authorization": `token ${GITHUB_TOKEN}`,
                "Accept": "application/vnd.github.v3+json"
            }
        });
        if (!res.ok) throw new Error("Error al cargar");
        const data = await res.json();
        return JSON.parse(data.files[GIST_FILENAME].content) || [];
    } catch (err) {
        console.warn("Usando datos locales:", err);
        return JSON.parse(localStorage.getItem("europeQuestScores") || "[]");
    }
}

async function saveScore(name, maxLevel, totalPoints) {
    if (!name.trim()) return;
    try {
        let scores = await loadScores();
        const existing = scores.find(p => p.name.toLowerCase() === name.toLowerCase());
        if (existing) {
            existing.maxLevel = Math.max(existing.maxLevel, maxLevel);
            existing.points = Math.max(existing.points, totalPoints);
        } else {
            scores.push({ name: name.trim(), maxLevel, points: totalPoints });
        }
        scores.sort((a, b) => b.maxLevel - a.maxLevel || b.points - a.points);
        await fetch(`https://api.github.com/gists/${GIST_ID}`, {
            method: "PATCH",
            headers: {
                "Authorization": `token ${GITHUB_TOKEN}`,
                "Accept": "application/vnd.github.v3+json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                files: { [GIST_FILENAME]: { content: JSON.stringify(scores, null, 2) } }
            })
        });
        localStorage.setItem("europeQuestScores", JSON.stringify(scores));
    } catch (err) {
        console.error("Guardado en local:", err);
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
    tbody.innerHTML = `<tr><td colspan="4">Cargando...</td></tr>`;
    try {
        const scores = await loadScores();
        tbody.innerHTML = "";
        if (scores.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4">No hay puntuaciones todavía</td></tr>`;
            return;
        }
        scores.forEach((player, i) => {
            const pos = i + 1;
            const medal = pos === 1 ? "🥇" : pos === 2 ? "🥈" : pos === 3 ? "🥉" : "";
            const row = document.createElement("tr");
            row.innerHTML = `<td>${medal} ${pos}</td><td>${player.name}</td><td>Nivel ${player.maxLevel}</td><td>${player.points} pts</td>`;
            tbody.appendChild(row);
        });
    } catch (err) {
        tbody.innerHTML = `<tr><td colspan="4">Error al cargar</td></tr>`;
    }
}

function startGame() {
    const name = document.getElementById("playerName").value.trim();
    if (!name) return alert("Escribe tu nombre");
    playerName = name;
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
    document.querySelectorAll(".level").forEach((el, i) => el.classList.toggle("unlocked", i + 1 <= currentLevel));
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
    const q = questions.find(x => x.level === lvl);
    if (!q) return;
    document.getElementById("questionText").textContent = q.text;
    const img = document.getElementById("questionImage");
    img.src = q.image;
    img.onerror = () => img.alt = "Imagen no disponible";
    const cont = document.getElementById("optionsContainer");
    cont.innerHTML = "";
    shuffleArray(q.options).forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(opt, q.correct, lvl);
        cont.appendChild(btn);
    });
    document.getElementById("questionModal").style.display = "block";
    startTimer();
}

function checkAnswer(selected, correct, lvl) {
    clearInterval(timer);
    if (selected === correct) {
        points += 10;
        alert("✅ Correcto!");
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
        alert("❌ Incorrecto!");
        if (lives <= 0) {
            saveScore(playerName, currentLevel - 1, points);
            alert(`Fin del juego. Puntuación: ${points}`);
            returnToMenu();
            return;
        }
    }
    updateHUD();
    updateLevels();
    document.getElementById("questionModal").style.display = "none";
}

function startTimer() {
    let t = TIME_LIMIT;
    document.getElementById("timeLeft").textContent = t;
    clearInterval(timer);
    timer = setInterval(() => {
        t--;
        document.getElementById("timeLeft").textContent = t;
        if (t <= 0) {
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
    document.querySelectorAll(".level").forEach(el => {
        el.addEventListener("click", () => {
            const lvl = parseInt(el.dataset.level);
            if (lvl === currentLevel) showQuestion(lvl);
            else if (lvl > currentLevel) alert(`Completa el nivel ${currentLevel} primero`);
        });
    });
});
