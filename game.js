let playerName = "";
let points = 0;
let lives = 3;
let currentLevel = 1;
let timer = null;
const TIME_LIMIT = 10;

const questions = [
    {
        level: 1,
        text: "In which hemisphere is Europe located?",
        image: "imagenes/europe-countries.jpg",
        options: ["A) Southern", "B) Northern", "C) Eastern", "D) Western"],
        correct: "B) Northern"
    },
    {
        level: 2,
        text: "Which ocean lies to the west of Europe?",
        image: "imagenes/atlantic-ocean.jpg",
        options: ["A) Pacific", "B) Indian", "C) Atlantic", "D) Arctic"],
        correct: "C) Atlantic"
    },
    {
        level: 3,
        text: "How many stars are on the European Union flag?",
        image: "imagenes/eu-flag.jpg",
        options: ["A) 10", "B) 12", "C) 15", "D) 20"],
        correct: "B) 12"
    },
    {
        level: 4,
        text: "Which language is widely spoken in Europe?",
        image: "imagenes/european-union.jpg",
        options: ["A) German", "B) Japanese", "C) Hindi", "D) Chinese"],
        correct: "A) German"
    },
    {
        level: 5,
        text: "Which country is famous for pizza and pasta?",
        image: "imagenes/italy.jpg",
        options: ["A) France", "B) Germany", "C) Italy", "D) Spain"],
        correct: "C) Italy"
    },
    {
        level: 6,
        text: "Which civilization greatly influenced European culture?",
        image: "imagenes/colosseum.jpg",
        options: ["A) Roman", "B) Mayan", "C) Inca", "D) Aztec"],
        correct: "A) Roman"
    },
    {
        level: 7,
        text: "In which country is the Eiffel Tower located?",
        image: "imagenes/eiffel-tower.jpg",
        options: ["A) Italy", "B) Spain", "C) France", "D) Portugal"],
        correct: "C) France"
    },
    {
        level: 8,
        text: "Which mountain range is found in Europe?",
        image: "imagenes/alps.jpg",
        options: ["A) Andes", "B) Alps", "C) Rockies", "D) Himalayas"],
        correct: "B) Alps"
    },
    {
        level: 9,
        text: "What is the capital city of Germany?",
        image: "imagenes/berlin.jpg",
        options: ["A) Paris", "B) Rome", "C) Berlin", "D) Madrid"],
        correct: "C) Berlin"
    },
    {
        level: 10,
        text: "What do the stars on the EU flag represent?",
        image: "imagenes/eu-flag.jpg",
        options: ["A) War", "B) Tourism", "C) Wealth", "D) Unity"],
        correct: "D) Unity"
    }
];

