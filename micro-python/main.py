import json
from phew import server, connect_to_wifi, logging
from phew.template import render_template
from machine import Pin
from secrets import WIFI_SSID, WIFI_PASSWORD


connect_to_wifi(WIFI_SSID, WIFI_PASSWORD)

button_state = {
    "BTN_1": {"name": "Washing Machine", "state": False},
    "BTN_2": {"name": "TV", "state": False},
    "BTN_3": {"name": "Bedroom Light", "state": False},
    "BTN_4": {"name": "Water Heater", "state": False},
}

pins = {
    "BTN_1": Pin("LED", Pin.OUT),
    "BTN_2": Pin(1, Pin.OUT),
    "BTN_3": Pin(2, Pin.OUT),
    "BTN_4": Pin(3, Pin.OUT),
}

# Get home page
@server.route("/")
def index(request):
    return await render_template("build/index.html")


# Get static assets like css, js and images
@server.route("/static/<folder>/<file>", methods=["GET"])
def assets(request, folder, file):
    return server.serve_file(f"build/static/{folder}/{file}")


# Get current state of the buttons
@server.route("/api/get_buttons", methods=["GET"])
def get_buttons(request):
    return json.dumps(button_state), 200, {"Content-Type": "application/json"}


# Update button state
@server.route("/api/update_button/<id>", methods=["POST"])
def update_button_state(request, id):
    new_state = request.data.get("state", False)
    print(new_state)
    button_state[id]["state"] = new_state
    pins[id].value(new_state)
    return json.dumps(button_state), 200, {"Content-Type": "application/json"}


# Handle 404
@server.catchall()
def catchall(request):
    return "Page not found", 404


server.run()
