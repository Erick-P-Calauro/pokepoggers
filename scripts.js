const API_URL = "https://pokeapi.co/api/v2";
const loadMoreButton = document.body.querySelector("#load-more-button");
const contentBox = document.body.querySelector("#main-section-content");
let pagination_counter = 0;

function inicializar() {
    carregarMais();
}

function criarCardPokemon(pokemonIndex, pokemonName, pokemonImage) {
    
    // Primeira letra em maiúsculo.
    pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1, pokemonName.length);

    const nomePokemon = document.createElement("span");
    nomePokemon.innerText = pokemonName;

    const indexPokemon = document.createElement("span");
    indexPokemon.innerText = pokemonIndex;

    const img = document.createElement("img");
    img.setAttribute("src", pokemonImage);
    img.setAttribute("alt", pokemonName + " image.");

    const div = document.createElement("div");
    div.setAttribute("id", "pokemon-card");

    div.appendChild(indexPokemon);
    div.appendChild(img);
    div.appendChild(nomePokemon);

    return div;
}

async function carregarMais () {
    loadMoreButton.setAttribute("disabled", "true");

    let response = await fetch(API_URL + "/pokemon?offset="+pagination_counter+"&limit=20", { method: "GET" });
    let result = await response.json(); 
    let index_counter = pagination_counter + 1; // Contagem que aparece para o usuário;

    result.results.forEach(async (pokemonInfo) => {
        const pokemon = await (await fetch(pokemonInfo.url)).json();
        const pokemonCard = criarCardPokemon(index_counter, pokemonInfo.name, pokemon.sprites.front_default);

        contentBox.appendChild(pokemonCard);
        
        index_counter += 1;
    })

    pagination_counter += 20;

    loadMoreButton.removeAttribute("disabled");
}

inicializar();