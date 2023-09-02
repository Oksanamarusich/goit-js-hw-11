
//import { serviceImage } from "./api";
//import { createMarcup } from "./render";
import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elem = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more'),
}


let currentPage = 1;
let currentSearchQuery = '';

elem.btnLoadMore.classList.replace('load-more', 'is-hidden');

elem.searchForm.addEventListener('submit', handlerSubmit);
elem.btnLoadMore.addEventListener('click', handlerLoadMore);

function handlerLoadMore() {
  currentPage += 1;
  serviceImage(currentSearchQuery, currentPage);
}

function handlerSubmit(evt) {
    evt.preventDefault();
  const { searchQuery } = evt.currentTarget.elements;
  currentSearchQuery = searchQuery.value;
  currentPage = 1;
    serviceImage(currentSearchQuery);
    
      
}

async function serviceImage(searchQuery, currentPage = '1') {
    const BASE_URL = 'https://pixabay.com/api/';
     const API_KEY = '39173456-4ceb04e5793e75a9af707096f';
     const params = new URLSearchParams({
         key: API_KEY,
         q: searchQuery,
         image_type: 'photo',
         orientation: 'horizontal',
         safesearch: true,
         page: currentPage,
         per_page: 40,
     })
  
     try {
        const response = await axios.get(`${BASE_URL}?${params} `);
       console.log(response);
       Notify.success(`Hooray! We found ${response.data.totalHits} images.`)
       if (response.data.hits.length === 0 || searchQuery === '' || searchQuery === ' ') {
         elem.gallery.innerHTML = ''
         elem.btnLoadMore.style.display = 'none';
      Notify.info('Sorry, there are no images matching your search query. Please try again.')
       } else {
         
         const newMarkup = createMarkup(response.data.hits);
         elem.gallery.insertAdjacentHTML('beforeend', newMarkup);
        }
       if(response.data.hits.length < response.data.totalHits){
         elem.btnLoadMore.classList.replace('is-hidden', 'load-more');
        } //else if (!response.data.totalHits) {
    //      Notify.info("We're sorry, but you've reached the end of search results.")
    //      elem.btnLoadMore.classList.replace('is-hidden', 'load-more');
    //  }
        
        
     } catch (error) {
       
    console.error(error);
          Notify.failure('Invalid parameters: your request parameters are incorrect.')
       }
         
  }


function createMarkup(arr) {
  
  const markup =  arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
    `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width = "300"/>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>`).join('')
  
  elem.gallery.innerHTML= markup;
}





