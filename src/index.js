import PixabayApiService from './pixabayApiService';
import LoadMoreBtn from './components/LoadMoreBtn';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const pixabayApiService = new PixabayApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});
console.log(loadMoreBtn);
form.addEventListener('submit', onSubmit);
loadMoreBtn.button.addEventListener('click', fetchGallery);

async function fetchGallery() {
  loadMoreBtn.disable();
  try {
    const hits = await pixabayApiService.getNews();
    console.log('🚀 ~ hits', hits);
    if (hits.length === 0) throw new Error('No data');
    const card = hits.reduce((markup, hit) => createGallery(hit) + markup, '');
    updateGallery(card);
    loadMoreBtn.enable();
  } catch (err) {
    onError();
  }
}

function onSubmit(e) {
  e.preventDefault();

  const inputValue = form.elements.searchQuery.value;

  pixabayApiService.searchQuery = inputValue;

  pixabayApiService.resetPage();
  clearAll();
  loadMoreBtn.show();
  fetchGallery().finally(() => form.reset());
}

function createGallery({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span class="info-value">${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span class="info-value">${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span class="info-value">${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span class="info-value">${downloads}</span>
    </p>
  </div>
</div>`;
}
function updateGallery(markup) {
  gallery.innerHTML = markup;
}

function clearAll() {
  gallery.innerHTML = '';
}

function onError() {
  loadMoreBtn.hide();
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
