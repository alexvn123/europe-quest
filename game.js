let puntos = 0;
let vidas = 3;

// 📋 LAS 10 PREGUNTAS COMPLETAS
const preguntas = [
    {
        nivel: 1,
        enunciado: "Where is Europe located?",
        imagen: "imagenes/europe-countries.jpg",
        opciones: ["A) Southern Hemisphere", "B) Northern Hemisphere", "C) Africa", "D) Asia"],
        correcta: "B) Northern Hemisphere"
    },
    {
        nivel: 2,
        enunciado: "What ocean borders Europe to the west?",
        imagen: "imagenes/atlantic-ocean.jpg",
        opciones: ["A) Atlantic Ocean", "B) Pacific Ocean", "C) Indian Ocean", "D) Southern Ocean"],
        correcta: "A) Atlantic Ocean"
    },
    {
        nivel: 3,
        enunciado: "How many stars are on the European Union flag?",
        imagen: "imagenes/eu-flag.jpg",
        opciones: ["A) 10", "B) 12", "C) 15", "D) 20"],
        correcta: "B) 12"
    },
    {
        nivel: 4,
        enunciado: "Which language is common in Europe?",
        imagen: "imagenes/european-union.jpg",
        opciones: ["A) German", "B) Japanese", "C) Hindi", "D) Chinese"],
        correcta: "A) German"
    },
    {
        nivel: 5,
        enunciado: "Which country is famous for pizza and pasta?",
        imagen: "imagenes/italy.jpg",
        opciones: ["A) France", "B) Germany", "C) Italy", "D) Spain"],
        correcta: "C) Italy"
    },
    {
        nivel: 6,
        enunciado: "Which civilization influenced European philosophy and politics?",
        imagen: "imagenes/colosseum.jpg",
        opciones: ["A) Roman Empire", "B) Maya", "C) Inca", "D) Aztec"],
        correcta: "A) Roman Empire"
    },
    {
        nivel: 7,
        enunciado: "Where is the Eiffel Tower located?",
        imagen: "imagenes/eiffel-tower.jpg",
        opciones: ["A) Italy", "B) Spain", "C) France", "D) Germany"],
        correcta: "C) France"
    },
    {
        nivel: 8,
        enunciado: "Which mountain range is in Europe?",
        imagen: "imagenes/alps.jpg",
        opciones: ["A) Andes", "B) Alps", "C) Rockies", "D) Himalayas"],
        correcta: "B) Alps"
    },
    {
        nivel: 9,
        enunciado: "Europe has more than...",
        imagen: "imagenes/europe-countries.jpg",
        opciones: ["A) 10 countries", "B) 20 countries", "C) 40 countries", "D) 30 countries"],
        correcta: "C) 40 countries"
    },
    {
        nivel: 10,
        enunciado: "What do the stars on the EU flag represent?",
        imagen: "imagenes/eu-flag.jpg",
        opciones: ["A) War", "B) Tourism", "C) Money", "D) Unity and Harmony"],
        correcta: "D) Unity and Harmony"
    }
];

// Iniciar juego
function iniciarJuego() {
    document.getElementById('pantallaInicio').style.display = 'none';
    document.getElementById('juego').style.display = 'block';
    actualizarInfo();
}

// Actualizar marcadores
function actualizarInfo() {
    document.getElementById('puntos').textContent = puntos;
    document.getElementById('vidas').textContent = vidas;
}

// Mostrar pregunta
function mostrarPregunta(pregunta) {
    document.getElementById('textoPregunta').textContent = pregunta.enunciado;
    document.getElementById('imagenPregunta').src = pregunta.imagen;
    const contenedor = document.getElementById('opciones');
    contenedor.innerHTML = '';

    pregunta.opciones.forEach(opcion => {
        const div = document.createElement('div');
        div.className = 'opcion';
        div.textContent = opcion;
        div.onclick = () => verificar(opcion, pregunta.correcta);
        contenedor.appendChild(div);
    });

    document.getElementById('ventanaPregunta').style.display = 'block';
}

// Verificar respuesta
function verificar(elegida, correcta) {
    const sonidoBien = document.getElementById('sonidoCorrecto');
    const sonidoMal = document.getElementById('sonidoIncorrecto');
    const sonidoFin = document.getElementById('sonidoVictoria');

    if (elegida === correcta) {
        puntos += 10;
        sonidoBien.play().catch(() => {});
        alert(`✅ Correct! +10 points`);
    } else {
        vidas -= 1;
        sonidoMal.play().catch(() => {});
        alert(`❌ Wrong! Correct answer: ${correcta}`);
        if (vidas <= 0) {
            sonidoFin.play().catch(() => {});
            alert(`💀 Game Over! Final score: ${puntos} points`);
            puntos = 0;
            vidas = 3;
        }
    }

    actualizarInfo();
    cerrarPregunta();
}

// Cerrar ventana
function cerrarPregunta() {
    document.getElementById('ventanaPregunta').style.display = 'none';
}

// Activar botones al cargar
window.addEventListener('load', () => {
    document.querySelectorAll('.punto-nivel').forEach(boton => {
        boton.addEventListener('click', () => {
            const nivel = parseInt(boton.dataset.nivel);
            const pregunta = preguntas.find(p => p.nivel === nivel);
            if (pregunta) mostrarPregunta(pregunta);
        });
    });
});
