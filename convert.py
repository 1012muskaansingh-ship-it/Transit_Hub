import json
import random

# Load railway dataset
with open("data/trains_dict.json", "r", encoding="utf-8") as file:
    trains = json.load(file)

# Load existing routes
with open("data/routes.json", "r", encoding="utf-8") as file:
    existing_routes = json.load(file)

# City conversion map
city_map = {
    "C SHIVAJI MAH T": "Mumbai",
    "LOKMANYATILAK T": "Mumbai",
    "DADAR": "Mumbai",
    "MUMBAI CENTRAL": "Mumbai",

    "PUNE JN": "Pune",

    "MADGAON": "Goa",

    "KSR BENGALURU": "Bangalore",
    "BENGALURU": "Bangalore",

    "CHENNAI CENTRAL": "Chennai",
    "MGR CHENNAI CTL": "Chennai",

    "COIMBATORE JN": "Coimbatore",

    "ERNAKULAM JN": "Kochi",

    "NEW DELHI": "Delhi",
    "DELHI": "Delhi",

    "AMRITSAR JN": "Amritsar",

    "GORAKHPUR JN": "Gorakhpur",

    "BHUBANESWAR": "Bhubaneswar",

    "AHMEDABAD JN": "Ahmedabad",

    "GWALIOR": "Gwalior",

    "LUCKNOW NE": "Lucknow",

    "BANARAS": "Varanasi",

    "JAMMU TAWI": "Jammu",

    "HOWRAH JN": "Kolkata",

    "PATNA JN": "Patna",

    "RATLAM JN": "Ratlam",

    "HYDERABAD DECAN": "Hyderabad",
    "SECUNDERABAD": "Hyderabad",

    "VISAKHAPATNAM": "Visakhapatnam"
}

# Train images
images = [
    "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1515165562835-c3b8c263f28f?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80"
]

new_routes = []

# Start IDs after your existing routes
route_number = 200

for train_no, train in trains.items():

    # Convert duration HH:MM → minutes
    hours, minutes = map(int, train["Duration"].split(":"))
    duration_minutes = hours * 60 + minutes

    # Convert city names
    from_station = train["From_station"].strip().upper()
    to_station = train["To_station"].strip().upper()

    from_city = city_map.get(from_station, from_station.title())
    to_city = city_map.get(to_station, to_station.title())

    # Generate fake departure
    departure_hour = random.randint(0, 23)
    departure_minute = random.choice([0, 15, 30, 45])

    departure = f"{departure_hour:02}:{departure_minute:02}"

    # Fake arrival
    arrival = "Calculated"

    route = {
        "id": f"R{route_number}",
        "operator": train["Train_name"].title(),
        "type": "Train",
        "from": from_city,
        "to": to_city,
        "departure": departure,
        "arrival": arrival,
        "duration": duration_minutes,
        "seatsLeft": random.randint(5, 60),
        "rating": round(random.uniform(3.8, 4.9), 1),
        "fare": random.randint(500, 2500),
        "amenities": random.choice([
            ["AC"],
            ["AC", "Sleeper"],
            ["Non-AC", "Sleeper"]
        ]),
        "time": "Morning" if departure_hour < 12 else "Evening",
        "image": random.choice(images)
    }

    new_routes.append(route)

    route_number += 1

    # LIMIT ROUTES
    if route_number > 300:
        break

# Merge old + new routes
all_routes = existing_routes + new_routes

# Save updated routes
with open("data/routes.json", "w", encoding="utf-8") as file:
    json.dump(all_routes, file, indent=2)

print("Routes added successfully!")