from phew import server, connect_to_wifi, logging
from phew.template import render_template
from secrets import WIFI_SSID, WIFI_PASSWORD

connect_to_wifi(WIFI_SSID, WIFI_PASSWORD)

buttons = []


# Get home page
@server.route("/")
def index(request):
    return await render_template("build/index.html")

# Get static assets like css, js and images
@server.route("/static/<folder>/<file>", methods=["GET"])
def assets(request, folder, file):
    return server.serve_file(f"build/static/{folder}/{file}")


@server.route("/api/buttonState", methods=["GET"])
def button_state(request):
    return str(buttons), 200, {"Content-Type": "application/json"}



# Handle 404
@server.catchall()
def catchall(request):
    return render_template("build/index.html")

server.run()
