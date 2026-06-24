let puntos = 0;
let vidas = 3;
let nivelActual = 1;

// 📋 PREGUNTAS CON TUS IMÁGENES
const preguntas = [
    {
        nivel: 1,
        enunciado: "¿En qué hemisferio se encuentra Europa?",
        imagen: "imagenes/europe-countries.jpg",
        opciones: ["A) Sur", "B) Norte", "C) Este", "D) Oeste"],
        correcta: "B) Norte"
    },
    {
        nivel: 2,
        enunciado: "¿Qué océano está al oeste de Europa?",
        imagen: "imagenes/atlantic-ocean.jpg",
        opciones: ["A) Pacífico", "B) Índico", "C) Atlántico", "D) Ártico"],
        correcta: "C) Atlántico"
    },
    {
        nivel: 3,
        enunciado: "¿Cuántas estrellas tiene la bandera de la Unión Europea?",
        imagen: "imagenes/eu-flag.jpg",
        opciones: ["A) 10", "B) 12", "C) 15", "D) 20"],
        correcta: "B) 12"
    },
    {
        nivel: 4,
        enunciado: "¿Cuál es una lengua muy hablada en Europa?",
        imagen: "imagenes/european-union.jpg",
        opciones: ["A) Alemán", "B) Japonés", "C) Hindi", "D) Chino"],
        correcta: "A) Alemán"
    },
    {
        nivel: 5,
        enunciado: "¿Qué país es famoso por la pizza y la pasta?",
        imagen: "imagenes/italy.jpg",
        opciones: ["A) Francia", "B) Alemania", "C) Italia", "D) España"],
        correcta: "C) Italia"
    },
    {
        nivel: 6,
        enunciado: "¿Qué civilización influyó mucho en la cultura europea?",
        imagen: "imagenes/colosseum.jpg",
        opciones: ["A) Romana", "B) Maya", "C) Inca", "D) Azteca"],
        correcta: "A) Romana"
    },
    {
        nivel: 7,
        enunciado: "¿En qué país se encuentra la Torre Eiffel?",
        imagen: "imagenes/eiffel-tower.jpg",
        opciones: ["A) Italia", "B) España", "C) Francia", "D) Portugal"],
        correcta: "C) Francia"
    },
    {
        nivel: 8,
        enunciado: "¿Qué cordillera montañosa está en Europa?",
        imagen: "imagenes/alps.jpg",
        opciones: ["A) Andes", "B) Alpes", "C) Rocosas", "D) Himalaya"],
        correcta: "B) Alpes"
    },
    {
        nivel: 9,
        enunciado: "¿Cuál es la capital de Alemania?",
        imagen: "imagenes/berlin.jpg",
        opciones: ["A) París", "B) Roma", "C) Berlín", "D) Madrid"],
        correcta: "C) Berlín"
    },
    {
        nivel: 10,
        enunciado: "¿Qué representan las estrellas de la bandera de la UE?",
        imagen: "imagenes/eu-flag.jpg",
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

// Mostrar pregunta con su imagen
function mostrarPregunta(pregunta) {
    document.getElementById('textoPregunta').textContent = pregunta.enunciado;
    document.getElementById('imagenPregunta').src = pregunta.imagen;
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
