# TransitHub PRD and File Documentation

## 1. Product Overview

**Project Name:** TransitHub  
**Project Type:** Responsive Smart Travel Booking and Reservation System  
**Primary Users:** Students, travelers, and demo users who want to search, compare, select seats, book, and manage bus/train travel tickets.  
**Frontend Stack:** HTML5, CSS3, Bootstrap 5, Bootstrap Icons, JavaScript ES6, jQuery  
**Data and Storage:** JSON files and browser LocalStorage  
**Optional Utility Layer:** Python scripts for generating larger route datasets

TransitHub is a smart travel booking platform inspired by real-world systems such as RedBus, IRCTC, and MakeMyTrip. It is designed as a syllabus-friendly web project that demonstrates practical frontend development concepts: dynamic rendering, DOM manipulation, event handling, form validation, JSON data usage, LocalStorage, filtering, sorting, seat selection, ticket generation, and a simple AI-style chatbot.

## 2. Product Goals

- Provide a clean and modern travel booking experience.
- Allow users to search bus and train routes by source, destination, date, and travel type.
- Display dynamic route results from a JSON dataset.
- Allow users to select seats interactively.
- Collect passenger details for every selected seat.
- Simulate payment and generate a digital ticket.
- Store booking history locally using LocalStorage.
- Provide a rule-based AI travel assistant for common travel queries.
- Demonstrate responsive design, animations, dark/light mode, and Bootstrap components.

## 3. Target User Flow

1. User lands on `index.html`.
2. User enters source, destination, date, passenger count, and travel type.
3. User is redirected to `search.html`.
4. User filters and sorts route results.
5. User selects a route and moves to `seats.html`.
6. User selects one or more seats.
7. User enters passenger details in `booking.html`.
8. User chooses a simulated payment method.
9. System generates a digital ticket.
10. Booking is saved in LocalStorage and shown in `dashboard.html`.
11. User can ask basic questions in `chatbot.html`.

## 4. Functional Requirements

### 4.1 Home and Search
- Show landing hero with search form.
- Store search data in LocalStorage.
- Show popular destinations dynamically.
- Navigate users to route results.

### 4.2 Route Results
- Load route data from `data/routes.json`.
- Display cards for each bus/train option.
- Filter by AC, Non-AC, Sleeper, Morning, Evening, and max price.
- Sort by cheapest, fastest, and highest rated.
- Select a route and continue to seat selection.

### 4.3 Seat Selection
- Render a seat grid.
- Mark some seats as already booked.
- Allow users to select/deselect seats.
- Limit maximum selected seats to 6.
- Update fare dynamically based on selected seats.

### 4.4 Booking
- Generate one passenger form per selected seat.
- Validate name, age, gender, email, and Indian phone number.
- Simulate payment using UPI, Card, or Wallet.
- Generate ticket ID, ticket details, and a QR-style block.
- Store bookings in LocalStorage.

### 4.5 Dashboard
- Display booking history.
- Show passenger names, route, seat list, date, and fare.
- Allow ticket cancellation from browser storage.
- Show a basic user profile card and saved destinations.

### 4.6 AI Travel Assistant
- Provide a rule-based chatbot.
- Answer questions about best travel time, cheapest routes, travel tips, discounts, and seat suggestions.
- Provide quick prompt buttons.

## 5. Non-Functional Requirements

- Responsive layout for mobile, tablet, and desktop.
- Smooth UI animations and scroll reveal effects.
- Browser-only operation with no backend server required.
- Data persistence through LocalStorage.
- Clear code separation by page/module.
- Simple enough to explain in viva.

## 6. Architecture

```text
User
  |
HTML Pages
  |
CSS + Bootstrap UI Layer
  |
JavaScript Logic Layer
  |
JSON Route Data + LocalStorage
  |
Dynamic DOM Updates
```

TransitHub uses a static frontend architecture. HTML files define page structure, CSS files define visual design, JavaScript files implement behavior, JSON files provide route data, and LocalStorage stores temporary app state such as selected route, selected seats, search query, and booking history.

## 7. Folder Structure

