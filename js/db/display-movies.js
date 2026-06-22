import { getMovies } from "/js/db/supabase-client.js";
import "/js/db/delete-modal.js";
import { setupFilters } from "/js/db/filters.js";

let movies = await getMovies();

const heroMovie = movies.find((m) => m.visible);
const heroTitle = document.querySelector(".hero h2");
if (heroMovie && heroTitle) {
  heroTitle.textContent = heroMovie.titulo;
  document.querySelector(".director-duration").textContent =
    `Director: ${heroMovie.director} | ${heroMovie.duracion} min`;
  document.querySelector(".hero-description").textContent = heroMovie.sinopsis;
  const reservarLink = document.querySelector(".hero-buttons a");
  reservarLink.href = `/movie-detail.html?id=${heroMovie.id}`;
}

//----------------------------------------------------------------------------
//**************************contenedores:*************************************
// contenedor en Home page
let $homePageMovieContainer = document.getElementById(
  "home-page-movies-container",
);
//contenedor en pagina de cartelera
let $moviesContainer = document.getElementById("movies-grid");

//----------------------------------------------------------------------------
function renderMoviesGrid($container, moviesToRender) {
  if (!$container) return;
  $container.innerHTML = "";
  for (let movie of moviesToRender) {
    $container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="movie">
      <a href="/movie-detail.html?id=${movie.id}">
      <img loading="lazy" class="movie-image" src="${"https://i.blogs.es/c7ed10/screenshot_90/1366_2000.webp"}" alt="${movie.titulo}">
      <h3>${movie.titulo}</h3>
      <p>${movie.genero} | ${movie.duracion} min</p>
      </a>
      </div>
      `,
    );
  }
}

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
        <img loading="lazy" class="movie-image" src="${"https://i.blogs.es/c7ed10/screenshot_90/1366_2000.webp"}" alt="${movie.titulo}">
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

if ($moviesContainer) {
  setupFilters(movies, (filtered) =>
    renderMoviesGrid($moviesContainer, filtered),
  );
}

function displayAdminPanel($tableContainer) {
  if (!$tableContainer) return;
  $tableContainer.innerHTML = "";
  for (let movie of movies) {
    $tableContainer.insertAdjacentHTML(
      "beforeend",
      `
        <tr data-id="${movie.id}">
          <td class="poster-cell">
            <div class="poster-placeholder"></div>
          </td>
          <td>${movie.titulo}</td>
          <td>${movie.genero}</td>
          <td>${movie.fecha_estreno}</td>
          <td>${movie.director}</td>
          <td>${movie.reparto}</td>
          <td>${movie.sinopsis}</td>
          <td>${movie.clasificacion}</td>
          <td><span class="status-badge ${movie.visible ? "active" : "inactive"}">${movie.visible ? "visible" : "oculto"}</span></td>
          <td class="actions-cell">
            <button class="btn-action">Edit</button>
            <button class="btn-action delete">Delete</button>
          </td>
        </tr>
      `,
    );
  }
}

displayAdminPanel(document.querySelector(".table-container tbody"));

document
  .querySelector(".table-container tbody")
  ?.addEventListener("click", (e) => {
    const editBtn = e.target.closest(".btn-action:not(.delete)");
    if (!editBtn) return;
    const row = editBtn.closest("tr");
    const id = row.dataset.id;
    window.location.href = `/form.html?id=${id}`;
  });
