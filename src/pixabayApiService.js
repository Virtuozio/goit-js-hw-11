const ENDPOINT = `https://pixabay.com/api/`;
import { default as axios } from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class PixabayApiService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
    this.perPage = 40;
  }

  async getNews() {
    const URL = `${ENDPOINT}?key=33738430-b2852a5207ef083e62f684e4b&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`;

    const response = await axios.get(URL);
    console.log(response.data);
    if (this.page === 1) {
      Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
    }
    this.nextPage();
    return response.data.hits;
  }

  nextPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