```text
TransitHub/
|-- index.html
|-- search.html
|-- seats.html
|-- booking.html
|-- dashboard.html
|-- chatbot.html
|-- convert.py
|-- generate_buses.py
|-- css/
|   |-- style.css
|   |-- animations.css
|   |-- responsive.css
|-- js/
|   |-- app.js
|   |-- search.js
|   |-- seats.js
|   |-- booking.js
|   |-- dashboard.js
|   |-- chatbot.js
|   |-- storage.js
|-- data/
|   |-- routes.json
|   |-- trains_dict.json
|-- assets/
|-- bootstrap/
|-- TransitHub.zip
```

## 8. File-by-File Documentation

### 8.1 Root HTML Pages

#### `index.html`
The landing page of TransitHub. It contains the navbar, hero section, main search form, feature cards, popular destinations section, animated counters, testimonials carousel, footer, loader, and shared script imports. The home search form stores user inputs in LocalStorage and redirects to `search.html`.

Main responsibilities:
- First impression of the application.
- Collect source, destination, date, passengers, and travel type.
- Load Bootstrap, icons, project CSS, jQuery, Bootstrap JS, `storage.js`, and `app.js`.
- Provide navigation to Search, Dashboard, and AI Assistant pages.

#### `search.html`
The route results page. It displays available buses and trains based on search criteria and allows filtering/sorting.

Main responsibilities:
- Render the route search form.
- Provide filter sidebar.
- Display route cards in `#resultsList`.
- Display count and route summary in `#resultsSummary`.
- Load `search.js` for route filtering and dynamic rendering.

#### `seats.html`
The interactive seat selection page. It displays a grid-based layout where users can select seats before booking.

Main responsibilities:
- Show selected route summary.
- Render available, selected, and booked seats.
- Update selected seat list and total fare.
- Prevent booking without at least one seat.
- Load `seats.js`.

#### `booking.html`
The passenger details, payment simulation, and ticket generation page.

Main responsibilities:
- Generate passenger forms based on the number of selected seats.
- Validate passenger information.
- Simulate UPI/Card/Wallet payment.
- Generate digital ticket with booking ID, passenger details, route, seats, fare, and QR-style block.
- Save bookings to LocalStorage.
- Load `booking.js`.

#### `dashboard.html`
The user dashboard page for profile and booking history.

Main responsibilities:
- Show profile card and saved destinations.
- Display all stored bookings.
- Allow ticket cancellation.
- Allow clearing booking history.
- Load `dashboard.js`.

#### `chatbot.html`
The AI Travel Assistant page. It provides a rule-based chatbot UI.

Main responsibilities:
- Show chat interface.
- Provide quick prompt buttons.
- Accept typed user questions.
- Generate predefined responses using keyword matching.
- Load `chatbot.js`.

### 8.2 CSS Files

#### `css/style.css`
The main stylesheet for the entire application. It defines the design system, color variables, layout styles, navbar, hero section, glassmorphism cards, forms, route cards, seat grid, booking ticket, dashboard, chatbot, buttons, and hover states.

Important features:
- CSS variables for dark/light theme.
- Glassmorphism styling.
- Animated gradient buttons.
- Route card styling.
- Seat grid and selected/booked states.
- Ticket card and QR-style block styling.
- Chat bubble styling.
- Responsive-friendly base layout.

#### `css/animations.css`
Contains animation keyframes and reusable animation classes.

Important features:
- `floatIn` entrance animation.
- `softPulse` selected-seat animation.
- `shimmerLine` card hover highlight.
- `slowZoom` hero background effect.
- `auroraDrift` background glow movement.
- `gradientFlow` animated button gradient.
- `railDash` heading accent animation.
- `popSelect` seat selection feedback.
- `reveal-on-scroll` scroll reveal class.
- Reduced motion support for accessibility.

#### `css/responsive.css`
Contains media queries for tablet and mobile layouts.

Important features:
- Adjusts hero layout on smaller screens.
- Makes route/history cards stack vertically.
- Reduces padding on mobile.
- Adjusts seat size and spacing.
- Makes payment options stack on small screens.
- Improves chatbot bubble width on mobile.

### 8.3 JavaScript Files

#### `js/storage.js`
A small LocalStorage helper module.

