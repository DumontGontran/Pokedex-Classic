const createNavigationPokemon = async () => {
    const card = document.querySelector('.pokemon-block') as HTMLElement;
    const arrowLeft = document.createElement('i') as HTMLElement;
    arrowLeft.classList.add('fas', 'fa-arrow-circle-left');

    const arrowRight = document.createElement('i') as HTMLElement;
    arrowRight.classList.add('fas', 'fa-arrow-circle-right');

    card.append(arrowLeft, arrowRight);

    const params = new URLSearchParams(document.location.search);
    let id = Number(params.get('id'));

    if (id === 1) {
        arrowLeft.style.visibility = 'hidden';
        arrowLeft.style.pointerEvents = 'none';
    }
    if (id === 151) {
        arrowRight.style.visibility = 'hidden';
        arrowRight.style.pointerEvents = 'none';
    }

    arrowLeft.addEventListener('click', async (event: MouseEvent) => {
        event.preventDefault();

        id = Number(params.get('id')) - 1;

        if (id >= 1) {
            card.style.opacity = '0';
            card.style.transition = 'opacity 1000ms ease-in-out';
            setTimeout(() => {
                window.location.href = 'pokemon.html?id=' + id;
            }, 1000);
        }
    });

    arrowRight.addEventListener('click', async (event: MouseEvent) => {
        event.preventDefault();

        id = Number(params.get('id')) + 1;
        if (id <= 151) {
            card.style.opacity = '0';
            card.style.transition = 'opacity 1000ms ease-in-out';
            setTimeout(() => {
                window.location.href = 'pokemon.html?id=' + id;
            }, 1000);
        }
    });
}