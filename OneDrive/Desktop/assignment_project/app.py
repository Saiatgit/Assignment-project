from flask import Flask, render_template, request, redirect
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient("mongodb+srv://testuser:test123@cluster0.dsdgkln.mongodb.net/?retryWrites=true&w=majority")

db = client["testdb"]
collection = db["users"]

@app.route('/')
def home():
    return "App is running"

@app.route('/todo')
def todo():
    return render_template('todo.html')

@app.route('/submittodoitem', methods=['POST'])
def submittodoitem():
    try:
        item = request.form['itemName']
        desc = request.form['itemDescription']

        collection.insert_one({
            "item": item,
            "description": desc
        })

        return "Item added successfully"

    except Exception as e:
        return "Error: " + str(e)

if __name__ == "__main__":
    app.run(debug=True)
