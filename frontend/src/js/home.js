const carousel = document.getElementById('carousel');
const items = carousel.querySelectorAll('.carousel-item');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentIndex = 0;
const intervalTime = 6000;

function showItem(index) {
    items.forEach((item, i) => {
        item.style.display = i === index ? 'block' : 'none';
    });
}

function nextItem() {
    currentIndex = (currentIndex + 1) % items.length;
    showItem(currentIndex);
}

function prevItem() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showItem(currentIndex);
}

nextButton.addEventListener('click', nextItem);
prevButton.addEventListener('click', prevItem);

showItem(currentIndex);

setInterval(nextItem, intervalTime);