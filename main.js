const catchPokemon = document.querySelector(".pokemon__btn");
const pokemonBlock = document.querySelector(".pokemon__block");
const pokemonInfo = document.querySelector(".pokemon__info");
const addBtn = document.getElementById("add__btn");
const removeBtn = document.getElementById("remove__btn");
const favoritesBtn = document.getElementById("favorites__btn");

const pokemonCount = 300;
const pokedex = {};
let currentPokemon;

catchPokemon.addEventListener("click", async () => {
  pokemonBlock.style.display = "flex";

  if (catchPokemon.classList.contains("clicked")) {
    location.reload();
  }
  catchPokemon.classList.toggle("clicked");
  catchPokemon.innerText = "Clear pokedex!";

  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);
    let pokemon = document.createElement("div");
    pokemon.id = i;
    pokemon.innerText = pokedex[i]["name"].toUpperCase();
    pokemon.classList.add("pokemon__name");
    pokemon.addEventListener("click", updatePokemon);
    document.querySelector(".pokemon__list").append(pokemon);
  }
});

addBtn.addEventListener("click", () => {
  setItem(currentPokemon.name, currentPokemon);
  removeBtn.style.display = "block";
  addBtn.style.display = "none";
});

removeBtn.addEventListener("click", () => {
  removeItem(currentPokemon.name);
  removeBtn.style.display = "none";
  addBtn.style.display = "block";
});

favoritesBtn.addEventListener("click", () => {
  location.href = "./favorites/index.html";
});

async function getPokemon(num) {
  let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

  let res = await fetch(url);
  let pokemon = await res.json();
  let pokemonName = pokemon["name"];
  let pokemonType = pokemon["types"];
  let pokemonImg = pokemon["sprites"]["front_default"];
  res = await fetch(pokemon["species"]["url"]);
  let pokemonDesc = await res.json();

  pokemonDesc = pokemonDesc["flavor_text_entries"][9]["flavor_text"];

  pokedex[num] = {
    name: pokemonName,
    img: pokemonImg,
    types: pokemonType,
    desc: pokemonDesc,
  };
}

function updatePokemon() {
  currentPokemon = pokedex[this.id];
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
    addBtn.style.display = "none";
    removeBtn.style.display = "block";
  } else {
    removeBtn.style.display = "none";
    addBtn.style.display = "block";
  }
}

function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function removeItem(key) {
  localStorage.removeItem(key);
}

function containItem(key) {
  if (!localStorage.getItem(key)) {
    return false;
  }
  return true;
}
