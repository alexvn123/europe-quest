// Variables del juego
let puntos = 0;
let vidas = 3;

// 📋 PREGUNTAS EXACTAS
const preguntas = [
    {
        nivel: 1,
        enunciado: "Where is Europe located?",
        imagen: "imagenes/europe-countries.jpg",
        opciones: ["A) Southern Hemisphere", "B) Northern Hemisphere", "C) Africa", "D) Asia"],
        respuestaCorrecta: "B) Northern Hemisphere"
    },
    {
        nivel: 2,
        enunciado: "What ocean borders Europe to the west?",
        imagen: "imagenes/atlantic-ocean.jpg",
        opciones: ["A) Atlantic Ocean", "B) Pacific Ocean", "C) Indian Ocean", "D) Southern Ocean"],
        respuestaCorrecta: "A) Atlantic Ocean"
    },
    {
        nivel: 3,
        enunciado: "How many stars are on the European Union flag?",
        imagen: "imagenes/eu-flag.jpg",
        opciones: ["A) 10", "B) 12", "C) 15", "D) 20"],
        respuestaCorrecta: "B) 12"
    },
    {
        nivel: 4,
        enunciado: "Which language is common in Europe?",
        imagen: "imagenes/european-union.jpg",
        opciones: ["A) German", "B) Japanese", "C) Hindi", "D) Chinese"],
        respuestaCorrecta: "A) German"
    },
    {
        nivel: 5,
        enunciado: "Which country is famous for pizza and pasta?",
        imagen: "imagenes/italy.jpg",
        opciones: ["A) France", "B) Germany", "C) Italy", "D) Spain"],
        respuestaCorrecta: "C) Italy"
    },
    {
        nivel: 6,
        enunciado: "Where is the Eiffel Tower located?",
        imagen: "imagenes/eiffel-tower.jpg",
        opciones: ["A) Italy", "B) Spain", "C) France", "D) Germany"],
        respuestaCorrecta: "C) France"
    }
];

// Actualizar marcadores
function actualizarInfo() {
    document.getElementById('puntos').textContent = puntos;
    document.getElementById('vidas').textContent = vidas;
}

// Mostrar ventana con la pregunta
function mostrarPregunta(pregunta) {
    document.getElementById('pregunta-texto').textContent = pregunta.enunciado;
    document.getElementById('imagen').src = pregunta.imagen;

    const contenedor = document.getElementById('opciones');
    contenedor.innerHTML = '';

    pregunta.opciones.forEach(opcion => {
        const div = document.createElement('div');
        div.className = 'opcion';
        div.textContent = opcion;
        div.onclick = () => verificarRespuesta(opcion, pregunta.respuestaCorrecta);
        contenedor.appendChild(div);
    });

    document.getElementById('ventana').style.display = 'block';
}

// Verificar respuesta
function verificarRespuesta(elegida, correcta) {
    const sonidoBien = document.getElementById('sonido-correcto');
    const sonidoMal = document.getElementById('sonido-incorrecto');
    const sonidoFin = document.getElementById('sonido-fin');

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
            alert(`💀 Game Over! Score: ${puntos}`);
            puntos = 0;
            vidas = 3;
        }
    }

    actualizarInfo();
    cerrarVentana();
}

// Cerrar ventana
function cerrarVentana() {
    document.getElementById('ventana').style.display = 'none';
}

// Iniciar el juego y activar los botones
window.addEventListener('load', () => {
    actualizarInfo();

    document.querySelectorAll('.punto').forEach(boton => {
        boton.addEventListener('click', () => {
            const nivel = parseInt(boton.dataset.nivel);
            const pregunta = preguntas.find(p => p.nivel === nivel);
            if (pregunta) mostrarPregunta(pregunta);
        });
    });
});
