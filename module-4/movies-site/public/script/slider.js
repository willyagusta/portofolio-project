document.addEventListener ('DOMContentLoaded', () => {
    const slider = document.querySelector ('.inner-slider');
    const next = document.querySelector('.next');
    const prev = document.querySelector ('.prev');
    let index = 0;

    next.addEventListener ('click', () => {
        if (index < 2) {
            index++;
        } else {
            index = 0;
        }
        slider.style.transform = `translateX(-${index * 100}%)`;
    });

    prev.addEventListener ('click', () => {
        if (index > 0) {
            index--;
        } else {
            index = 2;
        }
        slider.style.transform = `translateX(-${index * 100}%)`;
    });
});