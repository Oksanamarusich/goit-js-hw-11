
import { serviceImage } from "./api";
import axios from "axios";

const elem = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('gallery'),
}


elem.searchForm.addEventListener('submit', handlerSearch);

function handlerSearch(evt) {
    evt.preventDefault();
    console.dir(evt.currentTarget);
    const { searchQuery }  = evt.currentTarget.elements;
    console.log(searchQuery.value);
    serviceImage(searchQuery.value)
        .then(data => {
            console.log(data);
            elem.gallery.insertAdjacentHTML('beforeend', createMarcup(data.results));
        })
        .catch(err => {
        console.log(err);
    })
}

function createMarcup(arr) {
  const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = hits[0];
  return arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
    `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views:${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`
    
  }).join('')
  
}

