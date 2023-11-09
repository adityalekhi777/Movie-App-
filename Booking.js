const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const details = document.querySelector(".movie_details");

const IMG_URL = "https://image.tmdb.org/t/p/w1280";

function updateCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * 10;
  localStorage.setItem("total",selectedSeatsCount * 10)
}

function goToPayment() {
  const url = `./Payment.html`;
  window.location = url;

}

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateCount();
  }
});

let objet_string = localStorage.getItem("id");
let object_movie = JSON.parse(objet_string);

console.log(object_movie);

const { title, poster_path, release_date, overview,vote_average,original_language } = object_movie;

details.innerHTML = `<img src="${IMG_URL + poster_path}" alt="">
<div class="details">
    <h3>${title}</h3>   
    ${overview}
    <p>Release Date: ${release_date}</p>
    <p>Score: ${vote_average}</p>
    <p>Language: ${original_language}</p>

</div>`;