Main functions:
- `Store.get(key, fallback)` safely reads JSON from LocalStorage.
- `Store.set(key, value)` saves JSON to LocalStorage.
- `Store.remove(key)` removes a key from LocalStorage.

Used by all major modules to store search query, selected route, selected seats, bookings, last ticket, and theme.

#### `js/app.js`
The shared application script used by multiple pages.

Main responsibilities:
- Load route data from `data/routes.json`.
- Provide fallback sample route data if JSON loading fails.
- Convert route duration from minutes to readable text.
- Display Bootstrap toast messages.
- Apply and toggle dark/light theme.
- Add navbar scroll behavior.
- Add scroll reveal animations.
- Animate hero text words.
- Render popular route cards on the homepage.
- Handle homepage search form submission.
- Animate counters using jQuery.

#### `js/search.js`
Controls the search results page.

Main responsibilities:
- Load all route data using `App.loadRoutes()`.
- Read and write search criteria.
- Filter routes by source, destination, type, amenities, time, and price.
- Sort routes by cheapest, fastest, and highest rated.
- Render route cards dynamically.
- Store the selected route in LocalStorage.
- Navigate to `seats.html`.

Key concepts demonstrated:
- JSON parsing.
- Array filtering and sorting.
- Dynamic HTML rendering.
- Event handling.
- jQuery DOM updates.

#### `js/seats.js`
Controls the seat selection page.

Main responsibilities:
- Load selected route from LocalStorage.
- Generate seat grid dynamically.
- Disable pre-booked seats.
- Toggle selected seats.
- Enforce maximum seat selection of 6.
- Store selected seats in LocalStorage.
- Update selected seats and total fare in real time.
- Navigate to `booking.html`.

Key concepts demonstrated:
- DOM creation.
- Click events.
- Arrays.
- Conditional rendering.
- LocalStorage state.

#### `js/booking.js`
Controls passenger form validation, payment simulation, and ticket generation.

Main responsibilities:
- Load selected route and selected seats.
- Render one passenger form per selected seat.
- Validate passenger fields using regex and numeric checks.
- Collect passengers into an array.
- Create booking object with ID, route, seats, fare, passengers, payment, and date.
- Save bookings to LocalStorage.
- Render digital ticket.
- Trigger browser print/download through `window.print()`.

Key concepts demonstrated:
- Regex validation.
- Dynamic forms.
- Objects and arrays.
- Form submission handling.
- LocalStorage persistence.

#### `js/dashboard.js`
Controls the user dashboard.

Main responsibilities:
- Read booking history from LocalStorage.
- Render each booking as a history item.
- Display passenger names, route, seats, date, and fare.
- Cancel individual tickets.
- Clear all booking history.
- Re-render dashboard after changes.

#### `js/chatbot.js`
Controls the rule-based AI Travel Assistant.

Main responsibilities:
- Store predefined replies with keyword arrays.
- Add bot/user messages to the chat UI.
- Match user input against keywords.
- Return relevant answer or default help message.
- Handle quick prompt buttons.

This is not a real AI API integration. It is a syllabus-friendly rule-based chatbot that demonstrates conditional logic and event handling.

### 8.4 Data Files

#### `data/routes.json`
The main route database used by the application. It currently contains route objects for buses and trains.

Each route object includes:
- `id`
- `operator`
- `type`
- `from`
- `to`
- `departure`
- `arrival`
- `duration`
- `seatsLeft`
- `rating`
- `fare`
- `amenities`
- `time`
- `image`

This file is consumed by `App.loadRoutes()` and displayed through `search.js`.

#### `data/trains_dict.json`
Raw train dataset used by `convert.py`. It contains train information that can be converted into the common route format used by TransitHub.

Main purpose:
- Acts as source data for generating train route records.
- Helps expand the route database without manually writing every train route.

### 8.5 Python Utility Scripts

#### `convert.py`
A data conversion script that reads `data/trains_dict.json`, maps train station names to city names, generates fake departure/fare/seat/rating values, converts train durations into minutes, and appends the generated train records into `data/routes.json`.

Main responsibilities:
- Read raw train data.
- Convert station names into user-friendly city names.
- Generate route objects that match the frontend schema.
- Append generated train routes to the main route database.

