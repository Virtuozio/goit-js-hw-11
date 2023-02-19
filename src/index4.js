import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { default as axios } from 'axios';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
form.addEventListener('submit', onSubmit);
async function fetchGallery(name) {
  const URL = `https://pixabay.com/api/?key=33738430-b2852a5207ef083e62f684e4b&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`;
  return await axios.get(URL).then(({ data }) => {
    return data;
  });
}

function onSubmit(e) {
  const inputValue = form.elements.searchQuery.value;
  e.preventDefault();
  clearAll();
  fetchGallery(inputValue)
    .then(({ hits }) => {
      const card = hits.reduce(
        (markup, hit) => createGallery(hit) + markup,
        ''
      );
      updateGallery(card);
    })
    .catch(onError);
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
