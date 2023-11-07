// Variables
const nameInput = document.getElementById("name-input");
const searchBtn = document.getElementById("search-btn");
const addBtn = document.getElementById("add-btn");
const tableBody = document.getElementById("table-body");
const cancelBtn = document.getElementById("cancel-btn");
let pokemons = JSON.parse(localStorage.getItem("pokemons")) || [];
let currentPokemonId = null;
//const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Functions
function renderTable() {
  tableBody.innerHTML = "";
  for (let i = 0; i < pokemons.length; i++) {
    const pokemon = pokemons[i];
    const tr = document.createElement("tr");
    const idTd = document.createElement("td");
    const nameTd = document.createElement("td");
    const weightTd = document.createElement("td");
    const actionsTd = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    idTd.innerText = pokemon.id;
    nameTd.innerText = pokemon.name;
    weightTd.innerText = pokemon.weight;
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => {
      deletePokemon(pokemon.id);
    });
    actionsTd.appendChild(editBtn);
    actionsTd.appendChild(deleteBtn);
    tr.appendChild(idTd);
    tr.appendChild(nameTd);
    tr.appendChild(weightTd);
    tr.appendChild(actionsTd);
    tableBody.appendChild(tr);
  }
}
//Searches pokemon and logs response
async function searchPokemon() {
  const name = nameInput.value.trim();
  let url = 'https://pokeapi.co/api/v2/pokemon/' + name + '/';

  let response = await fetch(url);
  let data = await response.json()
  console.log(typeof data)


  console.log(data.name)
  return data;



}
searchPokemon().then(data => console.log(data));

async function addPokemon() {

  let pokemondata = await searchPokemon();
  console.log(pokemondata.weight)
  const name = nameInput.value.trim();
    if(name != null){

      const pokemon = {
        id: pokemondata.id,
        name: pokemondata.name,
        weight: pokemondata.weight,
        sprite: pokemondata.sprites.front_default,
      };
      pokemons.push(pokemon);
      localStorage.setItem("pokemons", JSON.stringify(pokemons));
      nameInput.value = "";
      renderTable();
  }
  else{
    alert("Invalid Pokemon name!");
  }
}


function deletePokemon(pokemonId) {
  pokemons = pokemons.filter((pokemon) => pokemon.id !== pokemonId);
  localStorage.setItem("pokemons", JSON.stringify(pokemons));
  if (pokemons.length == 0){
    hideUpdateForm();
  };
  renderTable();
}

// Event Listeners
searchBtn.addEventListener("click", searchPokemon);
addBtn.addEventListener("click", addPokemon);

// Initialize table
renderTable();