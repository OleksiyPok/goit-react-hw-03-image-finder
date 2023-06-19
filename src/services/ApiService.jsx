import axios from 'axios';
// const axios = require('axios');

// to add a parameter to request, add the parameter as a string constant
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34108164-696ccaa844df7defeecc2723b';

const IMAGE_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const SAFESEARCH = 'true';
const PER_PAGE = '12';

// const FULL_TEST_URL = `https://pixabay.com/api/?q=cat&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

class ApiService {
  constructor() {
    this.perPage = PER_PAGE;
    this.page = 1;
    this.searchQuery = '';
  }

  get currentPage() {
    return this.page;
  }

  set currentPage(newPage) {
    this.page = newPage;
  }

  async getData(searchQuery) {
    this.searchQuery = searchQuery;
    const params = [];

    const options = {
      key: API_KEY,
      q: this.searchQuery,
      lang: '',
      id: '',
      image_type: IMAGE_TYPE,
      orientation: ORIENTATION,
      category: '',
      min_width: '',
      min_height: '',
      colors: '',
      editors_choice: '',
      safesearch: SAFESEARCH,
      order: '',
      page: this.page,
      per_page: PER_PAGE,
      callback: '',
      pretty: '',
    };

    Object.entries(options).forEach(([key, value]) => {
      if (value) params.push(`${key}=${value}`);
    });

    const PARAMS = params.join('&');
    const FULL_REQEST = BASE_URL + '?' + PARAMS;

    const response = await axios.get(FULL_REQEST);
    return response.data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
export default ApiService;