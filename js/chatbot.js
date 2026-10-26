const replies = [
  { keys: ["best", "time"], text: "For buses, early morning trips usually avoid traffic. For trains, evening departures are comfortable for overnight journeys." },
  { keys: ["cheap", "cheapest", "fare"], text: "The cheapest routes are usually Non-AC buses and morning trains. Use the Cheapest sort option on the search page." },
  { keys: ["tip", "tips"], text: "Reach 30 minutes early, keep a digital ID, carry water, and save your ticket from the dashboard." },
  { keys: ["discount", "offer"], text: "Student demo offer: use code SMART20 to imagine 20% off during project presentation." },
  { keys: ["seat", "seats"], text: "Window seats are great for day trips. For overnight journeys, sleeper seats are more comfortable." }
];

function addMessage(text, type) {
  $("#chatMessages").append(`<div class="chat-bubble ${type}">${text}</div>`);
  $("#chatMessages").scrollTop($("#chatMessages")[0].scrollHeight);
}

function getReply(message) {
  const lower = message.toLowerCase();
  const match = replies.find((item) => item.keys.some((key) => lower.includes(key)));
  return match ? match.text : "I can help with best travel time, cheapest routes, travel tips, discounts, and seat suggestions.";
}

document.addEventListener("DOMContentLoaded", () => {
  addMessage("Hi, I am TransitHub Assistant. Ask me about travel tips, cheap routes, discounts, or seats.", "bot");

  $(".quick-prompts button").on("click", function () {
    $("#chatInput").val(this.textContent);
    $("#chatForm").trigger("submit");
  });

  $("#chatForm").on("submit", function (event) {
    event.preventDefault();
    const message = $("#chatInput").val().trim();
    if (!message) return;
    addMessage(message, "user");
    $("#chatInput").val("");
    setTimeout(() => addMessage(getReply(message), "bot"), 350);
  });
});
