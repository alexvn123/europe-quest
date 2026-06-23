let puntos = 0;
let vidas = 3;
let preguntaActual = null;

// 📋 PREGUNTAS EXACTAS DEL DOCUMENTO
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
        enunciado: "Which civilization influenced European philosophy and politics?",
        imagen: "imagenes/colosseum.jpg",
        opciones: ["A) Roman Empire", "B) Maya", "C) Inca", "D) Aztec"],
        respuestaCorrecta: "A) Roman Empire"
    },
    {
        nivel: 7,
        enunciado: "Where is the Eiffel Tower located?",
        imagen: "imagenes/eiffel-tower.jpg",
        opciones: ["A) Italy", "B) Spain", "C) France", "D) Germany"],
        respuestaCorrecta: "C) France"
    },
    {
        nivel: 8,
        enunciado: "Which mountain range is in Europe?",
        imagen: "imagenes/alps.jpg",
        opciones: ["A) Andes", "B) Alps", "C) Rockies", "D) Himalayas"],
        respuestaCorrecta: "B) Alps"
    },
    {
        nivel: 9,
        enunciado: "Europe has more than...",
        imagen: "imagenes/europe-countries.jpg",
        opciones: ["A) 10 countries", "B) 20 countries", "C) 40 countries", "D) 30 countries"],
        respuestaCorrecta: "C) 40 countries"
    },
    {
        nivel: 10,
        enunciado: "What do the stars on the EU flag represent?",
        imagen: "imagenes/eu-flag.jpg",
        opciones: ["A) War", "B) Tourism", "C) Money", "D) Unity and Harmony"],
        respuestaCorrecta: "D) Unity and Harmony"
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

// Mover personaje y abrir pregunta
document.querySelectorAll('.punto-ciudad').forEach(punto => {
    punto.addEventListener('click', () => {
        const nivel = parseInt(punto.dataset.nivel);
        const pregunta = preguntas.find(p => p.nivel === nivel);
        preguntaActual = pregunta;

        // Mover personaje al punto seleccionado
        document.getElementById('personaje').style.top = punto.style.top;
        document.getElementById('personaje').style.left = punto.style.left;

        mostrarPregunta(pregunta);
    });
});

// Mostrar ventana con la pregunta
function mostrarPregunta(pregunta) {
    document.getElementById('tituloPregunta').textContent = pregunta.enunciado;
    document.getElementById('imagenLugar').src = pregunta.imagen;
    
    const contenedorOpciones = document.getElementById('opciones');
    contenedorOpciones.innerHTML = '';

    pregunta.opciones.forEach(opcion => {
        const boton = document.createElement('div');
        boton.className = 'opcion';
        boton.textContent = opcion;
        boton.onclick = () => verificarRespuesta(opcion, pregunta.respuestaCorrecta);
        contenedorOpciones.appendChild(boton);
    });

    document.getElementById('ventanaPregunta').style.display = 'block';
}

// Verificar si la respuesta es correcta
function verificarRespuesta(respuestaUsuario, respuestaCorrecta) {
    const sonidoCorrecto = document.getElementById('sonidoCorrecto');
    const sonidoIncorrecto = document.getElementById('sonidoIncorrecto');
    const sonidoVictoria = document.getElementById('sonidoVictoria');

    if (respuestaUsuario === respuestaCorrecta) {
        puntos += 10;
        sonidoCorrecto.play().catch(() => {});
        alert(`✅ Correct! +10 points`);
    } else {
        vidas -= 1;
        sonidoIncorrecto.play().catch(() => {});
        alert(`❌ Wrong! The correct answer is: ${respuestaCorrecta}`);
        
        if (vidas <= 0) {
            sonidoVictoria.play().catch(() => {});
            alert(`💀 Game Over! Final score: ${puntos} points`);
            // Reiniciar juego
            puntos = 0;
            vidas = 3;
        }
    }

    actualizarInfo();
    cerrarPregunta();
}

// Cerrar ventana de pregunta
function cerrarPregunta() {
    document.getElementById('ventanaPregunta').style.display = 'none';
}
