import { postMovie } from "./supabase-client.js";

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

if ($movieForm) {
  $movieForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const titleValue = $title.value;
    const genreValue = $genre.value; // Ahora capturamos el value (ej: "action") para ser consistentes
    const runtimeValue = parseInt($runtime.value);
    const premiereValue = $premiere.value;
    const directorValue = $director.value;
    const castValue = $cast.value;
    const synopsisValue = $synopsis.value;
    const isVisibleValue = $isVisible.checked;
    const ageRatingValue = $ageRating.value;

    const newMovie = {
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

    console.log("Enviando datos a Supabase:", newMovie);

    // Usamos la función postMovie para guardar los datos
    await postMovie(newMovie);

    alert("¡Película publicada exitosamente!");
    $movieForm.reset();
  });
}
