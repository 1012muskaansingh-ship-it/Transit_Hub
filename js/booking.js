function validateInput(input, test, message) {
  const valid = test(input.val().trim());
  input.toggleClass("is-invalid", !valid);
  input.next(".error").text(valid ? "" : message);
  return valid;
}

function renderBookingSummary(route, seats) {
  $("#bookingSummary").html(`
    <h2 class="h5">Booking Summary</h2>
    <p><strong>${route.operator}</strong></p>
    <p>${route.from} to ${route.to}</p>
    <p>Seats: ${seats.join(", ")}</p>
    <p>Passengers: <strong>${seats.length}</strong></p>
    <p>Fare: <strong>Rs. ${seats.length * route.fare}</strong></p>
  `);
}

function renderPassengerForms(seats) {
  $("#passengerCountNote").text(`Enter details for ${seats.length} passenger${seats.length > 1 ? "s" : ""}. Each passenger is linked with one selected seat.`);
  $("#passengerForms").html(seats.map((seat, index) => `
    <section class="passenger-card" data-index="${index}">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="h6 mb-0">Passenger ${index + 1}</h3>
        <span class="badge text-bg-info">Seat ${seat}</span>
      </div>
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label" for="name-${index}">Name</label>
          <input class="form-control passenger-name" id="name-${index}" required>
          <small class="error"></small>
        </div>
        <div class="col-md-3">
          <label class="form-label" for="age-${index}">Age</label>
          <input type="number" class="form-control passenger-age" id="age-${index}" min="1" max="100" required>
          <small class="error"></small>
        </div>
        <div class="col-md-3">
          <label class="form-label" for="gender-${index}">Gender</label>
          <select class="form-select passenger-gender" id="gender-${index}" required>
            <option value="">Select</option>
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
          </select>
          <small class="error"></small>
        </div>
        <div class="col-md-6">
          <label class="form-label" for="email-${index}">Email</label>
          <input class="form-control passenger-email" id="email-${index}" required>
          <small class="error"></small>
        </div>
        <div class="col-md-6">
          <label class="form-label" for="phone-${index}">Phone</label>
          <input class="form-control passenger-phone" id="phone-${index}" required>
          <small class="error"></small>
        </div>
      </div>
    </section>
  `).join(""));
}

function validatePassengerCard(card) {
  return [
    validateInput(card.find(".passenger-name"), (value) => /^[A-Za-z ]{3,}$/.test(value), "Enter a valid name."),
    validateInput(card.find(".passenger-age"), (value) => Number(value) > 0 && Number(value) <= 100, "Enter a valid age."),
    validateInput(card.find(".passenger-gender"), (value) => value.length > 0, "Select gender."),
    validateInput(card.find(".passenger-email"), (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), "Enter a valid email."),
    validateInput(card.find(".passenger-phone"), (value) => /^[6-9]\d{9}$/.test(value), "Enter a 10 digit Indian phone number.")
  ].every(Boolean);
}

function collectPassengers(seats) {
  return $(".passenger-card").map(function () {
    const card = $(this);
    const index = Number(card.data("index"));
    return {
      seat: seats[index],
      name: card.find(".passenger-name").val().trim(),
      age: card.find(".passenger-age").val(),
      gender: card.find(".passenger-gender").val(),
      email: card.find(".passenger-email").val().trim(),
      phone: card.find(".passenger-phone").val().trim()
    };
  }).get();
}

document.addEventListener("DOMContentLoaded", () => {
  const route = Store.get("selectedRoute");
  const seats = Store.get("selectedSeats", []);
  if (!route || !seats.length) {
    window.location.href = "search.html";
    return;
  }

  renderBookingSummary(route, seats);
  renderPassengerForms(seats);
  App.enhanceContent(document.getElementById("bookingForm"));

  $("#passengerForms").on("input change", "input, select", function () {
    validatePassengerCard($(this).closest(".passenger-card"));
  });

  $("#bookingForm").on("submit", function (event) {
    event.preventDefault();
    const valid = $(".passenger-card").map(function () {
      return validatePassengerCard($(this));
    }).get().every(Boolean);
    if (!valid) return;

    const passengers = collectPassengers(seats);
    const booking = {
      id: `TH${Date.now().toString().slice(-6)}`,
      passengers,
      passenger: passengers[0],
      payment: $("input[name='payment']:checked").val(),
      route,
      seats,
      fare: seats.length * route.fare,
      date: new Date().toLocaleDateString()
    };

    const bookings = Store.get("bookings", []);
    bookings.unshift(booking);
    Store.set("bookings", bookings);
    Store.set("lastTicket", booking);

    $("#ticketId").text(booking.id);
    $("#ticketBody").html(`
      <p><strong>${route.from} to ${route.to}</strong></p>
      <p>Seats: ${seats.join(", ")} | Rs. ${booking.fare}</p>
      <div class="ticket-passengers">
        ${passengers.map((passenger, index) => `<p>${index + 1}. ${passenger.name}, ${passenger.age}, ${passenger.gender} - Seat ${passenger.seat}</p>`).join("")}
      </div>
      <p>Payment: ${booking.payment}</p>
    `);
    $("#ticketCard").removeClass("d-none");
    App.showToast("Ticket generated successfully.");
  });

  $("#downloadTicket").on("click", () => {
    window.print();
  });
});
