const App = {
  routes: [],
  async loadRoutes() {
    if (this.routes.length) return this.routes;
    try {
      const response = await fetch("data/routes.json");
      this.routes = await response.json();
    } catch {
      this.routes = [
        { id: "R101", operator: "BlueLine Express", type: "Bus", from: "Delhi", to: "Jaipur", departure: "06:30", arrival: "11:10", duration: 280, seatsLeft: 18, rating: 4.6, fare: 649, amenities: ["AC", "Sleeper"], time: "Morning", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80" },
        { id: "R102", operator: "Royal Rajasthan Travels", type: "Bus", from: "Delhi", to: "Jaipur", departure: "08:15", arrival: "13:00", duration: 285, seatsLeft: 27, rating: 4.4, fare: 599, amenities: ["AC"], time: "Morning", image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=900&q=80" },
        { id: "R103", operator: "PinkCity Volvo", type: "Bus", from: "Delhi", to: "Jaipur", departure: "14:20", arrival: "19:05", duration: 285, seatsLeft: 12, rating: 4.5, fare: 720, amenities: ["AC", "Sleeper"], time: "Evening", image: "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&w=900&q=80" },
        { id: "R104", operator: "Aravali Intercity", type: "Train", from: "Delhi", to: "Jaipur", departure: "06:05", arrival: "10:40", duration: 275, seatsLeft: 68, rating: 4.7, fare: 520, amenities: ["AC"], time: "Morning", image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=900&q=80" }
      ];
    }
    return this.routes;
  },
  minutesToText(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  },
  showToast(message) {
    const toast = document.getElementById("appToast");
    if (!toast) return;
    toast.querySelector(".toast-body").textContent = message;
    bootstrap.Toast.getOrCreateInstance(toast).show();
  },
  applyTheme() {
    const theme = Store.get("theme", "dark");
    document.documentElement.dataset.theme = theme;
  },
  toggleTheme() {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    Store.set("theme", next);
    this.applyTheme();
  },
  revealObserver: null,
  enhanceContent(root = document) {
    const targets = root.querySelectorAll?.(".feature-card, .destination-card, .route-card, .history-item, .passenger-card, .testimonial-box, .filters, .trip-summary, .chat-shell");
    if (!targets?.length) return;

    targets.forEach((item, index) => {
      item.classList.add("reveal-on-scroll");
      item.style.transitionDelay = `${Math.min(index * 35, 210)}ms`;
      if (item.getBoundingClientRect().top < window.innerHeight * 0.95) {
        item.classList.add("in-view");
      }
      if (this.revealObserver) {
        this.revealObserver.observe(item);
      } else if (!item.classList.contains("in-view")) {
        item.classList.add("in-view");
      }
    });
  },
  initMotion() {
    const nav = document.querySelector(".glass-nav");
    const updateNav = () => nav?.classList.toggle("scrolled", window.scrollY > 16);
    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });

    if ("IntersectionObserver" in window) {
      this.revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            this.revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
    }
    this.enhanceContent(document);
  },
  initHeroWords() {
    const typedText = document.getElementById("typedText");
    if (!typedText) return;
    const words = ["journey", "ticket", "route", "weekend"];
    let index = 0;
    setInterval(() => {
      index = (index + 1) % words.length;
      typedText.animate([
        { opacity: 1, transform: "translateY(0)" },
        { opacity: 0, transform: "translateY(-10px)" },
        { opacity: 0, transform: "translateY(10px)" },
        { opacity: 1, transform: "translateY(0)" }
      ], { duration: 520, easing: "cubic-bezier(0.2, 0.9, 0.2, 1)" });
      setTimeout(() => {
        typedText.textContent = words[index];
      }, 240);
    }, 2200);
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  App.applyTheme();
  App.initMotion();
  App.initHeroWords();
  document.querySelectorAll("#themeToggle").forEach((button) => {
    button.addEventListener("click", () => App.toggleTheme());
  });

  setTimeout(() => document.getElementById("loader")?.classList.add("hidden"), 500);

  const dateInput = document.getElementById("travelDate");
  if (dateInput && !dateInput.value) dateInput.valueAsDate = new Date();

  const form = document.getElementById("homeSearchForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      Store.set("searchQuery", {
        from: document.getElementById("fromCity").value.trim(),
        to: document.getElementById("toCity").value.trim(),
        date: document.getElementById("travelDate").value,
        passengers: document.getElementById("passengers").value,
        type: document.getElementById("travelType").value
      });
      window.location.href = "search.html";
    });
  }

  const popular = document.getElementById("popularRoutes");
  if (popular) {
    const routes = (await App.loadRoutes()).slice(0, 3);
    popular.innerHTML = routes.map((route) => `
      <div class="col-md-4">
        <article class="destination-card glass-card">
          <img src="${route.image}" alt="${route.from} to ${route.to}">
          <div class="p-3">
            <h3>${route.from} to ${route.to}</h3>
            <p>${route.type} from Rs. ${route.fare}</p>
            <button class="btn btn-sm btn-info quick-book" data-id="${route.id}">Quick Book</button>
          </div>
        </article>
      </div>`).join("");
    App.enhanceContent(popular);
    $(".quick-book").on("click", function () {
      const selected = routes.find((route) => route.id === this.dataset.id);
      Store.set("selectedRoute", selected);
      Store.set("selectedSeats", []);
      window.location.href = "seats.html";
    });
  }

  $(".counters h3").each(function () {
    const target = Number($(this).data("count"));
    $({ value: 0 }).animate({ value: target }, {
      duration: 1200,
      step: (now) => $(this).text(Math.floor(now)),
      complete: () => $(this).text(target)
    });
  });
});
