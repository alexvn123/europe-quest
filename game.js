* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Arial, sans-serif;
}

body {
    background: #0f172a;
    min-height: 100vh;
    color: white;
    overflow: hidden;
}

/* ---------------- START SCREEN ---------------- */
.start-screen {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2rem;
    background: linear-gradient(160deg, #0f172a 0%, #1e293b 100%);
}

.start-screen h1 {
    font-size: 3rem;
    color: #ffd700;
    text-shadow: 0 0 15px rgba(255,215,0,0.6);
    margin-bottom: 1.5rem;
}

.start-screen p {
    font-size: 1.3rem;
    color: #cbd5e1;
    margin-bottom: 2.5rem;
}

.play-button {
    padding: 1.2rem 3rem;
    font-size: 1.5rem;
    font-weight: bold;
    background: linear-gradient(180deg, #fef3c7 0%, #d4af37 100%);
    color: #0f172a;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 0 0 20px rgba(212,175,55,0.6);
    transition: transform 0.2s;
}

.play-button:hover {
    transform: scale(1.05);
}

/* ---------------- GAME ---------------- */
.game {
    width: 100vw;
    height: 100vh;
}

.top-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    font-size: 26px;
    font-weight: bold;
    background: rgba(15, 23, 42, 0.85);
    border-bottom: 2px solid #d4af37;
    z-index: 10;
    position: relative;
}

.points { color: #ffd700; }
.lives { color: #ef4444; }

.map-container {
    width: 100%;
    height: calc(100vh - 70px);
    position: relative;
    overflow: hidden;
}

.background-map {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.95;
}

.path {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    pointer-events: none;
}

/* Level Style */
.level {
    position: absolute;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    font-size: 28px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease;
    z-index: 5;
    border: 3px solid #d4af37;
}

.level.locked {
    background: rgba(71, 85, 105, 0.85);
    color: #94a3b8;
    cursor: not-allowed;
    border-color: #64748b;
}

.level.unlocked {
    background: linear-gradient(180deg, #fef3c7 0%, #d4af37 100%);
    color: #0f172a;
    box-shadow: 0 0 18px #d4af37, 0 0 30px rgba(212,175,55,0.6);
    cursor: pointer;
}

.level.unlocked:active {
    transform: scale(0.92);
}

/* ---------------- QUESTION MODAL ---------------- */
.question-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 92%;
    max-width: 450px;
    padding: 25px;
    background: #ffffff;
    color: #0f172a;
    border-radius: 14px;
    box-shadow: 0 0 35px rgba(0,0,0,0.8);
    display: none;
    z-index: 20;
    text-align: center;
    border: 3px solid #d4af37;
}

.question-modal h3 {
    margin-bottom: 20px;
    font-size: 1.25rem;
    line-height: 1.5;
}

.question-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 20px;
    border: 2px solid #cbd5e1;
}

.options {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 20px 0;
}

.option {
    padding: 12px;
    border: 2px solid #cbd5e1;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    text-align: left;
    transition: all 0.2s ease;
}

.option:hover {
    border-color: #d4af37;
    background: #fef3c7;
}

button {
    padding: 10px 20px;
    background: #0f172a;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 10px;
    border: 1px solid #d4af37;
}
