const fetchOnePokemonDescription = async () => {
    const params = new URLSearchParams(document.location.search);
    const id: number = Number(params.get('id'));

    await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        createOnePokemonDescription(data);
    });
}

const createOnePokemonDescription = (pokemonDescription: any) => {
    const article = <HTMLElement>document.querySelector('article');

    const description = <HTMLElement>document.createElement('p');
    description.classList.add('pokemon-description');
    description.textContent = `Description: ${pokemonDescription.flavor_text_entries[1].flavor_text}`;

    article.appendChild(description);
}

fetchOnePokemonDescription();