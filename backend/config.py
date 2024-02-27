from flask import Flask
from flask_sqlalchemy import SQLAlchemy #converts our norml py code to sql
from flask_cors import CORS

app = Flask(__name__) #init flask
CORS(app) #enabling cross origin req

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db" #location of our local sqliite db
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app) 


