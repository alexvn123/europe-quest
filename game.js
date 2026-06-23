let puntos = 0;
let vidas = 3;
let lugarActual = null;

// Base de datos con todos tus archivos
const lugares = [
    {
        nivel: 1,
        nombre: "París",
        imagen: "imagenes/eiffel-tower.jpg",
        opciones: ["París", "Madrid", "Roma", "Berlín"]
    },
    {
        nivel: 2,
        nombre: "Roma",
        imagen: "imagenes/colosseum.jpg",
        opciones: ["Roma", "Londres", "Lisboa", "París"]
    },
    {
        nivel: 3,
        nombre: "Berlín",
        imagen: "imagenes/berlin.jpg",
        opciones: ["Berlín", "Madrid", "París", "Roma"]
    },
    {
        nivel: 4,
        nombre: "Unión Europea",
        imagen: "imagenes/eu-flag.jpg",
        opciones: ["Unión Europea", "España", "Francia", "Italia"]
    },
    {
        nivel: 5,
        nombre: "Alpes",
        imagen: "imagenes/alps.jpg",
        opciones: ["Alpes", "Pirineos", "Apeninos", "Cárpatos"]
    },
    {
        nivel: 6,
        nombre: "Océano Atlántico",
        imagen: "imagenes/atlantic-ocean.jpg",
        opciones: ["Océano Atlántico", "Mar Mediterráneo", "Mar del Norte", "Mar Báltico"]
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
        const lugar = lugares.find(l => l.nivel === nivel);
        lugarActual = lugar;

        document.getElementById('personaje').style.top = punto.style.top;
        document.getElementById('personaje').style.left = punto.style.left;

        mostrarPregunta(lugar);
    });
});

// Mostrar ventana de pregunta
function mostrarPregunta(lugar) {
    document.getElementById('imagenLugar').src = lugar.imagen;
    const contenedorOpciones = document.getElementById('opciones');
    contenedorOpciones.innerHTML = '';

    lugar.opciones.forEach(opcion => {
        const boton = document.createElement('div');
        boton.className = 'opcion';
        boton.textContent = opcion;
        boton.onclick = () => verificarRespuesta(opcion, lugar.nombre);
        contenedorOpciones.appendChild(boton);
    });

    document.getElementById('ventanaPregunta').style.display = 'block';
}

// Verificar respuesta
function verificarRespuesta(respuesta, correcta) {
    const sonidoCorrecto = document.getElementById('sonidoCorrecto');
    const sonidoIncorrecto = document.getElementById('sonidoIncorrecto');
    const sonidoVictoria = document.getElementById('sonidoVictoria');

    if (respuesta === correcta) {
        puntos += 10;
        sonidoCorrecto.play().catch(() => {});
        alert(`✅ ¡Correcto! +10 puntos`);
    } else {
        vidas -= 1;
        sonidoIncorrecto.play().catch(() => {});
        alert(`❌ Incorrecto. La respuesta es: ${correcta}`);
        if (vidas <= 0) {
            sonidoVictoria.play().catch(() => {});
            alert(`💀 Fin del juego! Puntuación final: ${puntos}`);
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
