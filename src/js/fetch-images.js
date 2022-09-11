import axios from 'axios';

const KEY = '29748617-950e0d666d0b3fa69d007eaad';
const URL = 'https://pixabay.com/api/';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.hits = 0;
    this.totalHits = 0;
  }

  async fetchImage() {
    try {
      const options = {
        params: {
          key: KEY,
          q: this.searchQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: this.page,
          per_page: 40,
        },
      };

      const data = await axios
        .get(`${URL}`, options)
        .then(response => response.data);

      this.page += 1;
      this.totalHits = response.data.totalHits;

      return data;
    } catch (error) {
      console.log('error:', error);
    }
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
