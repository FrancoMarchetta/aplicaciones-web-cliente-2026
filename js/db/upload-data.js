import { postMovie, getMovie, updateMovie } from "./supabase-client.js";

// Referencias a los elementos del DOM en form.html
const $movieForm = document.getElementById("movie-form");
const $title = document.getElementById("title");
const $genre = document.getElementById("genre");
const $runtime = document.getElementById("runtime");
const $premiere = document.getElementById("premiere");
const $director = document.getElementById("director");
const $cast = document.getElementById("cast");
const $synopsis = document.getElementById("synopsis");
const $isVisible = document.getElementById("isVisible");
const $ageRating = document.getElementById("age-rating");

const params = new URLSearchParams(window.location.search);
const editId = params.get("id");

if ($movieForm) {
  if (editId) {
    document.querySelector(".page-title").textContent = "Editar Película";
    $movieForm.querySelector('button[type="submit"]').textContent =
      "Actualizar Película";

    const movie = await getMovie(editId);
    if (movie) {
      $title.value = movie.titulo ?? "";
      $genre.value = movie.genero ?? "";
      $runtime.value = movie.duracion ?? "";
      $premiere.value = movie.fecha_estreno ?? "";
      $director.value = movie.director ?? "";
      $cast.value = movie.reparto ?? "";
      $synopsis.value = movie.sinopsis ?? "";
      $isVisible.checked = movie.visible ?? false;
      $ageRating.value = movie.clasificacion ?? "ATP";
    }
  }

  $movieForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const titleValue = $title.value;
    const genreValue = $genre.value;
    const runtimeValue = parseInt($runtime.value);
    const premiereValue = $premiere.value;
    const directorValue = $director.value;
    const castValue = $cast.value;
    const synopsisValue = $synopsis.value;
    const isVisibleValue = $isVisible.checked;
    const ageRatingValue = $ageRating.value;

    const movieData = {
      titulo: titleValue,
      genero: genreValue,
      duracion: runtimeValue,
      fecha_estreno: premiereValue,
      director: directorValue,
      reparto: castValue,
      sinopsis: synopsisValue,
      visible: isVisibleValue,
      clasificacion: ageRatingValue,
    };

    console.log("Enviando datos a Supabase:", movieData);

    if (editId) {
      await updateMovie(editId, movieData);
      alert("¡Película actualizada exitosamente!");
    } else {
      await postMovie(movieData);
      alert("¡Película publicada exitosamente!");
      $movieForm.reset();
    }

    window.location.href = "/admin.html";
  });
}
