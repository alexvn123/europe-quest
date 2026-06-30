* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
}

body {
    background: #0f172a;
    color: #fff;
    overflow: hidden;
}

.start-screen {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    text-align: center;
}

.start-screen h1 {
    color: #ffd700;
    font-size: 2.5rem;
}

input {
    padding: 0.8rem;
    width: 280px;
    border-radius: 8px;
    border: 2px solid #ffd700;
    background: #1e293b;
    color: #fff;
    font-size: 1rem;
}

button {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 8px;
    background: #ffd700;
    color: #000;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;
}

button:hover {
    background: #ffcc00;
}

.game {
    width: 100vw;
    height: 100vh;
    position: relative;
}

.top-panel {
    display: flex;
    justify-content: space-around;
    padding: 1rem;
    background: rgba(0,0,0,0.6);
    font-size: 1.1rem;
}

.map-container {
    width: 100%;
    height: calc(100vh - 60px);
    position: relative;
}

.background-map {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.level {
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #475569;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border: 2px solid #ffd700;
    cursor: not-allowed;
}

.level.unlocked {
    background: #ffd700;
    color: #000;
    cursor: pointer;
}

.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    background: #ffffff;
    color: #0f172a;
    padding: 1.5rem;
    border-radius: 12px;
    border: 3px solid #ffd700;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
    display: none;
    text-align: center;
}

/* ✅ Interfaz con fondo de imagen */
.scores-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 92%;
    max-width: 550px;
    max-height: 90vh;
    overflow-y: auto;
    background: url("imagenes/ranking-banner.jpg") center / cover no-repeat;
    background-color: rgba(0, 0, 0, 0.75);
    background-blend-mode: darken;
    color: #ffffff;
    padding: 2rem;
    border-radius: 16px;
    border: 3px solid #ffd700;
    box-shadow: 0 0 30px rgba(0,0,0,0.6);
    display: none;
    text-align: center;
}

.scores-modal h2 {
    color: #ffd700;
    margin-bottom: 1rem;
    font-size: 1.8rem;
}

.subtitle {
    margin-bottom: 1.5rem;
    color: #e2e8f0;
    font-style: italic;
}

/* 🎨 Estilo de tabla con medallas */
#scoresTable {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.8rem;
    background: rgba(255, 255, 255, 0.92);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

#scoresTable th,
#scoresTable td {
    padding: 12px 8px;
    border: 1px solid #cbd5e1;
    color: #0f172a;
    text-align: center;
}

#scoresTable th {
    background: #0f172a;
    color: #ffd700;
    font-weight: bold;
    font-size: 1rem;
}

/* Resaltar filas de los primeros puestos */
#scoresTable tr:nth-child(1) {
    background: #fffbeb;
    font-weight: bold;
}

#scoresTable tr:nth-child(2) {
    background: #f8fafc;
}

#scoresTable tr:nth-child(3) {
    background: #f1f5f9;
}

#scoresTable tr:hover {
    background: #fffbeb;
    transition: background 0.2s ease;
}

.back-btn {
    background: #2563eb;
    color: white;
    font-size: 1rem;
    padding: 0.9rem 2rem;
    border-radius: 8px;
}

.back-btn:hover {
    background: #1d4ed8;
}
