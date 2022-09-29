const catchPokemon = document.querySelector(".pokemon__btn");
const pokemonBlock = document.querySelector(".pokemon__block");
const pokemonInfo = document.querySelector(".pokemon__info");
const removeBtn = document.getElementById("remove__btn");
const favoritesBtn = document.getElementById("favorites__btn");

const pokemonCount = 300;
const pokedex = {};
let currentPokemon;

window.onload = () => {
  pokemonBlock.style.display = "flex";
  for (let i = 0; i < Object.keys(localStorage).length; i++) {
    getPokemon(i);
    let pokemon = document.createElement("div");
    pokemon.id = i;
    pokemon.innerText = pokedex[i]["name"].toUpperCase();
    pokemon.classList.add("pokemon__name");
    pokemon.addEventListener("click", updatePokemon);
    document.querySelector(".pokemon__list").append(pokemon);
  }
  if (Object.keys(pokedex).length === 0) {
    pokemonBlock.style.display = "none";
  }
};

catchPokemon.addEventListener("click", () => {
  location.href = "./../index.html";
});

removeBtn.addEventListener("click", () => {
  removeItem(currentPokemon.name);
  removeBtn.style.display = "none";
  document.getElementById(`${currentPokemon.id}`).remove();
  delete pokedex[currentPokemon.id];
  pokemonInfo.style.display = "none";
  if (Object.keys(pokedex).length === 0) {
    pokemonBlock.style.display = "none";
  }
});

function getPokemon(num) {
  let pokemon = getItem(num);
  let pokemonName = pokemon["name"];
  let pokemonType = pokemon["types"];
  let pokemonImg = pokemon["img"];
  let pokemonDesc = pokemon["desc"];

  pokedex[num] = {
    name: pokemonName,
    img: pokemonImg,
    types: pokemonType,
    desc: pokemonDesc,
  };
}

function updatePokemon() {
  currentPokemon = pokedex[this.id];
  currentPokemon.id = this.id;
  pokemonInfo.style.display = "block";
  document.getElementById("pokemon-img").src = pokedex[this.id]["img"];

  //clear previous type
  let typesDiv = document.querySelector(".pokemon__types");
  while (typesDiv.firstChild) {
    typesDiv.firstChild.remove();
  }

  //update types
  let types = pokedex[this.id]["types"];
  for (let i = 0; i < types.length; i++) {
    let type = document.createElement("span");
    type.innerText = types[i]["type"]["name"].toUpperCase();
    type.classList.add("type-box");
    type.classList.add(types[i]["type"]["name"]); //adds background color and font color
    typesDiv.append(type);
  }

  //update description
  document.querySelector(".pokemon__description").innerText =
    pokedex[this.id]["desc"];

  if (containItem(currentPokemon.name)) {
    removeBtn.style.display = "block";
  } else {
    removeBtn.style.display = "none";
  }
}

function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function removeItem(key) {
  localStorage.removeItem(key);
}

function getItem(index) {
  return JSON.parse(localStorage.getItem(Object.keys(localStorage)[index]));
}

function containItem(key) {
  if (!localStorage.getItem(key)) {
    return false;
  }
  return true;
}
