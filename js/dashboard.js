function bookingPassengerNames(booking) {
  return (booking.passengers || [booking.passenger])
    .filter(Boolean)
    .map((passenger) => passenger.name)
    .join(", ");
}

function renderHistory() {
  const bookings = Store.get("bookings", []);
  $("#bookingHistory").html(bookings.length ? bookings.map((booking) => `
    <article class="history-item">
      <div>
        <span class="badge text-bg-info">${booking.route.type}</span>
        <h3>${booking.route.from} to ${booking.route.to}</h3>
        <p>${bookingPassengerNames(booking)} | Seats ${booking.seats.join(", ")} | ${booking.date}</p>
      </div>
      <div class="text-end">
        <strong>Rs. ${booking.fare}</strong>
        <button class="btn btn-sm btn-outline-danger cancel-booking" data-id="${booking.id}">Cancel</button>
      </div>
    </article>`).join("") : `<div class="empty-state">No bookings yet. Start by searching a route.</div>`);
  App.enhanceContent(document.getElementById("bookingHistory"));

  $(".cancel-booking").on("click", function () {
    const updated = bookings.filter((booking) => booking.id !== this.dataset.id);
    Store.set("bookings", updated);
    App.showToast("Ticket cancelled.");
    renderHistory();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderHistory();
  $("#clearHistory").on("click", () => {
    Store.set("bookings", []);
    renderHistory();
  });
});
