import os
from flask import Flask, flash, jsonify, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from werkzeug.security import check_password_hash, generate_password_hash
import json
from cs50 import SQL
import urllib

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
        updated_product = json.loads(request.data.decode('utf8'))
        db.execute( """ INSERT OR REPLACE INTO products
                        VALUES (:id,:name,:price,:stock)""",
                        id=updated_product['id'], name=updated_product['name'], 
                        price=updated_product['price'], stock=updated_product['stock'])
        
        for data in updated_product["discount_levels"]:
            db.execute("""  INSERT OR REPLACE INTO discount_levels
                            VALUES (:product_id, :quantity, :discount)""",
                            product_id=updated_product['id'], quantity=data["quantity"], discount=data["discount"])
      
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
    
    products = db.execute("SELECT * FROM products")
    for item in products:
        discount_levels = db.execute("SELECT * FROM discount_levels WHERE product_id = :product_id", product_id = item["id"])
        item["discount_levels"] = [{"product_id": item["id"], "quantity": level["quantity"], 
                                    "discount": level["discount"]} for level in discount_levels]
    data = {"data": products}

    # data = json.dumps(data)

    print(data)
    return render_template("products.html", products=data) 

if __name__ == '__main__':
    app.run(debug=True)
