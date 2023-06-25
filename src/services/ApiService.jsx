import axios from 'axios';
// const axios = require('axios');

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34108164-696ccaa844df7defeecc2723b';

const IMAGE_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const SAFESEARCH = 'true';
const IMAGES_PER_PAGE = 12;

// example
// const FULL_TEST_URL = `https://pixabay.com/api/?q=cat&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

export const getData = async (searchQuery, page) => {
  const params = [];
  const options = {
    key: API_KEY,
    q: searchQuery,
    image_type: IMAGE_TYPE,
    orientation: ORIENTATION,
    safesearch: SAFESEARCH,
    page: page,
    per_page: IMAGES_PER_PAGE,
  };

  Object.entries(options).forEach(([key, value]) => {
    if (value) params.push(`${key}=${value}`);
  });

  const PARAMS = params.join('&');
  const FULL_REQEST = BASE_URL + '?' + PARAMS;

  const response = await axios.get(FULL_REQEST);

  return response.data;
};
