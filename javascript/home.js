const itemsGrid = document.querySelector('.items-grid');
const selectElement = document.getElementById('select');
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

let items = [
    {
        id: 1,
        band: 'PRETENDERS',
        song: 'LERNING TO CRAWL',
        genre: 'rock',
        price: 21.99,
    },
    {
        id: 2,
        band: 'AC/DC',
        song: 'BALLBREAKER',
        genre: 'hard rock',
        price: 19.99,
    },
    {
        id: 3,
        band: 'BON JOVI',
        song: 'FOREVER ',
        genre: 'rock',
        price: 29.99,
    },
    {
        id: 4,
        band: 'TWENTY ONE PILOTS',
        song: 'CLANCY',
        genre: 'alternative rock',
        price: 27.99,
    },
    {
        id: 5,
        band: 'DJ SNEAK',
        song: 'GALACTIC FUNK',
        genre: 'house',
        price: 16.99,
    },
    {
        id: 6,
        band: 'AC/DC',
        song: 'BALLBREAKER',
        genre: 'hard rock',
        price: 19.99,
    },
    {
        id: 7,
        band: 'DIO',
        song: 'LOCK UP THE WOLVES',
        genre: 'heavy metal',
        price: 19.99,
    },
    {
        id: 8,
        band: '2PAC',
        song: 'ALL EYEZ ON ME',
        genre: 'hip hop/rap',
        price: 39.99,
    },
    {
        id: 9,
        band: '50 CENT',
        song: 'GET RICH OR DIE TRYIN’',
        genre: 'hip hop/rap',
        price: 41.99,
    },
    {
        id: 10,
        band: 'ABBA',
        song: 'ALBUM',
        genre: 'pop',
        price: 24.99,
    },
    {
        id: 11,
        band: 'AC/DC',
        song: '’74 JAILBREAK',
        genre: 'hard rock',
        price: 19.99,
    },
]

function fillItemsGrid() {
    const itemsGrid = document.querySelector('.items-grid');
    if (itemsGrid) {
        for (const item of items) {
            let itemElement = document.createElement('div');
            itemElement.classList.add('item');
            itemElement.innerHTML = `
                <img src="../images/${item.tag}.jpg" alt="${item.name}">
                <h1>${item.name}</h1>
                <p>${item.price} €</p>`;
            itemsGrid.appendChild(itemElement);
        }
    }
}

function sortByAlphabeticalAscending() {
    items.sort((a, b) => a.name.localeCompare(b.name));
    updateItemsGrid();
}

function sortByAlphabeticalDescending() {
    items.sort((a, b) => b.name.localeCompare(a.name));
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

let originalItems = [...items];

function resetItemsGrid() {
    items = [...originalItems];
    updateItemsGrid();
    if (selectedSortOption !== '') {
        sortItemsAndUpdateGrid();
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

    const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchInputValue));
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

function sortItemsAndUpdateGrid() {
    const selectedValue = selectElement.value;
    selectedSortOption = selectedValue;
    if (selectedValue === 'LowToHigh') {
        sortByPriceAscending(items);
    } else if (selectedValue === 'HighToLow') {
        sortByPriceDescending(items);
    } else if (selectedValue === 'AtoZ') {
        sortByAlphabeticalAscending();
    } else if (selectedValue === 'ZtoA') {
        sortByAlphabeticalDescending();
    } else {
        resetItemsGrid();
    }
}

fillItemsGrid();

if (searchButton) {
    searchButton.addEventListener('click', searchItems);
}

if (selectElement) {
    selectElement.addEventListener('change', sortItemsAndUpdateGrid);
}

if (searchInput) {
    searchInput.addEventListener('input', searchItems);
}