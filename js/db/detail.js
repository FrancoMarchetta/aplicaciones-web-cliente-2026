import { getMovie } from "./supabase-client.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
if (!id) {
  alert("no hay id");
}

const movie = await getMovie(id);
if (!movie) {
  alert("no hay muvi");
}
document.getElementById("detail-title").textContent = movie.titulo;
document.getElementById("detail-genre").textContent = movie.genero;
document.getElementById("detail-rating").textContent = movie.clasificacion;
document.getElementById("detail-synopsis").textContent = movie.sinopsis;
document.getElementById("detail-duration").textContent =
  `${movie.duracion} min`;
document.getElementById("detail-director").textContent = movie.director;
document.getElementById("detail-cast").textContent = movie.reparto;
document.getElementById("detail-summary-title").textContent = movie.titulo;
document.getElementById("detail-summary-info").textContent =
  `${movie.genero} | ${movie.duracion} min`;
