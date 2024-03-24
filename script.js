const url = 'https://pokeapi.co/api/v2/pokemon/';
const resultElement = document.getElementById('result');
const searchElement = document.getElementById('search');
const submitElement = document.getElementById('submit');
let elmentCount = 15;
let firstElementNumber = 1;
const pokemonList = document.getElementById("pokemon_list");
const xhr = new XMLHttpRequest();
const btnNext = document.getElementById("next_page");
const btnBack = document.getElementById("back_page");
const count = document.getElementById("count");

const btnpyat = document.getElementById("b15");
const btntri = document.getElementById("b30");
const btnshes = document.getElementById("b60");

submitElement.addEventListener('click', function (event) {
    search(searchElement.value);
})

function search(pockemonName) {
    xhr.open('GET', url + pockemonName.toLowerCase());
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function () {
        let pokemon = xhr.response;
        drawPokemon(pokemon);


    }
}

function drawPokemon(pokemon) {
    resultElement.innerHTML = '';
    let pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon');
    pokemonElement.innerHTML = `
        <p>id: #${pokemon.id}</p>
        <hr>
        <h1>${pokemon.name}</h1>
        <img src="${pokemon.sprites.front_default}">
    `

    let typeList = document.createElement('ul');
    populateListWithTypes(pokemon.types, typeList)
    pokemonElement.appendChild(typeList);

    resultElement.appendChild(pokemonElement);
}

function populateListWithTypes(types, ul) {
    types.forEach(function (type) {
        let typeItem = document.createElement('li');
        typeItem.innerText = type.type.name;
        ul.appendChild(typeItem);
    });
}



function pagination() {
    pokemonList.innerHTML = "";
    for (let i = firstElementNumber; i < firstElementNumber + elmentCount; i++) {
        let request = new XMLHttpRequest;
        request.open("GET", url + i);
        request.responseType = 'json';
        request.send();

        request.onload = () => {
            const pokemon = request.response;
            const name = pokemon.name;
            console.log(name);
            let element = document.createElement("li");
            element.innerHTML = name;
            element.addEventListener('click', () => { search(element.innerHTML) });
            pokemonList.append(element);


        }
    }

    count.innerHTML = `${firstElementNumber}-${firstElementNumber + elmentCount - 1}`;



}
pagination();


btnNext.addEventListener("click", () => {
    if (firstElementNumber + elmentCount <= 1017) {
        firstElementNumber += elmentCount;
        pagination();
    }

});
btnBack.addEventListener("click", () => {
    if (firstElementNumber + elmentCount > elmentCount + 1) {
        firstElementNumber -= elmentCount;
        pagination();
    }

});

btnpyat.addEventListener("click", () => {

    if (elmentCount != 15) {
        elmentCount = 15;
        pagination();
    }


});


btntri.addEventListener("click", () => {

    if (elmentCount != 30) {
        elmentCount = 30;
        pagination();
    }


});


btnshes.addEventListener("click", () => {

    if (elmentCount != 60) {
        elmentCount = 60;
        pagination();
    }


});
