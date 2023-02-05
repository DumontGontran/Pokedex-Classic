const createNavigationPokemon = async () => {
    const card = <HTMLElement>document.querySelector('.pokemon-block');
    const arrowLeft = <HTMLElement>document.createElement('i');
    arrowLeft.classList.add('fas', 'fa-arrow-circle-left');

    const arrowRight = <HTMLElement>document.createElement('i');
    arrowRight.classList.add('fas', 'fa-arrow-circle-right');

    card.append(arrowLeft, arrowRight);
    navigate();
}

const navigate = () => {
    const arrowLeft = <HTMLElement>document.querySelector('.fa-arrow-circle-left');
    arrowLeft.addEventListener('click', async (event: MouseEvent) => {
        event.preventDefault();

        const params = new URLSearchParams(document.location.search);
        let id = Number(params.get('id')) - 1;
        window.location.href = 'pokemon.html?id=' + id;
    });

    const arrowRight = <HTMLElement>document.querySelector('.fa-arrow-circle-right');
    arrowRight.addEventListener('click', async (event: MouseEvent) => {
        event.preventDefault();

        const params = new URLSearchParams(document.location.search);
        let id = Number(params.get('id')) + 1;
        window.location.href = 'pokemon.html?id=' + id;
    });
}