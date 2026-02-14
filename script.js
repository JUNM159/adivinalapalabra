// ================= CONFIGURACIÓN =================
const jugadores = {
    1: {
        password: "2020",
        palabra: "COMPRENSIBLE",
        pista: "Un rasgo característico de este año que pasó y que no yo no habia notado hasta ahora: en cada prueba, cada reflexión y cada aprendizaje, sin importar lo difícil que fuera el escenario, siempre logras ser alguien:",
        carpetaImagen: "imagenes/kristel/",
        final: "kristel.html"
    },
    2: {
        password: "BESTIOTAKU",
        palabra: "RACIONAL",
        pista: "Una característica muy tuya que surge en cada una de nuestras conversaciones Terapéuticas: siempre con los pies en la tierra, manteniendo el equilibrio incluso cuando mueres por dejarte llevar. Pase lo que pase, sigues siendo alguien:",
        carpetaImagen: "imagenes/valeria/",
        final: "valeria.html"
    },
    3: {
        password: "OSKEY",
        palabra: "CARIÑOSA",
        pista: "Una característica que solo pocos conocen: todos piensas que eres alguien seria o amargada e incluso tu  dices tener poca batería social, siempre haces el esfuerzo de dar lo mejor de ti para que la pasemos bien. Para mí, tú eres alguien:",
        carpetaImagen: "imagenes/karla/",
        final: "karla.html"
    }
    
};

let jugadorActual = null;

// ================= MENU =================
function selectPlayer(numero){

    jugadorActual = numero;

    // ocultar SOLO selección de jugadores
    document.getElementById("players-container").style.display = "none";

    // mostrar contraseña
    document.getElementById("password-section")
        .classList.remove("hidden");
}



function checkPassword(){
    const pass = document.getElementById("password-input").value;
    const config = jugadores[jugadorActual];

    if(pass === config.password){
        document.getElementById("menu-container").classList.add("hidden");
        document.getElementById("game-container").classList.remove("hidden");
        iniciarJuego();
    }else{
        document.getElementById("password-error").textContent="Contraseña incorrecta";
    }
}

// ================= INICIAR =================
function iniciarJuego(){

    const config = jugadores[jugadorActual];

    // PISTA
    document.getElementById("hint-text").textContent =
        "Pista: " + config.pista;

    crearImagen(config);
    const total = config.palabra.length;

    configurarGrid(total);

    crearEspacios(config);
}

// ================= CREAR IMAGEN =================
function crearImagen(config){

    const container = document.getElementById("image-container");
    container.innerHTML="";

    const total = config.palabra.length;
    configurarGrid(total);

    for(let i=0;i<total;i++){

        const img=document.createElement("img");

        // 🔥 RUTA RELATIVA AUTOMÁTICA
        img.src = config.carpetaImagen + "pieza "+(i+1)+".jpg";

        img.classList.add("layer");
        img.id="layer-"+i;

        container.appendChild(img);
    }
}

function configurarGrid(totalPiezas){

    const container = document.getElementById("image-container");

    // siempre 2 filas
    const filas = 2;

    // columnas automáticas
    const columnas = Math.ceil(totalPiezas / filas);

    container.style.gridTemplateColumns =
        `repeat(${columnas}, 1fr)`;

    container.style.gridTemplateRows =
        `repeat(${filas}, 1fr)`;
}

// ================= CREAR LETRAS =================
function crearEspacios(config){

    const container=document.getElementById("word-container");
    container.innerHTML="";

    for(let i=0;i<config.palabra.length;i++){

        const input=document.createElement("input");

        input.maxLength=1;
        input.dataset.index=i;
        input.classList.add("letter-box");

        container.appendChild(input);
    }
}

// ================= VERIFICAR LETRA =================
function verificarLetra(e){

    const input=e.target;
    const letra=input.value.toUpperCase();
    const index=parseInt(input.dataset.index);

    const config=jugadores[jugadorActual];

    if(letra === config.palabra[index]){

        mostrarParte(index);
        input.disabled=true;

        verificarVictoria();

    }else{
        input.value="";
    }
}

// ================= MOSTRAR PARTE =================
function mostrarParte(index){

    const layer=document.getElementById("layer-"+index);

    if(layer){
        layer.classList.add("shown");
    }
}
// ================= verificador si ganaste =================
function guess(){

    const config = jugadores[jugadorActual];
    const inputs = document.querySelectorAll(".letter-box");

    let palabraActual = "";
    let letrasCorrectas = 0;

    inputs.forEach((input, index)=>{

        const letra = input.value.toUpperCase();
        palabraActual += letra;

        // si la letra coincide
        if(letra === config.palabra[index]){

            mostrarParte(index);
            input.disabled = true;
            letrasCorrectas++;
        }
    });

    // verificar si ganó
    if(letrasCorrectas === config.palabra.length){
        mostrarBotonFinal();
    }else{
        document.getElementById("message").textContent =
            "Algunas letras no coinciden, ¡PONGALE GANAS!";
    }
}


// ================= GANAR =================
function verificarVictoria(){

    const inputs=document.querySelectorAll(".letter-box");

    const completo=[...inputs].every(i=>i.disabled);

    if(completo){

        setTimeout(()=>{
            window.location.href =
                jugadores[jugadorActual].final;
        },1200);
    }
}

function mostrarBotonFinal(){

    const btn = document.createElement("button");

    btn.textContent = "Continuar al final";
    btn.classList.add("game-btn");

    btn.onclick = ()=>{
        window.location.href =
            jugadores[jugadorActual].final;
    };

    document.getElementById("message").innerHTML="";
    document.getElementById("message").appendChild(btn);

}

