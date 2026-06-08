import { getMovies } from "/js/db/supabase-client.js";

let movies = await getMovies();
console.table(movies);
//----------------------------------------------------------------------------
//**************************contenedores:*************************************
// contenedor en Home page
let $homePageMovieContainer = document.getElementById(
  "home-page-movies-container",
);
//contenedor en pagina de cartelera
let $moviesContainer = document.getElementById("movies-grid");

//----------------------------------------------------------------------------
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
displayMovies($moviesContainer);

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
          <td><span class="status-badge ${movie.visible ? "active" : "inactive"}">${movie.visible}</span></td>
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

// ---- Modal de confirmación para eliminar película ----
const $modal = document.getElementById("deleteModal");
const $modalTitle = document.getElementById("modalMovieTitle");
const $modalConfirm = document.getElementById("modalConfirmBtn");
const $modalCancel = document.getElementById("modalCancelBtn");

let movieIdToDelete = null;

function openDeleteModal(id, title) {
  movieIdToDelete = id;
  $modalTitle.textContent = title;
  $modal.classList.remove("hidden");
}

function closeDeleteModal() {
  movieIdToDelete = null;
  $modal.classList.add("hidden");
}

document.querySelector(".table-container tbody").addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".btn-action.delete");
  if (!deleteBtn) return;

  const row = deleteBtn.closest("tr");
  const title = row.children[1]?.textContent ?? "";
  const id = row.dataset.id;

  openDeleteModal(id, title);
});

$modalConfirm.addEventListener("click", () => {
  if (movieIdToDelete !== null) {
    // TODO: conectar con deleteMovie(id) de supabase-client.js
    // import { deleteMovie } from "/js/db/supabase-client.js";
    // await deleteMovie(movieIdToDelete);
    console.log("Eliminar película id:", movieIdToDelete);
  }
  closeDeleteModal();
});

$modalCancel.addEventListener("click", closeDeleteModal);

$modal.addEventListener("click", (e) => {
  if (e.target === $modal) closeDeleteModal();
});
