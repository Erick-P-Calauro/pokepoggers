const contentBox = document.body.querySelector("#main-section-content");
const POKEMON_URL = sessionStorage.getItem("POKEMON_URL");
!POKEMON_URL ? location.href = "./index.html" : null;
sessionStorage.clear();

async function inicializar() {
    const response = await fetch(POKEMON_URL);
    const result = await response.json();

    const span = document.createElement("span");
    span.innerText = result.name;

    const first_move = document.createElement("span");
    first_move.innerText = result.moves[0].move.name;

    contentBox.appendChild(span);
    contentBox.appendChild(first_move);
}

inicializar();