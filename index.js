const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c2940abb23c38d9486933b2c43b35bc0";
const IMG_URL = "https://image.tmdb.org/t/p/w1280";
const SEARCH_URL =
  "https://api.themoviedb.org/3/search/movie?api_key=c2940abb23c38d9486933b2c43b35bc0&query=";

getMovies(API_URL);

const form = document.getElementById("form");
const main = document.getElementById("main");

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  console.log(data.results);
  showMovie(data.results);
  showSlider(data.results);
}

function handler(id) {
  const url =  `./Booking.html`;
  window.location = url;
  
  localStorage.setItem("id",id);
}

function showMovie(data) {
  main.innerHTML = null;
  data.forEach((item) => {
    const { title, poster_path, vote_average, overview, id } = item;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

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
                <button onclick={handler(this.id)} id="${id}" >Book Seat</button>
            </div>
            </div>
        `;
    main.appendChild(movieEl);
  });
}

//Rating color helper function
function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

//Search by Movie name
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTearm = search.value;

  if (searchTearm && searchTearm !== "") {
    getMovies(SEARCH_URL + searchTearm);
  } else {
    location.reload();
  }
});

//Image slider
const imgs = document.getElementById("imgs");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");



console.log(imgs);

function showSlider(data) {
  let st = "";

  data.forEach((item) => {
    const { backdrop_path } = item;
    st += `<img src=${IMG_URL + backdrop_path}></img> `;
  });
  imgs.innerHTML = st;
  const img = document.querySelectorAll("#imgs img");

  let idx = 0;
  let interval = setInterval(run, 5000);

  function run() {
    idx++;
    changeImage();
  }
  
  function changeImage() {
    if (idx > img.length - 1) {
      idx = 0;
    } else if (idx < 0) {
      idx = img.length - 1;
    }
  
    imgs.style.transform = `translateX(${-idx * 850}px)`;
  }
  
  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(run, 5000);
  }
  
  rightBtn.addEventListener("click", () => {
    idx++;
    changeImage();
    resetInterval();
  });
  
  leftBtn.addEventListener("click", () => {
    idx--;
    changeImage();
    resetInterval();
  });
}




