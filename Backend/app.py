from flask import Flask, request, jsonify, session, send_from_directory
from flask_cors import CORS
from flask_mail import Mail, Message
import uuid
import os



app = Flask(__name__, static_folder='dist', static_url_path='/')
app.secret_key = 'your_secret_key'
CORS(app, supports_credentials=True)

#  Gmail SMTP config
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = "yourgmail@gmail.com"
app.config["MAIL_PASSWORD"] = "your-app-password"  # use Google App Password
app.config["MAIL_DEFAULT_SENDER"] = "yourgmail@gmail.com"

mail = Mail(app)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')



@app.route("/contact", methods=["POST"])
def contact():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    # Build email
    msg = Message(
        subject=f" New message from {name}",
        recipients=["yourgmail@gmail.com"],  # where YOU receive messages
        body=f"From: {name} <{email}>\n\n{message}"
    )

    try:
        mail.send(msg)
        return jsonify({"success": True, "message": "Message sent successfully!"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500



# Dummy data for galleries and admin
galleries = {
    "gallery1": {
        "id": "gallery1",
        "clientName": "Alice",
        "pin": "1234",
        "images": ["img1.jpg", "img2.jpg"]
    },
    "gallery2": {
        "id": "gallery2",
        "clientName": "Bob",
        "pin": "5678",
        "images": ["img3.jpg", "img4.jpg"]
    }
}
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "password"

@app.route('/api/gallery/<gallery_id>', methods=['GET'])
def get_gallery(gallery_id):
    gallery = galleries.get(gallery_id)
    if gallery:
        # Don't send PIN to client
        data = {k: v for k, v in gallery.items() if k != "pin"}
        return jsonify(data), 200
    return jsonify({"error": "Gallery not found"}), 404

@app.route('/api/gallery/<gallery_id>/login', methods=['POST'])
def gallery_login(gallery_id):
    data = request.json
    pin = data.get("pin")
    gallery = galleries.get(gallery_id)
    if gallery and pin == gallery["pin"]:
        session[f"gallery_{gallery_id}_auth"] = True
        return jsonify({"success": True}), 200
    return jsonify({"success": False, "error": "Invalid PIN"}), 401

@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
        session["admin_authenticated"] = True
        return jsonify({"success": True}), 200
    return jsonify({"success": False, "error": "Invalid credentials"}), 401

@app.route('/api/admin/logout', methods=['POST'])
def admin_logout():
    session.pop("admin_authenticated", None)
    return jsonify({"success": True}), 200

@app.route('/api/admin/galleries', methods=['GET'])
def admin_galleries():
    if not session.get("admin_authenticated"):
        return jsonify({"error": "Unauthorized"}), 401
    # Return all galleries without PINs
    return jsonify([
        {k: v for k, v in g.items() if k != "pin"}
        for g in galleries.values()
    ]), 200

if __name__ == '__main__':
    app.run(debug=True)