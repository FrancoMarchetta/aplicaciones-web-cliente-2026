import { fetchData } from "/js/db/DataBaseMethods.js";

const movies = await fetchData();
console.log(movies);

let $homePageMovieContainer = document.getElementById(
  "home-page-movies-container",
);

for (let movie of movies.slice(0, 3)) {
  $homePageMovieContainer.insertAdjacentHTML(
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
}
