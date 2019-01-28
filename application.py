import os
from flask import Flask, flash, jsonify, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from werkzeug.security import check_password_hash, generate_password_hash
import json
from cs50 import SQL

# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# load database
db = SQL('sqlite:///mbfw.db')

# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.route("/")
def dashboard():
    return render_template("index.html")

@app.route("/orders")
def orders():
    return render_template("orders.html")

@app.route("/products", methods=["GET","POST"])
def products():
    if request.method == "POST":
        product = json.loads(request.data.decode('utf8'))
        data = db.execute("SELECT * FROM products")
        print(product)
        print(data)
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
    return render_template("products.html") 