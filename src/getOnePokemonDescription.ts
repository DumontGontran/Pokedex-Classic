const fetchOnePokemonDescription = async (): Promise<void> => {
    const params = new URLSearchParams(document.location.search);
    const id: number = Number(params.get('id'));

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
    const data = await response.json();

    createOnePokemonDescription(data);
} 

const createOnePokemonDescription = (pokemonDescription: any) => {
    const article = document.querySelector('article') as HTMLElement;

    const description = document.createElement('p') as HTMLElement;
    description.classList.add('pokemon-description');
    description.textContent = `Description: This pokemon, ${pokemonDescription.flavor_text_entries[1].flavor_text}`;
    description.style.color = pokemonDescription.color.name;

    const habitat = document.createElement('p') as HTMLElement;
    habitat.classList.add('pokemon-habitat');
    habitat.textContent = `Habitat: ${pokemonDescription.habitat.name}`;
    habitat.style.color = pokemonDescription.color.name;

    const growthRate = document.createElement('p') as HTMLElement;
    growthRate.classList.add('pokemon-growthrate');
    growthRate.textContent = `Growth rate: ${pokemonDescription.growth_rate.name}`;

    const evolvedFrom = document.createElement('p') as HTMLElement;
    evolvedFrom.classList.add('pokemon-evolutions');
    evolvedFrom.textContent = pokemonDescription.evolves_from_species ?
        `Evolves form from: ${pokemonDescription.evolves_from_species.name}` : 'Not evolved form';

    article.append(description, habitat, growthRate, evolvedFrom);
}

fetchOnePokemonDescription();