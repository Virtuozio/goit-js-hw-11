const ENDPOINT = `https://pixabay.com/api/`;
import { default as axios } from 'axios';
export default class PixabayApiService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  async getNews() {
    const URL = `${ENDPOINT}?key=33738430-b2852a5207ef083e62f684e4b&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;

    const response = await axios.get(URL);
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
