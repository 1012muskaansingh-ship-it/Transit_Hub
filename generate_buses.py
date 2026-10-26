import json
import random

# Load existing routes
with open("data/routes.json", "r", encoding="utf-8") as file:
    routes = json.load(file)

cities = [
    "Mumbai",
    "Pune",
    "Delhi",
    "Jaipur",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Ahmedabad",
    "Surat",
    "Kolkata",
    "Goa",
    "Lucknow",
    "Chandigarh",
    "Coimbatore",
    "Kochi"
]

operators = [
    "VRL Travels",
    "Orange Tours",
    "SRS Travels",
    "GreenLine",
    "InterCity Express",
    "Royal Cruiser",
    "SkyBus",
    "National Travels"
]

images = [
    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957",
    "https://images.unsplash.com/photo-1519003722824-194d4455a60c",
    "https://images.unsplash.com/photo-1570125909232-eb263c188f7e"
]

amenities_list = [
    ["AC", "Sleeper"],
    ["AC"],
    ["Non-AC"],
    ["WiFi", "AC"],
    ["Charging Port", "Sleeper"]
]

new_routes = []

route_id = 500

popular_routes = [
    ("Mumbai", "Pune"),
    ("Mumbai", "Goa"),
    ("Delhi", "Jaipur"),
    ("Bangalore", "Chennai"),
    ("Hyderabad", "Bangalore"),
    ("Pune", "Goa"),
    ("Ahmedabad", "Surat"),
    ("Kolkata", "Delhi"),
    ("Chennai", "Coimbatore"),
    ("Delhi", "Chandigarh"),
    ("Mumbai", "Nashik"),
    ("Pune", "Hyderabad"),
    ("Mumbai", "Ahmedabad"),
    ("Bangalore", "Hyderabad"),
    ("Chennai", "Bangalore")
]

for _ in range(100):

    from_city, to_city = random.choice(popular_routes)

    departure_hour = random.randint(0, 23)
    departure_minute = random.choice([0, 15, 30, 45])

    duration_hours = random.randint(4, 16)
    duration_minutes = duration_hours * 60

    route = {
        "id": f"B{route_id}",
        "operator": random.choice(operators),
        "type": "Bus",
        "from": from_city,
        "to": to_city,
        "departure": f"{departure_hour:02}:{departure_minute:02}",
        "arrival": "Next Day",
        "duration": duration_minutes,
        "seatsLeft": random.randint(5, 40),
        "rating": round(random.uniform(3.5, 4.9), 1),
        "fare": random.randint(400, 2500),
        "amenities": random.choice(amenities_list),
        "time": "Morning" if departure_hour < 12 else "Evening",
        "image": random.choice(images)
    }

    new_routes.append(route)

    route_id += 1

# Merge
all_routes = routes + new_routes

# Save
with open("data/routes.json", "w", encoding="utf-8") as file:
    json.dump(all_routes, file, indent=2)

print("100 bus routes added!")