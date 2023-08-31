import axios from "axios";

//api-key = '39173456-4ceb04e5793e75a9af707096f'
axios.defaults.headers.common["key"] = '39173456-4ceb04e5793e75a9af707096f';
axios.defaults.baseURL= 'https://pixabay.com/api/';
const URL = 'https://pixabay.com/api/';
const params = {
    q: enteredUser,
    image_type: photo,
    orientation: horizontal,
    safesearch: true,
}

function fetchUser