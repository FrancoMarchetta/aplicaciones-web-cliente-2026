const PRICE_PER_TICKET = 1000;
const SERVICE_FEE = 500;

const seatInputs = document.querySelectorAll(".seat-input");
const selectedSeats = [];

function updateSummary() {
  const count = selectedSeats.length;
  const subtotal = count * PRICE_PER_TICKET;
  const total = subtotal + SERVICE_FEE;

  const rows = document.querySelectorAll(".resumen-compra .price-row");
  rows[2].querySelector("span:first-child").textContent = `Entradas (${count})`;
  rows[2].querySelector("span:last-child").textContent = `$${subtotal}`;
  rows[4].querySelector("span:last-child").textContent = `$${total}`;

  console.log(selectedSeats);
  localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
  localStorage.setItem("total", total);
}

for (const input of seatInputs) {
  input.addEventListener("change", () => {
    const label = input.nextElementSibling.textContent;
    if (input.checked) {
      selectedSeats.push(label);
    } else {
      const idx = selectedSeats.indexOf(label);
      if (idx !== -1) selectedSeats.splice(idx, 1);
    }
    updateSummary();
  });
}
