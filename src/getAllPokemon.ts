const fetchPokemon = async (id: number | string): Promise<void> => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const data = await response.json();

        if (id < 1 || id > 151 || data.id < 1 || data.id > 151) {
            throw new Error('This pokemon doesn\'t exists in the pokedex !');
        } else {
            createPokemon({ pokemon: data });
        }

    } catch (err: any) {
        const pokedex = document.querySelector('#pokedex') as HTMLElement;
        const empty = document.createElement('p') as HTMLParagraphElement;
        empty.textContent = 'This pokemon doesn\'t exists in the pokedex !';
        empty.classList.add('pokedex-empty');
        pokedex.append(empty);
    }
}

const fetchPokemons = async (number: number): Promise<void> => {
    for (let i = 1; i <= number; i++) {
        await fetchPokemon(i);
    }
}

const createPokemon = ({ pokemon }:
    {
        pokemon: {
            id: number;
            name: string;
            sprites: any
        }
    }) => {
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

    const id = document.createElement('p') as HTMLParagraphElement;
    id.classList.add('pokemon-id');
    id.textContent = `#${pokemon.id.toString().padStart(3, String(0))}`;

    const name = document.createElement('p') as HTMLParagraphElement;
    name.classList.add('pokemon-name');
    name.textContent = pokemon.name;

    card.append(spriteContainer, id, name);

    pokedex?.appendChild(card);
}

document.addEventListener('DOMContentLoaded', async () => {
    await fetchPokemons(151);
}, false);

document.querySelector('.search-button')?.addEventListener('click', async (event: any) => {
    event.preventDefault();

    const search = document.querySelector('#search') as HTMLInputElement;
    let pokemonName: string | number = search.value;

    let pokedex = document.querySelector('#pokedex') as HTMLDivElement;
    pokedex.remove();
    const main = document.querySelector('main') as HTMLElement;
    pokedex = document.createElement('div') as HTMLDivElement;
    pokedex.id = 'pokedex';
    main.appendChild(pokedex);

    if (pokemonName !== '') {
        return await fetchPokemon(pokemonName);
    }

    await fetchPokemons(151);
});

document.querySelector('.search-clean')?.addEventListener('click', async (event: any) => {
    event.preventDefault();

    let pokedex = document.querySelector('#pokedex') as HTMLDivElement;
    pokedex.remove();
    const main = document.querySelector('main') as HTMLElement;
    pokedex = document.createElement('div') as HTMLDivElement;
    pokedex.id = 'pokedex';
    main.appendChild(pokedex);

    await fetchPokemons(151);
});