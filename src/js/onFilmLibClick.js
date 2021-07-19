import { hidePagination } from './watched-header-btn.js';

const Movie = {
  // Данные для Local Storage //
  WATCHED: 'watched',
  QUEUE: 'queue',
};

let curLibrary = '';

export function onFilmLibClick(active) {
  curLibrary = active;
  const filmLib = document.querySelectorAll('.film-card');
  // console.log(filmLib);
  [...filmLib].forEach(el => {
    el.addEventListener('click', e => {
      // console.log(e.target.classList);
      // console.log(e.currentTarget);
      if (e.target.classList.contains('js-watched') || e.target.classList.contains('js-queue')) {
        e.currentTarget.style.display = 'none';
        checkEmptyLibrary();
      }
    });
  });
}

function checkEmptyLibrary() {
  if (curLibrary === 'queue') {
    const dataFromLocalQ = JSON.parse(localStorage.getItem(Movie.QUEUE));
    console.log('queue', dataFromLocalQ);

    if (dataFromLocalQ?.length || dataFromLocalQ === null) {
      hidePagination();
    }
  }
  if (curLibrary === 'watched') {
    const dataFromLocal = JSON.parse(localStorage.getItem(Movie.WATCHED));
    if (dataFromLocal?.length || dataFromLocal === null) {
      console.log('watched', dataFromLocal);
      hidePagination();
    }
  }

  // if(dataFromLocal)
}
