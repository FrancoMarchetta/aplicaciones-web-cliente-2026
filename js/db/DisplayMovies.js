import { fetchData } from "/js/db/DataBaseMethods.js";

let movies = await fetchData();
console.log(movies);

// contenedor en Home page
let $homePageMovieContainer = document.getElementById(
  "home-page-movies-container",
);
//contenedor en pagina de cartelera
let $moviesContainer = document.getElementById("movies-grid");

function displayMovies($container, limit = null) {
  if (!$container) {
    return;
  }  
  let displayedCount = 0;

  for (let movie of movies) {
    if (limit !== null && displayedCount >= limit) break;
    if (movie.visible) {
      $container.insertAdjacentHTML(
        "beforeend",
        `
        <div class="movie">
        <a href="/movie-detail.html?id=${movie.id}">
        <img class="movie-image" src="${"https://i.blogs.es/c7ed10/screenshot_90/1366_2000.webp"}" alt="${movie.titulo}">
        <h3>${movie.titulo}</h3>
        <p>${movie.genero} | ${movie.duracion} min</p>
        </a>
        </div>
        `,
      );
      displayedCount++;
    }
  }
}




displayMovies($homePageMovieContainer, 3);
displayMovies($moviesContainer);

