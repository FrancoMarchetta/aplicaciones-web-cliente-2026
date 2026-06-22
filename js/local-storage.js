const title = localStorage.getItem("selectedMovieTitle");
if (title) {
  document.querySelector(".pelicula-header h1").textContent = title;
}

const date = localStorage.getItem("selectedDate");
const time = localStorage.getItem("selectedTime");
if (date && time) {
  const info = document.querySelector(".horario-info");
  if (info) info.textContent = `${date} | ${time}`;

  const fechaSpan = document.querySelector(".resumen-fecha");
  if (fechaSpan) fechaSpan.textContent = date;

  const horarioSpan = document.querySelector(".resumen-horario");
  if (horarioSpan) horarioSpan.textContent = time;
}
