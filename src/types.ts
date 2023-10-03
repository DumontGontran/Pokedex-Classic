type Pokemon = {
    id: number;
    name: string;
    sprites: {
        sprites: string;
        front_default: string;
    };
    types: any;
    abilities: any;
    height: string;
    weight: string;
}

type PokemonDescription = {
    flavor_text_entries: any;
    color: {
        color: string;
        name: string;
    };
    habitat: {
        habitat: string;
        name: string;
    };
    growth_rate: {
        growth_rate: string;
        name: string;
    };
    evolves_from_species: {
        evolves_from_species: string;
        name: string;
    }
}