const contentBox = document.body.querySelector("#main-section-content");
const POKEMON_URL = sessionStorage.getItem("POKEMON_URL");
!POKEMON_URL ? location.href = "./index.html" : null;
sessionStorage.clear();

async function inicializar() {
    const pokemon = await (await fetch(POKEMON_URL)).json();
    
    const pokemonImageContainer = document.body.querySelector("#pokemon-img");
    const pokemonIdContainer = document.body.querySelector("#card-id");
    const pokemonNameContainer = document.body.querySelector("#card-name");

    pokemonImageContainer.setAttribute("src", pokemon.sprites.front_default);
    pokemonImageContainer.setAttribute("alt", pokemon.name + " image.");

    pokemonIdContainer.innerText = "#" + pokemon.id;
    pokemonNameContainer.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1, pokemon.name.length); // Primeira letra em maiúsculo.;

    const types = document.body.querySelector("#types");
    pokemon.types.forEach((type) => {
        const span = document.createElement("span");
        span.innerText = type.type.name;

        types.appendChild(span);
    })

    const statsValueContainers = document.body.querySelectorAll(".stat-value");
    statsValueContainers[0].innerText = pokemon.stats[0].base_stat;
    statsValueContainers[1].innerText = pokemon.stats[3].base_stat;
    statsValueContainers[2].innerText = pokemon.stats[1].base_stat;
    statsValueContainers[3].innerText = pokemon.stats[4].base_stat;
    statsValueContainers[4].innerText = pokemon.stats[2].base_stat;
    statsValueContainers[5].innerText = pokemon.stats[5].base_stat;

    const moves = document.body.querySelector("#moves");
    pokemon.moves.forEach((move) => {
        const span = document.createElement("span");
        span.innerText = move.move.name;

        moves.appendChild(span)
    })
}

inicializar();