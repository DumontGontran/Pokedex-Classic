const fetchPokemon = async (id: number | string) => {

    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((res) => res.json())
        .then((data) => {
            createPokemon(data);
        })
        .catch(() => {
            const pokedex = <HTMLElement>document.querySelector('#pokedex');
            const empty = document.createElement('p');
            empty.textContent = 'No pokemon of this name exists in the pokedex !';
            empty.classList.add('pokedex-empty');
            pokedex.append(empty);
        });
}

const fetchPokemons = async (number: number) => {
    for (let i = 1; i <= number; i++) {
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

document.addEventListener('DOMContentLoaded', () => {
    fetchPokemons(151);
}, false);

document.querySelector('#search')!.addEventListener('change', async (event: any) => {
    event.preventDefault();

    if (event.target.value !== '') {
        event.preventDefault();
        console.log(event.target.value);
        let pokedex = <HTMLElement>document.querySelector('#pokedex');
        pokedex.remove();
        const main = <HTMLElement>document.querySelector('main');
        pokedex = <HTMLDivElement>document.createElement('div');
        pokedex.id = 'pokedex';
        main.appendChild(pokedex);
        return await fetchPokemon(event.target.value);
    }

    event.preventDefault();
    console.log(event.target.value);
    let pokedex = <HTMLElement>document.querySelector('#pokedex');
    pokedex.remove();
    const main = <HTMLElement>document.querySelector('main');
    pokedex = <HTMLDivElement>document.createElement('div');
    pokedex.id = 'pokedex';
    main.appendChild(pokedex);
    await fetchPokemons(151);
});