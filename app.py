#!/usr/bin/python3
import werkzeug
from home import homedir
from pymongo import MongoClient
from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
from FS import FS
from vmconn import ConPool


client = MongoClient('localhost', 27017)
docs_db = client.db.docs
mods_db = client.db.mods
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@app.route('/')
def process():
    return render_template('dashboard.html')


@app.route('/getfiles')
def retfiles():
    uid = request.args.get("uid")
    return FS(uid).get_file_list()


@app.route('/getfile')
def retfile():
    uid = request.args.get("uid")
    fname = request.args.get("name")
    return FS(uid).get_file_content(fname)


@app.route('/save_file', methods=["POST", "GET"])
def savefile():
    uid = request.args.get("uid")
    fname = request.args.get("fname")
    fcontent = request.get_data()
    FS(uid).save_file(fname, fcontent)
    return "success"


@socketio.on("command")
def connect(o):
    uid = o["uid"]
    fname = o["fname"]
    print(o)
    ConPool.get_connection(uid).react(f'launch {fname}', socketio)


if __name__ == "__main__":
    socketio.run(app)

