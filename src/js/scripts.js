
//import { serviceImage } from "./api";
//import { createMarcup } from "./render";
import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const elem = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more'),
}

const lightbox = new SimpleLightbox('.gallery a', {
     captionsData: 'alt', captionDelay: 250
  
   });

let currentPage = 1;
let currentSearchQuery = '';
let loadedImgBox = 0;

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
    if (!searchQuery || searchQuery === ' ') {
      Notify.info('Sorry, there are no images matching your search query. Please try again.')
      return;
       }
        const response = await axios.get(`${BASE_URL}?${params} `);
       console.log(response);
       if (currentPage === '1'&& response.data.hits.length) {
         elem.btnLoadMore.classList.replace('is-hidden', 'load-more');
         Notify.success(`Hooray! We found ${response.data.totalHits} images.`)
         
       }
       createMarkup(response.data.hits);
        
        if (!response.data.totalHits) {
         elem.gallery.innerHTML = ''
         elem.btnLoadMore.classList.replace('load-more', 'is-hidden');
         
        Notify.info('Sorry, there are no images matching your search query. Please try again.')
       }
       
        if (loadedImgBox >= response.data.totalHits) {
         elem.btnLoadMore.classList.replace('load-more', 'is-hidden');
          Notify.info("We're sorry, but you've reached the end of search results.")
          
      }  
    
    } catch (error) {
       
    console.error(error);
          Notify.failure('Invalid parameters: your request parameters are incorrect.')
       }
         
  }


function createMarkup(arr) {
  
  const markup =  arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
    `<div class="photo-card">
  <a href="${largeImageURL}">
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
  </div></a>
</div>`).join('')
  
  elem.gallery.innerHTML = markup;
  loadedImgBox += 40;
  lightbox.refresh();
}





