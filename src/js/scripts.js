//import Notiflix from 'notiflix';


const elem = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('gallery'),
}

elem.searchForm.addEventListener('submit', handlerSearch);

function handlerSearch(evt) {
    evt.preventDefault();
    console.dir(evt.currentTarget);
    const { searchQuery }  = evt.currentTarget.elements;
    console.log(searchQuery.value );
}