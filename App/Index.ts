import { Pokemon } from "./Types/Pokemon";

// @ts-ignore
const container: HTMLElement = document.getElementById("app");
// Gives me the document 😀

let numberOfPokemons = 100;
const Upperlimit = 850;
let currentlyRequesting: boolean = false;

async function getPokemon(id: number) {
	const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
	const pokemon: Pokemon = await data.json();

	return pokemon;
}

async function fetchData(start: number, end: number) {
	currentlyRequesting = true;
	for(let i = start; i <= end; i++) {
		if(i > Upperlimit) {
			numberOfPokemons = i - 1;
			break;
		}
		const poke = await getPokemon(i);
		container.innerHTML += `
					<div>
						<h3>${poke.name.replace(/-/g, " ").split(" ").map(str => str.split("")[0].toUpperCase() + str.slice(1)).join(" ")}(${poke.id})</h3>
						<img src="${poke.sprites.front_default}">
					</div>
				`;
	}
	currentlyRequesting = false;
}

// eslint-disable-next-line no-unused-vars
async function LoadMore() {
	if(currentlyRequesting) return alert("Pokemons are currently being loaded, please wait for them to finish, to load more!");

	await fetchData(numberOfPokemons + 1, numberOfPokemons + 100);

	numberOfPokemons += 100;

	if(numberOfPokemons >= Upperlimit) {
		const button = document.getElementById("loadmore");

		button?.remove();
		console.log(document.getElementById("loadmore"));
	}
}

fetchData(1, 100);