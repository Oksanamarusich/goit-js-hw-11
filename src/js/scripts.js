
//import { serviceImage } from "./api";
import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elem = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
}


elem.searchForm.addEventListener('submit', handlerSearch);

function handlerSearch(evt) {
    evt.preventDefault();
    console.dir(evt.currentTarget);
    const { searchQuery }  = evt.currentTarget.elements;
    console.log(searchQuery.value);
  serviceImage(searchQuery.value)
  
      
}

async function serviceImage(searchQuery) {
    const BASE_URL = 'https://pixabay.com/api/';
     const API_KEY = '39173456-4ceb04e5793e75a9af707096f';
     const params = new URLSearchParams({
         key: API_KEY,
         q: searchQuery,
         image_type: 'photo',
         orientation: 'horizontal',
         safesearch: true,
         //page: currentPage,
         //per_page: 40,
     })
     try {
        const responce = await axios.get(`${BASE_URL}?${params} `);
       console.log(responce);
       createMarcup(responce.data.hits);
      
       
        
  } catch (error) {
         console.error(error);
          Notify.info('Sorry, there are no images matching your search query. Please try again.')
  }
}

function createMarcup(arr) {
  
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

