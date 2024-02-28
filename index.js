let global_data = {};
const form = document.getElementById('form');
const main = document.getElementById('main');

const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c2940abb23c38d9486933b2c43b35bc0';
const IMG_URL = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=c2940abb23c38d9486933b2c43b35bc0&query=';

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  global_data = data.results;

  console.log(data.results);
  showMovie(data.results);
  displaySlider(data.results);
}

function handler(id) {
  const url = `./Booking.html`;
  window.location = url;
  console.log();
  localStorage.setItem('id', JSON.stringify(global_data[id]));
}

function showMovie(data) {
  main.innerHTML = null;
  data.forEach((item, index) => {
    const { title, poster_path, vote_average, overview } = item;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `
            <div>
            <img src="${IMG_URL + poster_path}" alt="">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                  vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>overview</h3>
                ${overview}
                <button onclick={handler(this.id)} id="${index}" >Book Seat</button>
            </div>
            </div>
        `;
    main.appendChild(movieEl);
  });
}

//Rating color helper function
function getClassByRate(vote) {
  if (vote >= 7) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

//Search by Movie name
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTearm = search.value;

  if (searchTearm && searchTearm !== '') {
    getMovies(SEARCH_URL + searchTearm);
  } else {
    location.reload();
  }
});

//Image slider
// const imgs = document.getElementById('imgs');
// const leftBtn = document.querySelector('.left');
// const rightBtn = document.querySelector('.right');

const swiperWrapper = document.querySelector('.swiper-wrapper');

function initSwiper() {
  const swiper = new Swiper('#swiper-1', {
    effect: 'fade',
    slidesPerView: 1.5,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '#swiper-1 .swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 400000,
      disableOnInteraction: false,
    },
  });
}

function displaySlider(data) {
  let st = '';
  data.forEach((item) => {
    const { backdrop_path, original_title, overview } = item;
    if (backdrop_path != null) {
      st += ` <div class="swiper-slide">
      <img src=${IMG_URL + backdrop_path}></img>
      <div class='info'>${original_title}</div>
      <div class='detail'>${overview.slice(0,200)}</div>
      </div>`;
    }
  });

  swiperWrapper.innerHTML = st;
  initSwiper();
}

// function showSlider(data) {
//   let st = "";

//   data.forEach((item) => {
//     const { backdrop_path } = item;
//     if (backdrop_path != null) {
//       st += `<img src=${IMG_URL + backdrop_path}></img> `;
//     }
//   });
//   imgs.innerHTML = st;
//   const img = document.querySelectorAll("#imgs img");

//   let idx = 0;
//   let interval = setInterval(run, 3000);

//   function run() {
//     idx++;
//     changeImage();
//   }

//   function changeImage() {
//     if (idx > img.length - 1) {
//       idx = 0;
//     } else if (idx < 0) {
//       idx = img.length - 1;
//     }

//     imgs.style.transform = `translateX(${-idx * 1280}px)`;
//   }

//   function resetInterval() {
//     clearInterval(interval);
//     interval = setInterval(run, 5000);
//   }

//   rightBtn.addEventListener("click", () => {
//     idx++;
//     changeImage();
//     resetInterval();
//   });

//   leftBtn.addEventListener("click", () => {
//     idx--;
//     changeImage();
//     resetInterval();
//   });
// }


// Theme Functionality