// ✅ FUNCIÓN QUE MEZCLA LAS RESPUESTAS CADA VEZ QUE SE ABRE LA PREGUNTA
function mezclarAleatorio(arr) {
  let copia = [...arr];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Sistema de puntuaciones
function loadAllPlayers() {
    const saved = localStorage.getItem("europeQuestPlayers");
    return saved ? JSON.parse(saved) : [];
}

function savePlayerProgress(name, maxLevel, bestScore) {
    if (!name) return;
    const players = loadAllPlayers();
    const nameTrim = name.trim();
    const existing = players.find(p => p.name.toLowerCase() === nameTrim.toLowerCase());

    if (existing) {
        if (maxLevel > existing.maxLevel) existing.maxLevel = maxLevel;
        if (bestScore > existing.bestScore) existing.bestScore = bestScore;
    } else {
        players.push({ name: nameTrim, maxLevel: maxLevel, bestScore: bestScore });
    }

    players.sort((a, b) => b.maxLevel - a.maxLevel || b.bestScore - a.bestScore);
    localStorage.setItem("europeQuestPlayers", JSON.stringify(players));
}

function renderScores() {
    const players = loadAllPlayers();
    const tbody = document.getElementById("scoresBody");
    tbody.innerHTML = "";

    if (players.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4">No players have played yet</td></tr>`;
        return;
    }

    players.forEach((p, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${p.name}</td>
            <td>Level ${p.maxLevel}</td>
            <td>${p.bestScore} pts</td>
        `;
        tbody.appendChild(row);
    });
}

// Lógica del juego
function startGame() {
    playerName = document.getElementById('playerName').value.trim();
    if (!playerName) { alert("⚠️ Please enter your name first!"); return; }
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    document.getElementById('displayName').textContent = playerName;
    resetProgress();
}

function resetProgress() {
    points = 0; lives = 3; currentLevel = 1;
    updateInfo(); updateLevelsState();
}

function returnToStart() { clearInterval(timer);
    document.getElementById('game').style.display = 'none';
    document.getElementById('startScreen').style.display = 'flex';
}

function openScores() {
    renderScores();
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('scoresScreen').style.display = 'block';
}

function closeScores() {
    document.getElementById('scoresScreen').style.display = 'none';
    document.getElementById('startScreen').style.display = 'flex';
}

function updateInfo() {
    document.getElementById('points').textContent = points;
    document.getElementById('lives').textContent = lives;
    document.getElementById('timeLeft').textContent = TIME_LIMIT;
}

function updateLevelsState() {
    document.querySelectorAll('.level').forEach(level => {
        const num = parseInt(level.dataset.level);
        level.classList.toggle('unlocked', num <= currentLevel);
        level.classList.toggle('locked', num > currentLevel);
    });
}

function startTimer() {
    let timeLeft = TIME_LIMIT;
    document.getElementById('timeLeft').textContent = timeLeft;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--; document.getElementById('timeLeft').textContent = timeLeft;
        if (timeLeft <= 0) { clearInterval(timer); timeUp(); }
    }, 1000);
}

function timeUp() { alert("⏰ Time's up!"); checkAnswer(null,null,currentLevel); }

function showQuestion(question) {
    document.getElementById('questionText').textContent = question.text;
    document.getElementById('questionImage').src = question.image;
    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';

    // ✅ AQUÍ SE APLICA: CADA VEZ QUE ABRES LA PREGUNTA, LAS OPCIONES SE MEZCLAN
    const opcionesEnOrdenNuevo = mezclarAleatorio(question.options);

    opcionesEnOrdenNuevo.forEach(option => {
        const div = document.createElement('div');
        div.className = 'option';
        div.textContent = option;
        div.onclick = () => checkAnswer(option, question.correct, question.level);
        container.appendChild(div);
    });
    document.getElementById('questionModal').style.display = 'block';
    startTimer();
}

function checkAnswer(selected, correctAnswer, levelNumber) {
    clearInterval(timer);
    const soundCorrect = document.getElementById('correctSound');
    const soundWrong = document.getElementById('wrongSound');

    if (selected === correctAnswer) {
        points += 10; soundCorrect.play().catch(()=>{});
        alert("✅ Correct!");
        if (levelNumber === currentLevel && currentLevel < 10) currentLevel++;
        if (levelNumber === 10) {
            savePlayerProgress(playerName,10,points);
            document.getElementById('finalScore').textContent = points;
            document.getElementById('questionModal').style.display='none';
            document.getElementById('victoryScreen').style.display='block';
            return;
        }
    } else {
        lives -= 1; soundWrong.play().catch(()=>{});
        alert("❌ Wrong or time's up!");
        if (lives <= 0) {
            savePlayerProgress(playerName, currentLevel-1, points);
            alert(`💀 Game Over! Final score: ${points}`);
            returnToStart(); return;
        }
    }
    updateInfo(); updateLevelsState(); closeQuestion();
}

function closeQuestion() { clearInterval(timer);
    document.getElementById('questionModal').style.display = 'none';
}

window.addEventListener('load', () => {
    document.querySelectorAll('.level').forEach(level => {
        level.addEventListener('click', () => {
            const num = parseInt(level.dataset.level);
            if (num === currentLevel) {
                const q = questions.find(x => x.level === num);
                if (q) showQuestion(q);
            } else if (num > currentLevel) {
                alert(`🔒 Level ${num} locked — finish ${currentLevel} first`);
            }
        });
    });
});
