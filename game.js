let puntos = 0;
let vidas = 3;
let nivelActual = 1;

// 📋 10 PREGUNTAS
const preguntas = [
    {
        nivel: 1,
        enunciado: "¿En qué hemisferio se encuentra Europa?",
        opciones: ["A) Sur", "B) Norte", "C) Este", "D) Oeste"],
        correcta: "B) Norte"
    },
    {
        nivel: 2,
        enunciado: "¿Qué océano está al oeste de Europa?",
        opciones: ["A) Pacífico", "B) Índico", "C) Atlántico", "D) Ártico"],
        correcta: "C) Atlántico"
    },
    {
        nivel: 3,
        enunciado: "¿Cuántas estrellas tiene la bandera de la Unión Europea?",
        opciones: ["A) 10", "B) 12", "C) 15", "D) 20"],
        correcta: "B) 12"
    },
    {
        nivel: 4,
        enunciado: "¿Cuál es una lengua muy hablada en Europa?",
        opciones: ["A) Alemán", "B) Japonés", "C) Hindi", "D) Chino"],
        correcta: "A) Alemán"
    },
    {
        nivel: 5,
        enunciado: "¿Qué país es famoso por la pizza y la pasta?",
        opciones: ["A) Francia", "B) Alemania", "C) Italia", "D) España"],
        correcta: "C) Italia"
    },
    {
        nivel: 6,
        enunciado: "¿Qué civilización influyó mucho en la cultura europea?",
        opciones: ["A) Romana", "B) Maya", "C) Inca", "D) Azteca"],
        correcta: "A) Romana"
    },
    {
        nivel: 7,
        enunciado: "¿En qué país se encuentra la Torre Eiffel?",
        opciones: ["A) Italia", "B) España", "C) Francia", "D) Portugal"],
        correcta: "C) Francia"
    },
    {
        nivel: 8,
        enunciado: "¿Qué cordillera montañosa está en Europa?",
        opciones: ["A) Andes", "B) Alpes", "C) Rocosas", "D) Himalaya"],
        correcta: "B) Alpes"
    },
    {
        nivel: 9,
        enunciado: "Europa tiene más de...",
        opciones: ["A) 10 países", "B) 20 países", "C) 40 países", "D) 30 países"],
        correcta: "C) 40 países"
    },
    {
        nivel: 10,
        enunciado: "¿Qué representan las estrellas de la bandera de la UE?",
        opciones: ["A) Guerra", "B) Turismo", "C) Dinero", "D) Unidad"],
        correcta: "D) Unidad"
    }
];

// Iniciar juego
function iniciarJuego() {
    document.getElementById('pantallaInicio').style.display = 'none';
    document.getElementById('juego').style.display = 'block';
    reiniciarProgreso();
}

// Reiniciar todo
function reiniciarProgreso() {
    puntos = 0;
    vidas = 3;
    nivelActual = 1;
    actualizarInfo();
    actualizarEstadosNiveles();
}

// Volver al inicio
function volverAlInicio() {
    document.getElementById('juego').style.display = 'none';
    document.getElementById('pantallaInicio').style.display = 'flex';
}

// Actualizar marcadores
function actualizarInfo() {
    document.getElementById('puntos').textContent = puntos;
    document.getElementById('vidas').textContent = vidas;
}

// Desbloquear niveles
function actualizarEstadosNiveles() {
    document.querySelectorAll('.nivel').forEach(nivel => {
        const num = parseInt(nivel.dataset.nivel);
        if (num <= nivelActual) {
            nivel.classList.remove('bloqueado');
            nivel.classList.add('desbloqueado');
        } else {
            nivel.classList.remove('desbloqueado');
            nivel.classList.add('bloqueado');
        }
    });
}

// Mostrar pregunta
function mostrarPregunta(pregunta) {
    document.getElementById('textoPregunta').textContent = pregunta.enunciado;
    const contenedor = document.getElementById('opciones');
    contenedor.innerHTML = '';

    pregunta.opciones.forEach(opcion => {
        const div = document.createElement('div');
        div.className = 'opcion';
        div.textContent = opcion;
        div.onclick = () => verificar(opcion, pregunta.correcta, pregunta.nivel);
        contenedor.appendChild(div);
    });

    document.getElementById('ventanaPregunta').style.display = 'block';
}

// Verificar respuesta SIN mostrar la correcta
function verificar(elegida, correcta, nivelPregunta) {
    const sonidoBien = document.getElementById('sonidoCorrecto');
    const sonidoMal = document.getElementById('sonidoIncorrecto');

    if (elegida === correcta) {
        puntos += 10;
        sonidoBien.play().catch(() => {});
        alert("✅ ¡Correcto!");

        if (nivelPregunta === nivelActual && nivelActual < 10) {
            nivelActual++;
            actualizarEstadosNiveles();
        }

        if (nivelPregunta === 10) {
            alert(`🎉 ¡Felicidades! Completaste todos los niveles. Puntos: ${puntos}`);
            volverAlInicio();
        }

    } else {
        vidas -= 1;
        sonidoMal.play().catch(() => {});
        alert("❌ ¡Incorrecto! Inténtalo de nuevo.");

        if (vidas <= 0) {
            alert(`💀 Se acabaron las vidas. Puntos: ${puntos}`);
            volverAlInicio();
        }
    }

    actualizarInfo();
    cerrarPregunta();
}

function cerrarPregunta() {
    document.getElementById('ventanaPregunta').style.display = 'none';
}

// Activar botones
window.addEventListener('load', () => {
    document.querySelectorAll('.nivel').forEach(nivel => {
        nivel.addEventListener('click', () => {
            const num = parseInt(nivel.dataset.nivel);
            if (num === nivelActual) {
                const pregunta = preguntas.find(p => p.nivel === num);
                if (pregunta) mostrarPregunta(pregunta);
            } else if (num > nivelActual) {
                alert(`🔒 Nivel ${num} bloqueado. Completa el ${nivelActual} primero.`);
            }
        });
    });
});
