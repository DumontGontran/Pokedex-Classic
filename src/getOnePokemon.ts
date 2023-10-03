const fetchOnePokemon = async (): Promise<void> => {
    try {
        const params = new URLSearchParams(document.location.search);
        const id: number = Number(params.get('id'));

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const data: Pokemon = await response.json();

        if (id < 1 || id > 151) {
            throw new Error('This pokemon doesn\'t exists in the pokedex !');
        } else {
            createOnePokemon({ pokemon: data });
        }

    } catch (err: unknown) {
        const pokedex = document.querySelector('#pokedex') as HTMLElement;
        const empty = document.createElement('p') as HTMLParagraphElement;
        empty.textContent = 'This pokemon doesn\'t exists in the pokedex !';
        empty.classList.add('pokedex-empty');
        pokedex.append(empty);
    }
}

const createOnePokemon = ({ pokemon }: { pokemon: Pokemon }) => {
    const pokedex = document.querySelector('#pokedex') as HTMLDivElement;
    const card = document.createElement('article') as HTMLElement;
    card.classList.add('pokemon-block');

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

    const types = document.createElement('p') as HTMLParagraphElement;
    types.classList.add('pokemon-types');
    types.textContent = `Main type: ${pokemon.types[0].type.name}`;

    const abilities = document.createElement('p') as HTMLParagraphElement;
    abilities.classList.add('pokemon-abilities');
    abilities.textContent = `Main ability: ${pokemon.abilities[0].ability.name}`;

    const height = document.createElement('p') as HTMLParagraphElement;
    height.classList.add('pokemon-height');
    height.textContent = `Height: ${pokemon.height}`;

    const weight = document.createElement('p') as HTMLParagraphElement;
    weight.classList.add('pokemon-weight');
    weight.textContent = `Weight: ${pokemon.weight}`;

    card.append(spriteContainer, id, name, types, abilities, height, weight);

    pokedex.appendChild(card);
    createNavigationPokemon();
}

fetchOnePokemon();