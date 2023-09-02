import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
//import { createMarcup } from "./render";
//axios.defaults.headers.common["x-api-key"] = '39173456-4ceb04e5793e75a9af707096f';
//axios.defaults.baseURL= 'https://pixabay.com/api/';


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
        const response = await axios.get(`${BASE_URL}?${params} `);
        console.log(response);
        createMarcup(response.data.hits);
        
  } catch (error) {
         console.error(error);
          Notify.info('Sorry, there are no images matching your search query. Please try again.')
  }
}


export { serviceImage };