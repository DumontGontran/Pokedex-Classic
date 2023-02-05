const fetchOnePokemonDescription = async () => {
    const params = new URLSearchParams(document.location.search);
    const id: number = Number(params.get('id'));

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
    const data = await response.json();

    console.log(data);
    createOnePokemonDescription(data);
} 

const createOnePokemonDescription = (pokemonDescription: any) => {
    const article = <HTMLElement>document.querySelector('article');

    const description = <HTMLElement>document.createElement('p');
    description.classList.add('pokemon-description');
    description.textContent = `Description: This pokemon, ${pokemonDescription.flavor_text_entries[1].flavor_text}`;
    description.style.color = pokemonDescription.color.name;

    const habitat = <HTMLElement>document.createElement('p');
    habitat.classList.add('pokemon-habitat');
    habitat.textContent = `Habitat: ${pokemonDescription.habitat.name}`;
    habitat.style.color = pokemonDescription.color.name;

    const growthRate = <HTMLElement>document.createElement('p');
    growthRate.classList.add('pokemon-growthrate');
    growthRate.textContent = `Growth rate: ${pokemonDescription.growth_rate.name}`;

    const evolvedFrom = <HTMLElement>document.createElement('p');
    evolvedFrom.classList.add('pokemon-evolutions');
    evolvedFrom.textContent = pokemonDescription.evolves_from_species ?
        `Evolves form from: ${pokemonDescription.evolves_from_species.name}` : 'Not evolved form';

    article.append(description, habitat, growthRate, evolvedFrom);
}

fetchOnePokemonDescription();