const bookedSeats = ["A2", "A5", "B3", "C1", "D4", "E2", "F5"];
const maxSeats = 6;
let selectedSeats = [];
let route = null;

function updateSummary() {
  $("#selectedSeats").text(selectedSeats.length ? selectedSeats.join(", ") : "None");
  $("#totalFare").text(`Rs. ${selectedSeats.length * route.fare}`);
}

function renderSeats() {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  $("#seatGrid").html(rows.map((row) => {
    const seats = [1, 2, 3, 4, 5].map((num) => {
      const id = `${row}${num}`;
      const booked = bookedSeats.includes(id);
      return `<button class="seat ${booked ? "booked" : ""}" data-seat="${id}" ${booked ? "disabled" : ""}>${id}</button>`;
    }).join("");
    return `<div class="seat-row">${seats}</div>`;
  }).join(""));

  $(".seat:not(.booked)").on("click", function () {
    const id = this.dataset.seat;
    if (selectedSeats.includes(id)) {
      selectedSeats = selectedSeats.filter((seat) => seat !== id);
      this.classList.remove("selected");
    } else {
      if (selectedSeats.length >= maxSeats) {
        App.showToast(`Maximum ${maxSeats} seats can be selected.`);
        return;
      }
      selectedSeats.push(id);
      this.classList.add("selected");
    }
    Store.set("selectedSeats", selectedSeats);
    updateSummary();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  route = Store.get("selectedRoute");
  if (!route) {
    window.location.href = "search.html";
    return;
  }
  selectedSeats = Store.get("selectedSeats", []);
 $("#tripInfo").html(`<p><strong>${route.operator}</strong></p><p>${route.from} to ${route.to}</p><p>${route.departure} - ${route.arrival}</p><p>Fare per seat: Rs. ${route.fare}</p>`);  renderSeats();
  selectedSeats.forEach((seat) => $(`[data-seat="${seat}"]`).addClass("selected"));
  updateSummary();
  $("#continueBooking").on("click", () => {
    if (!selectedSeats.length) {
      App.showToast("Please select at least one seat.");
      return;
    }
    window.location.href = "booking.html";
  });
});
