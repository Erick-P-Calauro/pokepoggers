const API_URL = "https://pokeapi.co/api/v2";
const loadMoreButton = document.body.querySelector("#load-more-button");
const contentBox = document.body.querySelector("#main-section-content");

let pagination_counter = 0;
let pagination_limit = 20;

function inicializar() {
    window.addEventListener("keypress", (event) => {
        if(event.key == "Enter") {
            buscarPokemonPorNome();
        }
    })

    carregarMais();
}

function limparMainSection() {
    pagination_counter = 0;
    contentBox.innerHTML = "";

    loadMoreButton.removeAttribute("disabled");
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

    let response = await fetch(API_URL + "/pokemon?offset="+pagination_counter+"&limit="+pagination_limit, { method: "GET" });
    let result = await response.json(); 
    let index_counter = pagination_counter + 1; // Contagem que aparece para o usuário;

    result.results.forEach(async (pokemonInfo) => {
        const pokemon = await (await fetch(pokemonInfo.url)).json();
        const pokemonCard = criarCardPokemon(index_counter, pokemonInfo.name, pokemon.sprites.front_default);

        contentBox.appendChild(pokemonCard);
        
        index_counter += 1;
    })

    pagination_counter += result.results.length;

    loadMoreButton.removeAttribute("disabled");
}

function mudarLimitePaginacao() {
    const select = document.body.querySelector("#pagination-limit");
    pagination_limit = select.value * 1;

    limparMainSection();
    carregarMais();
}

async function buscarPokemonPorNome() {
    const input = document.body.querySelector("#pokemon-name-input");
    const inputValue = input.value;

    limparMainSection();

    let response = await fetch(API_URL + "/pokemon/"+inputValue, { method: "GET" });
    let result = await response.json(); 
    let index_counter = pagination_counter + 1;

    contentBox.appendChild(criarCardPokemon(index_counter, result.name,  result.sprites.front_default));

    pagination_counter += 1;

    loadMoreButton.setAttribute("disabled", "true");
}

function limparInputNomePokemon() {
    const input = document.body.querySelector("#pokemon-name-input");
    input.value = "";

    limparMainSection();
    carregarMais();
}

inicializar();