Important note:
- Running this script modifies `data/routes.json`.
- It is used as a data preparation tool, not as part of the browser runtime.

#### `generate_buses.py`
A data generation script that creates additional bus routes for popular city pairs.

Main responsibilities:
- Read current `data/routes.json`.
- Generate 100 random bus routes.
- Assign operator, departure time, duration, seats, rating, fare, amenities, and image.
- Append new bus routes to the route database.

Important note:
- Running this script modifies `data/routes.json`.
- It is useful for creating a larger demo dataset.

### 8.6 Generated/Packaging Files

#### `TransitHub.zip`
A compressed copy of the TransitHub project folder. It can be used for sharing or submission.

#### `assets/`
Reserved folder for future images, videos, icons, or static media assets. The current version mainly uses online Unsplash image URLs and Bootstrap Icons.

#### `bootstrap/`
Reserved folder for local Bootstrap files if CDN usage is replaced with offline Bootstrap assets later.

## 9. Data Model

### 9.1 Route Object

```json
{
  "id": "R101",
  "operator": "BlueLine Express",
  "type": "Bus",
  "from": "Delhi",
  "to": "Jaipur",
  "departure": "06:30",
  "arrival": "11:10",
  "duration": 280,
  "seatsLeft": 18,
  "rating": 4.6,
  "fare": 649,
  "amenities": ["AC", "Sleeper"],
  "time": "Morning",
  "image": "image-url"
}
```

### 9.2 Booking Object

```json
{
  "id": "TH123456",
  "passengers": [
    {
      "seat": "A1",
      "name": "Passenger Name",
      "age": "21",
      "gender": "Female",
      "email": "user@example.com",
      "phone": "9876543210"
    }
  ],
  "payment": "UPI",
  "route": {},
  "seats": ["A1"],
  "fare": 649,
  "date": "30/5/2026"
}
```

## 10. LocalStorage Keys

| Key | Purpose |
|---|---|
| `theme` | Stores dark or light theme preference. |
| `searchQuery` | Stores homepage/search form input. |
| `selectedRoute` | Stores the route selected from search results. |
| `selectedSeats` | Stores selected seat numbers. |
| `bookings` | Stores all generated bookings. |
| `lastTicket` | Stores the most recently generated ticket. |

## 11. JavaScript Concepts Demonstrated

- DOM manipulation
- Event handling
- Form validation
- Regex validation
- Arrays and objects
- JSON parsing
- LocalStorage
- Dynamic rendering
- Filtering and sorting
- Bootstrap components
- jQuery effects
- Responsive UI behavior

## 12. External Libraries and CDNs

| Library | Use |
|---|---|
| Bootstrap 5 | Responsive grid, navbar, buttons, forms, carousel, utilities |
| Bootstrap Icons | Icons in navbar, buttons, feature cards |
| jQuery | DOM manipulation and counter animation |
| Unsplash Image URLs | Travel-related route and hero images |

## 13. Current Limitations

- No real backend server.
- No real payment gateway.
- No real user login or authentication.
- Route availability is simulated.
- Seat booking state is not permanently synced to a server.
- Chatbot is rule-based, not connected to a real AI API.
- Browser LocalStorage can be cleared by the user.

## 14. Future Scope

- Add real backend using Node.js, Express, Django, or Flask.
- Add database support using MongoDB, MySQL, or PostgreSQL.
- Add real user authentication.
- Add live payment gateway integration.
- Add actual QR code generation.
- Add email/SMS ticket confirmation.
- Add admin panel to manage routes, operators, and fares.
- Add real AI assistant using Gemini or OpenAI API.
- Add PNR-style ticket tracking.
- Add map-based route visualization.

## 15. Viva Explanation Summary

TransitHub is a responsive smart travel booking website built using HTML, CSS, Bootstrap, JavaScript, jQuery, JSON, and LocalStorage. The project allows users to search bus and train routes, filter results, choose seats, enter passenger information, simulate payment, generate tickets, and view booking history. The system uses JSON as a local data source and LocalStorage as browser-side storage. The AI Travel Assistant is implemented as a rule-based chatbot using JavaScript keyword matching. Python scripts are included to generate larger route datasets for a more realistic demo.

