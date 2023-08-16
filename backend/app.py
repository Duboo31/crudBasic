from pymongo import MongoClient
from bson.objectid import ObjectId
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)
client = MongoClient(
    'mongodb+srv://sparta:test@cluster0.svk42ds.mongodb.net/?retryWrites=true&w=majority')
db = client.dbToDo
todos = db.toDo

# index.html 연결 코드
@app.route('/')
def hello():
    return render_template('index.html')

# 생성 post 요청
@app.route('/createTodo', methods=['POST'])
def toDo_create():
    todo_receive = request.form['todo_give']

    doc = {
        'todo': todo_receive,
    }
    todos.insert_one(doc)
    print('post toDo 저장', doc)
    return jsonify({'msg': 'app.py > post 요청 create'})

# 읽기 get 요청
@app.route("/readToDo", methods=["GET"])
def toDo_get():
    all_todo = list(todos.find({},{'_id':False}))

    return jsonify({'msg': all_todo})

# 삭제 delete 요청
@app.route('/deleteTodo', methods=['DELETE'])
def toDo_delete():
    todo_receive = request.form['todo_give']
    todos.delete_one({'todo': todo_receive})
    return jsonify({'msg': 'app.py > delete 요청'})

# 수정 post 요청
@app.route('/updateToDo', methods=['POST'])
def toDo_update():
    currentToDo_receive = request.form['current_todo']
    todo_receive = request.form['todo_change']

    todos.update_one({'todo': currentToDo_receive},{'$set':{'todo': todo_receive}})
    return jsonify({'msg': 'app.py > post 요청 update'})

if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)