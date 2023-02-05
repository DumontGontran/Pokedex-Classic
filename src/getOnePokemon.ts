const fetchOnePokemon = async () => {
    const params = new URLSearchParams(document.location.search);
    const id: number = Number(params.get('id'));

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await response.json();

    console.log(data);
    createOnePokemon(data);
}

const createOnePokemon = (pokemon: any) => {
    const pokedex = <HTMLElement>document.querySelector('#pokedex');
    const card = <HTMLElement>document.createElement('article');
    card.classList.add('pokemon-block');

    const spriteContainer = <HTMLDivElement>document.createElement('div');
    spriteContainer.classList.add('pokemon-image-container');
    
    const sprite = <HTMLImageElement>document.createElement('img');
    sprite.src = pokemon.sprites.front_default;
    sprite.alt = pokemon.name;

    spriteContainer.appendChild(sprite);

    const id = <HTMLElement>document.createElement('p');
    id.classList.add('pokemon-id');
    id.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = <HTMLElement>document.createElement('p');
    name.classList.add('pokemon-name');
    name.textContent = pokemon.name;

    const types = <HTMLElement>document.createElement('p');
    types.classList.add('pokemon-types');
    types.textContent = `Main type: ${pokemon.types[0].type.name}`;

    const abilities = <HTMLElement>document.createElement('p');
    abilities.classList.add('pokemon-abilities');
    abilities.textContent = `Main ability: ${pokemon.abilities[0].ability.name}`;

    const height = <HTMLElement>document.createElement('p');
    height.classList.add('pokemon-height');
    height.textContent = `Height: ${pokemon.height}`;

    const weight = <HTMLElement>document.createElement('p');
    weight.classList.add('pokemon-weight');
    weight.textContent = `Weight: ${pokemon.weight}`;

    card.append(spriteContainer, id, name, types, abilities, height, weight);

    pokedex.appendChild(card);
    createNavigationPokemon();
}

fetchOnePokemon();