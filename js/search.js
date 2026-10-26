let allRoutes = [];

function matchesText(value, query) {
  return !query || value.toLowerCase().includes(query.toLowerCase());
}

function selectedValues(filterName) {
  return $(`.filter[data-filter="${filterName}"]:checked`).map((_, item) => item.value).get();
}

function currentSearchQuery() {
  return {
    from: $("#fromCity").val().trim(),
    to: $("#toCity").val().trim(),
    date: $("#travelDate").val(),
    type: $("#travelType").val()
  };
}

function renderRoutes() {
  const query = currentSearchQuery();
  const amenities = selectedValues("amenity");
  const times = selectedValues("time");
  const maxPrice = Number($("#priceRange").val());
  const sortBy = $("#sortBy").val();

  let routes = allRoutes.filter((route) => {
    const queryMatch = matchesText(route.from, query.from) &&
      matchesText(route.to, query.to) &&
      matchesText(route.type, query.type);
    const amenityMatch = amenities.length === 0 || amenities.every((item) => route.amenities.includes(item));
    const timeMatch = times.length === 0 || times.includes(route.time);
    return queryMatch && amenityMatch && timeMatch && route.fare <= maxPrice;
  });

  if (sortBy === "cheap") routes.sort((a, b) => a.fare - b.fare);
  if (sortBy === "fast") routes.sort((a, b) => a.duration - b.duration);
  if (sortBy === "rated") routes.sort((a, b) => b.rating - a.rating);

  const routeLabel = query.from || query.to ? `${query.from || "Any city"} to ${query.to || "Any city"}` : "All routes";
  const typeLabel = query.type ? ` | ${query.type}` : "";
  $("#resultsSummary").html(`<span class="badge text-bg-info">${routes.length} trips found</span> <span class="summary-text">${routeLabel}${typeLabel}</span>`);
  $("#resultsList").html(routes.length ? routes.map((route) => `
    <article class="route-card glass-card">
      <div>
        <span class="badge text-bg-info">${route.type}</span>
        <h2>${route.operator}</h2>
        <p>${route.from} <i class="bi bi-arrow-right"></i> ${route.to}</p>
        <div class="route-meta"><span>${route.departure} - ${route.arrival}</span><span>${App.minutesToText(route.duration)}</span><span>${route.seatsLeft} seats left</span></div>
      </div>
      <div class="route-price">
        <p><i class="bi bi-star-fill text-warning"></i> ${route.rating}</p>
        <h3>Rs. ${route.fare}</h3>
        <button class="btn btn-info select-route" data-id="${route.id}">Select Seats</button>
      </div>
    </article>`).join("") : `<div class="glass-card empty-state">No matching trips found. Try changing filters or search another city.</div>`);
  App.enhanceContent(document.getElementById("resultsList"));

  $(".select-route").on("click", function () {
    const selected = allRoutes.find((route) => route.id === this.dataset.id);
    Store.set("selectedRoute", selected);
    Store.set("selectedSeats", []);
    window.location.href = "seats.html";
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  allRoutes = await App.loadRoutes();
  const query = Store.get("searchQuery", {});
  $("#fromCity").val(query.from || "");
  $("#toCity").val(query.to || "");
  $("#travelDate").val(query.date || new Date().toISOString().slice(0, 10));
  $("#travelType").val(query.type || "");
  $("#priceRange").on("input", function () {
    $("#priceLabel").text(this.value);
    renderRoutes();
  });
  $(".filter, #sortBy").on("change", renderRoutes);
  $("#routeSearchForm").on("submit", function (event) {
    event.preventDefault();
    Store.set("searchQuery", currentSearchQuery());
    renderRoutes();
  });
  renderRoutes();
});
