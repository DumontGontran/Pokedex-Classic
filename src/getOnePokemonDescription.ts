const fetchOnePokemonDescription = async (): Promise<void> => {
    try {
        const params = new URLSearchParams(document.location.search);
        const id: number = Number(params.get('id'));

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
        const data = await response.json();
        if (id < 1 || id > 151) {
            throw new Error('');
        } else {
        createOnePokemonDescription({ pokemonDescription: data });
        }
    }
    catch (err: any) {
        const pokedex = document.querySelector('#pokedex') as HTMLElement;
        const empty = document.createElement('p') as HTMLParagraphElement;
        empty.textContent = '';
        empty.classList.add('pokedex-empty');
        pokedex.append(empty);
    }
}

const createOnePokemonDescription = ({ pokemonDescription }:
    {
        pokemonDescription:
        {
            flavor_text_entries: any;
            color: {
                color: string;
                name: string
            };
            habitat: {
                habitat: string;
                name: string
            };
            growth_rate: {
                growth_rate: string;
                name: string
            };
            evolves_from_species: {
                evolves_from_species: string;
                name: string
            }
        }
    }) => {
    const article = document.querySelector('article') as HTMLElement;

    const description = document.createElement('p') as HTMLParagraphElement;
    description.classList.add('pokemon-description');
    description.textContent = `Description: This pokemon, ${pokemonDescription.flavor_text_entries[1].flavor_text}`;
    description.style.color = pokemonDescription.color.name;

    const habitat = document.createElement('p') as HTMLParagraphElement;
    habitat.classList.add('pokemon-habitat');
    habitat.textContent = `Habitat: ${pokemonDescription.habitat.name}`;
    habitat.style.color = pokemonDescription.color.name;

    const growthRate = document.createElement('p') as HTMLParagraphElement;
    growthRate.classList.add('pokemon-growthrate');
    growthRate.textContent = `Growth rate: ${pokemonDescription.growth_rate.name}`;

    const evolvedFrom = document.createElement('p') as HTMLParagraphElement;
    evolvedFrom.classList.add('pokemon-evolutions');
    evolvedFrom.textContent = pokemonDescription.evolves_from_species ?
        `Evolves form from: ${pokemonDescription.evolves_from_species.name}` : 'Not evolved form';

    article.append(description, habitat, growthRate, evolvedFrom);
}

fetchOnePokemonDescription();