let pdfButton = document.getElementById("pdf-button");
function downloadTicketPdf() {
  const title = localStorage.getItem("selectedMovieTitle") || "—";
  const date = localStorage.getItem("selectedDate") || "—";
  const time = localStorage.getItem("selectedTime") || "—";
  const seats = JSON.parse(localStorage.getItem("selectedSeats") || "[]");
  const total = localStorage.getItem("total") || "0";

  const ticket = document.createElement("div");
  ticket.className = "print-ticket";
  ticket.innerHTML = `
    <h1>Cine ISTEA</h1>
    <h2>Comprobante de Compra</h2>
    <hr>
    <p><strong>Película:</strong> ${title}</p>
    <p><strong>Fecha:</strong> ${date}</p>
    <p><strong>Horario:</strong> ${time}</p>
    <p><strong>Asientos:</strong> ${seats.join(", ") || "—"}</p>
    <p><strong>Total:</strong> $${total}</p>
  `;

  document.body.appendChild(ticket);
  window.print();
  document.body.removeChild(ticket);
}

pdfButton.addEventListener("click", downloadTicketPdf);
