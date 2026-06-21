const title = localStorage.getItem("selectedMovieTitle");
if (title) {
  document.querySelector(".pelicula-header h1").textContent = title;
}
