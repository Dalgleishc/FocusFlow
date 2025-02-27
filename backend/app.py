from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    # Mock data for now
    tasks = [
        {
            'id': 1,
            'title': 'Complete Math Assignment',
            'type': 'Study',
            'duration': 90
        },
        {
            'id': 2,
            'title': 'Read Chapter 5 for Biology',
            'type': 'Study',
            'duration': 60
        },
        {
            'id': 3,
            'title': 'Work on Project Presentation',
            'type': 'Work',
            'duration': 120
        }
    ]
    return jsonify(tasks)

@app.route('/api/tasks', methods=['POST'])
def create_task():
    data = request.get_json()
    # In a real app, we would save to database
    return jsonify({'success': True, 'task': data}), 201

if __name__ == '__main__':
    app.run(debug=True)
