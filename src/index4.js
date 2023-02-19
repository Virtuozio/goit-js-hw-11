import PixabayApiService from './pixabayApiService';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const pixabayApiService = new PixabayApiService();
console.log(pixabayApiService);
form.addEventListener('submit', onSubmit);

async function fetchGallery() {
  try {
    const hits = await pixabayApiService.getNews();
    console.log('🚀 ~ hits', hits);
    if (hits.length === 0) throw new Error('No data');
    const card = hits.reduce((markup, hit) => createGallery(hit) + markup, '');
    updateGallery(card);
  } catch (err) {
    console.error(err);
  }
}

function onSubmit(e) {
  e.preventDefault();

  const inputValue = form.elements.searchQuery.value;

  pixabayApiService.searchQuery = inputValue;
  clearAll();
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
      <b>Likes${likes}</b>
    </p>
    <p class="info-item">
      <b>Views${views}</b>
    </p>
    <p class="info-item">
      <b>Comments${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads${downloads}</b>
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
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    {
      timeout: 2000,
      position: 'center-top',
      width: '400px',
    }
  );
}
