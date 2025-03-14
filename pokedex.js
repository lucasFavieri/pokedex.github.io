
// let quantidade = 3; // Start with 4 Pokémon
// let offset = 0; // Keep track of the offset for API requests

// const tipoCores = {
//     grass: "#78C850",
//     fire: "#F08030",
//     water: "#6890F0",
//     electric: "#F8D030",
//     ice: "#98D8D8",
//     fighting: "#C03028",
//     poison: "#A040A0",
//     ground: "#E0C068",
//     flying: "#A890F0",
//     psychic: "#F85888",
//     bug: "#A8B820",
//     rock: "#B8A038",
//     ghost: "#705898",
//     dragon: "#7038F8",
//     dark: "#705848",
//     steel: "#B8B8D0",
//     fairy: "#EE99AC",
//     normal: "#A8A878"
// };


// getPokemons(quantidade);

// function getPokemons(quantidade) {
//     fetch(`https://pokeapi.co/api/v2/pokemon?limit=${quantidade}&offset=${offset}`)
//         .then(response => response.json())
//         .then(allpokemon => {
//             let pokeBox = document.querySelector('.poke-box');

//             allpokemon.results.forEach(val => {
//                 fetch(val.url)
//                     .then(response => response.json())
//                     .then(pokemonSingle => {
//                         // Pegando os tipos
//                         let tipos = pokemonSingle.types.map(t => t.type.name);
                        
//                         // Criando HTML do tipo com cor personalizada
//                         let tiposHTML = tipos.map(tipo => {
//                             let corTipo = tipoCores[tipo] || "#A8A878"; // Cor padrão se não encontrar
//                             return `<span style="color: ${corTipo}; font-weight: bold;">${tipo}</span>`;
//                         }).join(", ");

//                         // Criando HTML do Pokémon
//                         let pokemonHTML = `
//                             <div class="poke-box-sgl">
//                                 <div class="poke-img-box">
//                                     <img src="${pokemonSingle.sprites.front_default}">
//                                 </div>
//                                 <p class="name">${capitalize(val.name)}</strong></p>
//                                 <p class="type">${tiposHTML}</p>
//                             </div>
//                         `;
//                         pokeBox.innerHTML += pokemonHTML; // Adiciona o novo Pokémon na tela
//                     });
//             });
//         });

//     offset += quantidade;
// }

// // Função para capitalizar a primeira letra de uma palavra
// function capitalize(str) {
//     return str.charAt(0).toUpperCase() + str.slice(1);
// }

// // Adicionando evento ao botão para carregar mais Pokémon
// document.querySelector('#load-more').addEventListener('click', function() {
//     getPokemons(quantidade);
// });
let quantidade = 3; // Start with 3 Pokémon
let offset = 0; // Começa do primeiro Pokémon

// Cores dos tipos de Pokémon (opcional)
const tipoCores = {
    grass: "#78C850",
    fire: "#F08030",
    water: "#6890F0",
    bug: "#A8B820",
    normal: "#A8A878",
    electric: "#F8D030",
    ground: "#E0C068",
    fairy: "#EE99AC",
    fighting: "#C03028",
    psychic: "#F85888",
    rock: "#B8A038",
    ghost: "#705898",
    ice: "#98D8D8",
    dragon: "#7038F8",
    steel: "#B8B8D0",
    dark: "#705848",
    poison: "#A040A0",
    flying: "#A890F0"
};

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getPokemons(quantidade, isInitialLoad = false) {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${quantidade}&offset=${offset}`)
        .then(response => response.json())
        .then(allpokemon => {
            let pokeBox = document.querySelector('.poke-box');

            allpokemon.results.forEach(val => {
                fetch(val.url)
                    .then(response => response.json())
                    .then(pokemonSingle => {
                        let tipos = pokemonSingle.types.map(t => capitalize(t.type.name)); 

                        let tiposHTML = tipos.map(tipo => {
                            let corTipo = tipoCores[tipo.toLowerCase()] || "#A8A878";
                            return `<span style="color: ${corTipo}; font-weight: bold;">${tipo}</span>`;
                        }).join(", ");

                        let pokemonHTML = document.createElement("div");
                        pokemonHTML.classList.add("poke-box-sgl");

                        // Se for o carregamento inicial, adicionamos a classe inicial (sem animação)
                        if (isInitialLoad) {
                            pokemonHTML.classList.add("initial");
                        }

                        pokemonHTML.innerHTML = `
                            <div class="poke-img-box">
                                <img src="${pokemonSingle.sprites.front_default}">
                            </div>
                            <p class="name">${capitalize(val.name)}</p>
                            <p class="type">${tiposHTML}</p>
                        `;

                        pokeBox.appendChild(pokemonHTML);

                        // Se não for carregamento inicial, aplicar animação
                        if (!isInitialLoad) {
                            setTimeout(() => {
                                pokemonHTML.classList.add("show");
                            }, 100);
                        }
                    });
            });
        });

    offset += quantidade;
}

// 🔹 Carregar os primeiros 3 Pokémon sem animação
getPokemons(3, true);

// 🔹 Evento do botão para carregar mais Pokémon com animação
document.querySelector("#load-more").addEventListener("click", () => {
    getPokemons(3); // Carrega 3 a mais por clique
});
