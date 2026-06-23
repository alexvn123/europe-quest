// =========================
// EUROPE QUEST GAME
// =========================

let currentLevel = 1;
let lives = 3;
let xp = 0;
let timer = 15;
let interval;

// =========================
// QUESTIONS
// =========================

const questions = [

{
background:"images/europe-map.jpg",
question:"Where is Europe located?",
answers:[
"Northern Hemisphere",
"Southern Hemisphere",
"Africa",
"Asia"
],
correct:0
},

{
background:"images/atlantic-ocean.jpg",
question:"What ocean borders Europe to the west?",
answers:[
"Atlantic Ocean",
"Pacific Ocean",
"Indian Ocean",
"Arctic Ocean"
],
correct:0
},

{
background:"images/eu-flag.jpg",
question:"How many stars are on the European Union flag?",
answers:[
"10",
"12",
"15",
"20"
],
correct:1
},

{
background:"images/berlin.jpg",
question:"Which language is common in Europe?",
answers:[
"German",
"Japanese",
"Hindi",
"Chinese"
],
correct:0
},

{
background:"images/italy.jpg",
question:"Which country is famous for pizza and pasta?",
answers:[
"France",
"Germany",
"Italy",
"Spain"
],
correct:2
},

{
background:"images/colosseum.jpg",
question:"Which civilization influenced European philosophy and politics?",
answers:[
"Roman Empire",
"Maya",
"Inca",
"Aztec"
],
correct:0
},

{
background:"images/eiffel-tower.jpg",
question:"Where is the Eiffel Tower located?",
answers:[
"Italy",
"Spain",
"France",
"Germany"
],
correct:2
},

{
background:"images/alps.jpg",
question:"Which mountain range is in Europe?",
answers:[
"Andes",
"Alps",
"Rockies",
"Himalayas"
],
correct:1
},

{
background:"images/europe-countries.jpg",
question:"Europe has more than...",
answers:[
"10 countries",
"20 countries",
"40 countries",
"30 countries"
],
correct:2
},

{
background:"images/european-union.jpg",
question:"What do the stars on the EU flag represent?",
answers:[
"War",
"Tourism",
"Money",
"Unity and Harmony"
],
correct:3
}

];

// =========================
// START GAME
// =========================

function startGame(){

const playerName =
document.getElementById("playerName").value || "Explorer";

document.getElementById("playerInfo").innerHTML =
"👤 " + playerName;

document.getElementById("startScreen")
.classList.add("hidden");

document.getElementById("mapScreen")
.classList.remove("hidden");

unlockLevels();

}

// =========================
// LEVEL BUTTONS
// =========================

for(let i=1;i<=10;i++){

const level =
document.getElementById("level"+i);

level.addEventListener("click",()=>{

if(i===currentLevel){

openQuestion(i);

}

});

}

// =========================
// OPEN QUESTION
// =========================

function openQuestion(levelNumber){

document.getElementById("mapScreen")
.classList.add("hidden");

document.getElementById("quizScreen")
.classList.remove("hidden");

const q =
questions[levelNumber-1];

document.getElementById("quizScreen")
.style.backgroundImage =
`url(${q.background})`;

document.getElementById("question")
.innerHTML =
q.question;

const answersDiv =
document.getElementById("answers");

answersDiv.innerHTML = "";

q.answers.forEach((answer,index)=>{

const btn =
document.createElement("button");

btn.innerHTML = answer;

btn.onclick = ()=>checkAnswer(index);

answersDiv.appendChild(btn);

});

startTimer();

updateLives();

}

// =========================
// TIMER
// =========================

function startTimer(){

clearInterval(interval);

timer = 15;

document.getElementById("timer")
.innerHTML =
"⏱️ " + timer;

interval = setInterval(()=>{

timer--;

document.getElementById("timer")
.innerHTML =
"⏱️ " + timer;

if(timer<=0){

clearInterval(interval);

loseLife();

}

},1000);

}

// =========================
// ANSWERS
// =========================

function checkAnswer(index){

clearInterval(interval);

const q =
questions[currentLevel-1];

if(index===q.correct){

document.getElementById("message")
.innerHTML =
"✅ Mission Complete!";

document.getElementById("correctSound").play();

xp += 100;

setTimeout(()=>{

nextLevel();

},1200);

}
else{

loseLife();

}

}

// =========================
// LOSE LIFE
// =========================

function loseLife(){

lives--;

updateLives();

document.getElementById("message")
.innerHTML =
"❌ Wrong Answer";

document.getElementById("wrongSound").play();

if(lives<=0){

setTimeout(()=>{

gameOver();

},1200);

}
else{

setTimeout(()=>{

backToMap();

},1200);

}

}

// =========================
// UPDATE HEARTS
// =========================

function updateLives(){

const hearts =
"❤️".repeat(lives);

document.getElementById("lives")
.innerHTML = hearts;

document.getElementById("quizLives")
.innerHTML = hearts;

document.getElementById("xp")
.innerHTML =
"⭐ XP: " + xp;

}

// =========================
// NEXT LEVEL
// =========================

function nextLevel(){

currentLevel++;

if(currentLevel>10){

winGame();
return;

}

unlockLevels();

movePlayer();

backToMap();

}

// =========================
// BACK TO MAP
// =========================

function backToMap(){

document.getElementById("message")
.innerHTML = "";

document.getElementById("quizScreen")
.classList.add("hidden");

document.getElementById("mapScreen")
.classList.remove("hidden");

}

// =========================
// UNLOCK LEVELS
// =========================

function unlockLevels(){

for(let i=1;i<=10;i++){

const level =
document.getElementById("level"+i);

if(i<=currentLevel){

level.classList.remove("locked");

}
else{

level.classList.add("locked");

}

}

}

// =========================
// PLAYER MOVEMENT
// =========================

function movePlayer(){

const player =
document.getElementById("player");

const positions = [

{left:"8%",top:"78%"},
{left:"18%",top:"68%"},
{left:"28%",top:"58%"},
{left:"38%",top:"48%"},
{left:"48%",top:"42%"},
{left:"58%",top:"36%"},
{left:"68%",top:"31%"},
{left:"76%",top:"26%"},
{left:"84%",top:"19%"},
{left:"89%",top:"11%"}

];

const pos =
positions[Math.min(currentLevel-1,9)];

player.style.left =
pos.left;

player.style.top =
pos.top;

}

// =========================
// WIN GAME
// =========================

function winGame(){

document.getElementById("mapScreen")
.classList.add("hidden");

document.getElementById("quizScreen")
.classList.add("hidden");

document.getElementById("winScreen")
.classList.remove("hidden");

document.getElementById("victorySound").play();

document.getElementById("finalXP")
.innerHTML =
"⭐ Final XP: " + xp;

}

// =========================
// GAME OVER
// =========================

function gameOver(){

document.getElementById("mapScreen")
.classList.add("hidden");

document.getElementById("quizScreen")
.classList.add("hidden");

document.getElementById("gameOverScreen")
.classList.remove("hidden");

}
