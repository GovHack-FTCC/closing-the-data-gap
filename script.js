import { programs } from "./support-services.js";

// Search

const searchInput = document.querySelector('#search-input');
const searchIcon = document.querySelector('.bx-search');
const quickSearchItems = document.querySelectorAll('#quick-search button')
const searchPhrase = document.querySelector('#search-phrase');
const searchSection = document.querySelector('#search');
const searchResultsContainer = document.querySelector('#search-results');
const searchResultsArray = programs || [];

// clear search input;l
searchInput.value = '';
searchResultsContainer.innerHTML = '';

// SEARCHBOX 
searchInput.addEventListener('keyup', (e) => {
    if(e.key === 'Enter' && searchInput.value != '') {
        searchData(e.target.value);
        searchInput.value = '';
    }
})

searchIcon.addEventListener('click', () => {
    if (searchInput.value != '') {
        searchData(searchInput.value);
        searchInput.value = '';
    }
})

// QUICK search buttons
quickSearchItems.forEach(quick => {
    quick.addEventListener('click', (e) => {
        searchData(quick.textContent);
    });
})

// SEARCH database file
function searchData(phrase) {
    searchPhrase.textContent = phrase.toLowerCase();

    // unhide search section
    searchSection.style.display = 'revert';
    
    // search the title
    const filteredSearchResultsArray = searchResultsArray.filter((item) => {
        return item.title.toLowerCase().search(phrase) > -1 || item.tags.toLowerCase().search(phrase) > -1;
    })

    if (filteredSearchResultsArray.length > 0) {
        renderSearch(filteredSearchResultsArray);
    } else {
        // scroll down
        searchSection.scrollIntoView();
        searchResultsContainer.innerHTML = 'No results found.';
    }
}

// RENDER search items
function renderSearch(list) {
    // clear search container
    searchResultsContainer.innerHTML = '';
    const listContainer = [];
    
    // result loop
    for(let i = 0; i < list.length; i++) {
        const listContainer = document.createElement('li');

        const markup = `<i class='bx bx-check'></i><a href="${list[i].url}" target="_blank">${list[i].title}</a>`

        listContainer.innerHTML = markup;
        searchResultsContainer.appendChild(listContainer);
    }

    // scroll down
    searchSection.scrollIntoView();
}















// Mobile Menu

const menuToggle = document.querySelector('.menu-toggle');
const menuContainer = document.querySelector('.menu-container');

menuToggle.addEventListener('click', () => {
    menuContainer.classList.toggle('active');
    if (menuContainer.classList.contains('active')) {
        menuToggle.innerHTML = `<i class='bx bx-x' ></i>`;
    }
    if (!menuContainer.classList.contains('active')) {
        menuToggle.innerHTML = `<i class='bx bx-menu' ></i>`;
    }
})