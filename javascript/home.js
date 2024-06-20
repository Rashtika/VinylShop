const itemsGrid = document.querySelector('.items-grid');
const selectPrice = document.getElementById('select-price');
const selectAlbum = document.getElementById('select-album');
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

let items = [
    {
        id: 1,
        band: 'PRETENDERS',
        album: 'LERNING TO CRAWL',
        genre: 'rock',
        price: 21.99,
        tag: 'pretendl1',
    },
    {
        id: 2,
        band: 'BON JOVI',
        album: 'FOREVER ',
        genre: 'rock',
        price: 29.99,
        tag: 'bozovi',
    },
    {
        id: 3,
        band: 'TWENTY ONE PILOTS',
        album: 'CLANCY',
        genre: 'alternative rock',
        price: 27.99,
        tag: 'klenlpb',
    },
    {
        id: 4,
        band: 'DJ SNEAK',
        album: 'GALACTIC FUNK',
        genre: 'house',
        price: 16.99,
        tag: 'dj-sneak-galactic-funk-ep',
    },
    {
        id: 5,
        band: 'AC/DC',
        album: 'BALLBREAKER',
        genre: 'hard rock',
        price: 19.99,
        tag: 'ballbreaker',
    },
    {
        id: 6,
        band: 'DIO',
        album: 'LOCK UP THE WOLVES',
        genre: 'heavy metal',
        price: 19.99,
        tag: '2-._SL1200_-600x600',
    },
    {
        id: 7,
        band: '2PAC',
        album: 'ALL EYEZ ON ME',
        genre: 'hip hop/rap',
        price: 39.99,
        tag: 'R-11775641-1526122636-9482',
    },
    {
        id: 8,
        band: '50 CENT',
        album: 'GET RICH OR DIE TRYIN’',
        genre: 'hip hop/rap',
        price: 41.99,
        tag: '50C-600x600',
    },
    {
        id: 9,
        band: 'ABBA',
        album: 'ALBUM',
        genre: 'pop',
        price: 24.99,
        tag: 'abaalbum-600x600',
    },
    {
        id: 10,
        band: 'AC/DC',
        album: '’74 JAILBREAK',
        genre: 'hard rock',
        price: 19.99,
        tag: 'ac-7',
    },
]

function fillItemsGrid() {
    const itemsGrid = document.querySelector('.items-grid');
    if (itemsGrid) {
        for (const item of items) {
            let itemElement = document.createElement('div');
            itemElement.classList.add('item');
            let imagePath = `../image/${item.tag}.jpg`;
            console.log(`Image path for ${item.album}: ${imagePath}`); // Log the image path
            itemElement.innerHTML = `
                <img src="../image/${item.tag}.jpg" alt="${item.album}">
                <h1>${item.album}</h1>
                <p>${item.price} €</p>`;
            itemsGrid.appendChild(itemElement);
        }
    }
}


function sortByAlphabeticalAscending() {
    items.sort((a, b) => a.album.localeCompare(b.album));
    updateItemsGrid();
}

function sortByAlphabeticalDescending() {
    items.sort((a, b) => b.album.localeCompare(a.album));
    updateItemsGrid();
}

function sortByPriceAscending(items) {
    items.sort((a, b) => a.price - b.price);
    updateItemsGrid();
}

function sortByPriceDescending(items) {
    items.sort((a, b) => b.price - a.price);
    updateItemsGrid();
}

function updateItemsGrid() {
    itemsGrid.innerHTML = '';
    fillItemsGrid();
}

let originalItems = [...items];

function resetItemsGrid() {
    items = [...originalItems];
    updateItemsGrid();
    if (selectedSortOption !== '') {
        sortItemsAlphabeticalAndUpdateGrid();
    } else {
        updateItemsGrid();
    }
}

function searchItems() {
    const searchInputValue = searchInput.value.trim().toLowerCase();
    if (searchInputValue === '') {
        resetItemsGrid();
        return;
    }

    const filteredItems = items.filter(item => item.album.toLowerCase().includes(searchInputValue));
    items = filteredItems;
    updateItemsGrid();

    const itemTitles = document.querySelectorAll('.item h1');
    itemTitles.forEach(title => {
        const originalText = title.textContent;
        const markedText = originalText.replace(new RegExp(`(${searchInputValue})`, 'gi'), '<span class="highlight">$1</span>');
        title.innerHTML = markedText;
    });
}

let selectedSortOption = '';

function sortItemsAlphabeticalAndUpdateGrid() {
    const selectedValue = selectAlbum.value;
    selectedSortOption = selectedValue;
    if (selectedValue === 'AtoZ') {
        sortByAlphabeticalAscending();
    } else if (selectedValue === 'ZtoA') {
        sortByAlphabeticalDescending();
    } else {
        resetItemsGrid();
    }
}

function sortItemsByPriceAndUpdateGrid() {
    const selectedValue = selectPrice.value;
    selectedSortOption = selectedValue;
    if (selectedValue === 'LowToHigh') {
        sortByPriceAscending(items);
    } else if (selectedValue === 'HighToLow') {
        sortByPriceDescending(items);
    } else {
        resetItemsGrid();
    }
}


fillItemsGrid();

if (searchButton) {
    searchButton.addEventListener('click', searchItems);
}

if (selectAlbum) {
    selectAlbum.addEventListener('change', sortItemsAlphabeticalAndUpdateGrid);
}
if (selectPrice) {
    selectPrice.addEventListener('change', sortItemsByPriceAndUpdateGrid);
}

if (searchInput) {
    searchInput.addEventListener('input', searchItems);
}