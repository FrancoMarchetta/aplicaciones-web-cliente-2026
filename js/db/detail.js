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
localStorage.setItem("selectedMovieTitle", movie.titulo);
document.getElementById("detail-summary-info").textContent =
  `${movie.genero} | ${movie.duracion} min`;

const dateBtns = document.querySelectorAll(".date-btn");
const timeBtns = document.querySelectorAll(".time-btn");

for (const btn of dateBtns) {
  btn.addEventListener("click", () => {
    for (const b of dateBtns) b.classList.remove("active");
    btn.classList.add("active");
    const day = btn.querySelector(".date-day").textContent;
    const number = btn.querySelector(".date-number").textContent;
    localStorage.setItem("selectedDate", `${day} ${number}`);
  });
}

for (const btn of timeBtns) {
  btn.addEventListener("click", () => {
    for (const b of timeBtns) b.classList.remove("active");
    btn.classList.add("active");
    localStorage.setItem("selectedTime", btn.textContent.trim());
  });
}
