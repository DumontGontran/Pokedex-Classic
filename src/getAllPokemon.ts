const fetchPokemon = async (id: number) => {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
        createPokemon(data);
    });
}

const fetchPokemons = async (number: number) => {
    for(let i = 1; i <= number; i++) {
        await fetchPokemon(i);
    }
}

const createPokemon = (pokemon: any) => {
    const pokedex = <HTMLElement>document.querySelector('#pokedex');
    const card = <HTMLAnchorElement>document.createElement('a');
    card.classList.add('pokemon-block');
    card.href = 'pokemon.html?id=' + pokemon.id;

    const spriteContainer = <HTMLDivElement>document.createElement('div');
    spriteContainer.classList.add('pokemon-image-container');

    const sprite = <HTMLImageElement>document.createElement('img');
    sprite.src = pokemon.sprites.front_default;

    spriteContainer.appendChild(sprite);

    const id = <HTMLElement>document.createElement('p');
    id.classList.add('pokemon-id');
    id.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = <HTMLElement>document.createElement('p');
    name.classList.add('pokemon-name');
    name.textContent = pokemon.name;

    card.append(spriteContainer, id, name);

    pokedex.appendChild(card);


}

fetchPokemons(151);