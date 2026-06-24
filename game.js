let points = 0;
let lives = 3;
let currentLevel = 1;

// 📋 QUESTIONS IN ENGLISH + YOUR IMAGES
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

// Start game
function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    resetProgress();
}

// Reset all progress
function resetProgress() {
    points = 0;
    lives = 3;
    currentLevel = 1;
    updateInfo();
    updateLevelsState();
}

// Return to start screen
function returnToStart() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('startScreen').style.display = 'flex';
}

// Update scores and lives
function updateInfo() {
    document.getElementById('points').textContent = points;
    document.getElementById('lives').textContent = lives;
}

// Unlock levels in order
function updateLevelsState() {
    document.querySelectorAll('.level').forEach(level => {
        const num = parseInt(level.dataset.level);
        if (num <= currentLevel) {
            level.classList.remove('locked');
            level.classList.add('unlocked');
        } else {
            level.classList.remove('unlocked');
            level.classList.add('locked');
        }
    });
}

// Show question with its image
function showQuestion(question) {
    document.getElementById('questionText').textContent = question.text;
    document.getElementById('questionImage').src = question.image;
    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';

    question.options.forEach(option => {
        const div = document.createElement('div');
        div.className = 'option';
        div.textContent = option;
        div.onclick = () => checkAnswer(option, question.correct, question.level);
        container.appendChild(div);
    });

    document.getElementById('questionModal').style.display = 'block';
}

// Check answer → NO CORRECT ANSWER SHOWN
function checkAnswer(selected, correctAnswer, levelNumber) {
    const soundCorrect = document.getElementById('correctSound');
    const soundWrong = document.getElementById('wrongSound');

    if (selected === correctAnswer) {
        points += 10;
        soundCorrect.play().catch(() => {});
        alert("✅ Correct!");

        if (levelNumber === currentLevel && currentLevel < 10) {
            currentLevel++;
            updateLevelsState();
        }

        if (levelNumber === 10) {
            alert(`🎉 Congratulations! You completed all levels. Final score: ${points} points`);
            returnToStart();
        }

    } else {
        lives -= 1;
        soundWrong.play().catch(() => {});
        alert("❌ Wrong answer! Try again.");

        if (lives <= 0) {
            alert(`💀 Game Over! Final score: ${points} points`);
            returnToStart();
        }
    }

    updateInfo();
    closeQuestion();
}

function closeQuestion() {
    document.getElementById('questionModal').style.display = 'none';
}

// Activate level buttons
window.addEventListener('load', () => {
    document.querySelectorAll('.level').forEach(level => {
        level.addEventListener('click', () => {
            const num = parseInt(level.dataset.level);
            if (num === currentLevel) {
                const question = questions.find(q => q.level === num);
                if (question) showQuestion(question);
            } else if (num > currentLevel) {
                alert(`🔒 Level ${num} is locked! Complete level ${currentLevel} first.`);
            }
        });
    });
});
