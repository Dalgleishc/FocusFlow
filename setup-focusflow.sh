#!/bin/bash

# FocusFlow Project Setup Script
# This script will set up the entire FocusFlow project structure

echo "🚀 Setting up FocusFlow project..."

# Clone the repository if not already in it
if [ ! -d ".git" ]; then
  echo "Cloning the repository..."
  git clone https://github.com/Dalgleishc/FocusFlow.git
  cd FocusFlow
fi

# Create frontend structure
echo "📁 Creating frontend structure..."
mkdir -p frontend/public
mkdir -p frontend/src/components/Calendar
mkdir -p frontend/src/components/TaskManagement
mkdir -p frontend/src/components/FocusTimer
mkdir -p frontend/src/components/Tabs
mkdir -p frontend/src/components/Leaderboard
mkdir -p frontend/src/pages
mkdir -p frontend/src/contexts
mkdir -p frontend/src/hooks
mkdir -p frontend/src/services

# Create backend structure
echo "📁 Creating backend structure..."
mkdir -p backend/routes
mkdir -p backend/utils

# Initialize React app
echo "⚛️ Initializing React app..."
cd frontend
npx create-react-app .
cd ..

# Create Python backend with Flask
echo "🐍 Setting up Python backend..."
cd backend
python3 -m venv venv
if [ $? -ne 0 ]; then
  echo "Failed to create virtual environment. Make sure Python is installed."
  exit 1
fi

# Activate virtual environment based on OS
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
  source venv/Scripts/activate
else
  source venv/bin/activate
fi

# Install backend dependencies
pip install flask flask-cors flask-sqlalchemy
pip freeze > requirements.txt

# Create basic Flask app
cat > app.py << 'EOF'
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
EOF

# Create task splitter utility
cat > utils/task_splitter.py << 'EOF'
def split_task(task, chunk_size=25):
    """
    Split a task into manageable chunks of specified size (in minutes)
    
    Args:
        task (dict): Task to split
        chunk_size (int): Size of each chunk in minutes
    
    Returns:
        list: List of subtasks
    """
    duration = task.get('duration', 0)
    if duration <= 0:
        return []
    
    num_chunks = (duration + chunk_size - 1) // chunk_size  # Ceiling division
    subtasks = []
    
    for i in range(num_chunks):
        # Calculate chunk duration (last chunk might be shorter)
        chunk_duration = min(chunk_size, duration - (i * chunk_size))
        
        subtask = {
            'id': f"{task['id']}-{i+1}",
            'title': f"{task['title']} (Part {i+1}/{num_chunks})",
            'duration': chunk_duration,
            'completed': False
        }
        subtasks.append(subtask)
    
    return subtasks
EOF

cd ..

# Create React components
echo "🧩 Creating React components..."

# App.js
cat > frontend/src/App.js << 'EOF'
import React, { useState } from 'react';
import CalendarPage from './pages/CalendarPage';
import FocusPage from './pages/FocusPage';
import './App.css';

function App() {
  const [page, setPage] = useState('calendar');
  const [selectedDate, setSelectedDate] = useState(null);
  
  const handleDaySelect = (date) => {
    setSelectedDate(date);
    setPage('focus');
  };
  
  const handleBackToCalendar = () => {
    setPage('calendar');
  };
  
  return (
    <div className="App">
      {page === 'calendar' ? (
        <CalendarPage onDaySelect={handleDaySelect} />
      ) : (
        <FocusPage 
          selectedDate={selectedDate} 
          onBack={handleBackToCalendar} 
        />
      )}
    </div>
  );
}

export default App;
EOF

# Create CSS files
echo "🎨 Creating CSS files..."

# App.css
cat > frontend/src/App.css << 'EOF'
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f9f9f9;
}

.App {
  min-height: 100vh;
}
EOF

# Update index.js to include Font Awesome
cat > frontend/src/index.js << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
EOF

# Update package.json to add required dependencies
cd frontend
npm install react-router-dom axios

# Create a basic README.md
echo "📝 Creating README.md..."
cat > ../README.md << 'EOF'
# FocusFlow

FocusFlow is a web-based application designed to help college students with attention-affecting conditions stay focused, organized, and productive.

## Features

- Calendar view for task planning
- Task breakdown into manageable chunks
- Visual timer with growing flower animation
- Social accountability through leaderboard
- Productivity tracking

## Setup Instructions

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

### Backend Setup

```bash
cd backend
# Create a virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
python app.py
```

## Project Structure

- `frontend/`: React application
- `backend/`: Python Flask backend

## Contributing

This project is part of a university assignment. Contributions should follow the project requirements.

EOF

cd ..

echo "✅ FocusFlow project setup complete!"
echo "To start the frontend: cd frontend && npm start"
echo "To start the backend: cd backend && source venv/bin/activate && python app.py"

# Initialize git repository if not already one
if [ ! -d ".git" ]; then
  git init
  git add .
  git commit -m "Initial project setup"
  git branch -M main
  git remote add origin https://github.com/Dalgleishc/FocusFlow.git
  
  echo "🔄 Ready to push to GitHub. Run: git push -u origin main"
else
  git add .
  git commit -m "Project setup with script"
  
  echo "🔄 Changes committed. Push to GitHub with: git push"
fi
