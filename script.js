console.log("working");
const Api = "https://pokeapi.co/api/v2/pokemon/";
const container = document.getElementById("container");
const selectVals = document.getElementById("selectVals");
const pokemonName = document.getElementById("pokemonName");

const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  dark: "#8A8A8A",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
  steel: "#71797E",
};

// console.log(typeColor.ghost);

function onloadFunction() {
  const promises = [];
  for (let i = 1; i <= 200; i++) {
    promises.push(
      fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`).then((res) => res.json())
    );
  }

  // console.log(promises);

  return Promise.all(promises);
}

let pokArr = [];
// let typeArr = [];

const showCards = (pok) => {
  container.innerHTML = "";

  pok.forEach((ele) => {
    let div = document.createElement("div");
    div.classList.add("pokemonContainer");

    let pokName = ele.name;
    pokName = pokName.charAt(0).toUpperCase() + pokName.slice(1);
    // console.log(pokName);
    let type = ele.types[0].type.name;

    div.innerHTML = `
      <p class="hp">HP <span>${ele.stats[0].base_stat}</span></p>
      <img src="${ele.sprites.other.dream_world.front_default}"/>
      <h1>${pokName}</h1>
      <p style="text-transform:capitalize; background-color: ${typeColor[type]}; padding: 5px; border-radius: 5px">${type}</p>

      <div class="lowerDiv">
        <div>
          <p>${ele.stats[1].base_stat}</p>
          <p>${ele.stats[1].stat.name}</p>
        </div>
        <div>
          <p>${ele.stats[2].base_stat}</p>
          <p>${ele.stats[2].stat.name}</p>
        </div>
        <div>
          <p>${ele.stats[5].base_stat}</p>
          <p>${ele.stats[5].stat.name}</p>
        </div>
      </div>
      `;

    div.style.background = `radial-gradient(circle at 50% 0%, ${typeColor[type]} 36%, #ffffff 36%)`;

    container.appendChild(div);
  });
};

// // Usage
onloadFunction()
  .then(async (pokemonCard) => {
    pokArr = await pokemonCard;

    showCards(pokArr);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

document.getElementById("typeFilter").addEventListener("change", () => {
  let value = document.getElementById("typeFilter").value;
  console.log(value);
  showData(value);
});

const showData = (val) => {
  if (val == "All") {
    showCards(pokArr);
  } else {
    let filteredArr = pokArr.filter((ele) => ele.types[0].type.name == val);
    console.log(filteredArr);
    showCards(filteredArr);
  }
};

pokemonName.addEventListener("input", () => {
  let value = pokemonName.value;
  value = value.toLowerCase();
  let filteredArr = pokArr.filter((ele) => {
    return ele.name.includes(value);
  });
  showCards(filteredArr);
});

// console.log(promises, "Wokring");
