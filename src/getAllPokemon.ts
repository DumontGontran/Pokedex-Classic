const fetchPokemon = async (id: number | string): Promise<void> => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const data = await response.json();
        createPokemon(data);
    } catch (err) {
        const pokedex = document.querySelector('#pokedex') as HTMLElement;
        const empty = document.createElement('p');
        empty.textContent = 'No pokemon of this name exists in the pokedex !';
        empty.classList.add('pokedex-empty');
        pokedex.append(empty); 
    } 
} 

const fetchPokemons = async (number: number): Promise<void> => {
    for (let i = 1; i <= number; i++) {
        await fetchPokemon(i);
    }
}

const createPokemon = (pokemon: any) => {
    const pokedex = document.querySelector('#pokedex') as HTMLElement;
    const card = document.createElement('a') as HTMLAnchorElement;
    card.classList.add('pokemon-block');
    card.href = `pokemon.html?id=${pokemon.id}`;

    const spriteContainer = document.createElement('div') as HTMLDivElement;
    spriteContainer.classList.add('pokemon-image-container');

    const sprite = document.createElement('img') as HTMLImageElement;
    sprite.src = pokemon.sprites.front_default;
    sprite.alt = pokemon.name;

    spriteContainer.appendChild(sprite);

    const id = document.createElement('p') as HTMLElement;
    id.classList.add('pokemon-id');
    id.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement('p') as HTMLElement;
    name.classList.add('pokemon-name');
    name.textContent = pokemon.name;

    card.append(spriteContainer, id, name);

    pokedex?.appendChild(card);
} 

document.addEventListener('DOMContentLoaded', async () => {
    await fetchPokemons(151);
}, false);

document.querySelector('#search')!.addEventListener('change', async (event: any) => {
    event.preventDefault();

    let pokedex = document.querySelector('#pokedex') as HTMLElement;
    pokedex.remove();
    const main = document.querySelector('main') as HTMLElement;
    pokedex = document.createElement('div') as HTMLDivElement;
    pokedex.id = 'pokedex';
    main.appendChild(pokedex);

    if (event.target.value !== '') {
        console.log(event.target.value);
        return await fetchPokemon(event.target.value);
    }

    console.log(event.target.value);    
    await fetchPokemons(151); 
}); 