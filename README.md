# FocusFlow

FocusFlow is a web-based application designed to help college students with attention-affecting conditions such as ADHD, ADD, and ASD stay focused, organized, and productive.

## Features

- **Calendar Interface**: Plan your tasks and assignments with an intuitive calendar view
- **Task Breakdown System**: Automatically divides large tasks into manageable 20-30 minute chunks
- **Visual Timer**: Engaging flower animation that grows as you make progress on your tasks
- **Social Accountability**: Leaderboard to compete with friends and maintain motivation
- **Productivity Analytics**: Track your progress and identify trends in your work habits
- **Break Management**: Built-in break reminders following the Pomodoro technique

## Prerequisites

Before setting up FocusFlow, ensure you have the following installed on your system:

### For Frontend Development
- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

### For Backend Development
- **Python** (v3.8 or higher)
- **pip** (Python package manager)
- **Git** (for version control)

## Detailed Setup Instructions

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/<username>/FocusFlow.git
   cd FocusFlow
   ```

2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a development build and start the development server:
   ```bash
   npm start
   ```

5. The application will open automatically in your default browser at `http://localhost:3000`

### Backend Setup

1. From the project root, navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a Python virtual environment:
   ```bash
   # On Windows
   python -m venv venv
   
   # On macOS/Linux
   python3 -m venv venv
   ```

3. Activate the virtual environment:
   ```bash
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

4. Install backend dependencies:
   ```bash
   pip install flask flask-cors flask-sqlalchemy
   ```

5. (Optional) Save dependencies to requirements file:
   ```bash
   pip freeze > requirements.txt
   ```

6. Start the Flask server:
   ```bash
   python app.py
   ```

7. The backend API will be available at `http://localhost:5000`

## Project Structure

```
FocusFlow/
├── frontend/               # React frontend
│   ├── public/             # Static files
│   └── src/                # Source code
│       ├── components/     # React components
│       │   ├── Calendar/   # Calendar components
│       │   ├── FocusTimer/ # Timer with flower animation
│       │   └── Tabs/       # Tab components
│       ├── pages/          # Page components
│       └── App.js          # Main application component
│
├── backend/                # Python Flask backend
│   ├── app.py              # Main Flask application
│   ├── routes/             # API routes
│   └── utils/              # Utility functions
│       └── task_splitter.py # Logic for task breakdown
│
└── README.md               # Project documentation
```

## Development

### Running in Development Mode

When running the application in development mode, you need to have both the frontend and backend servers running simultaneously:

1. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

2. In a separate terminal, start the backend server:
   ```bash
   cd backend
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   python app.py
   ```

## Troubleshooting

### Common Issues

1. **Node.js dependency errors**:
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules folder and reinstall: `rm -rf node_modules && npm install`

2. **Python virtual environment issues**:
   - Ensure you've activated the virtual environment before running pip commands
   - If packages are not found, try reinstalling them within the activated environment

3. **Port conflicts**:
   - If port 3000 or 5000 is already in use, you can modify the ports:
     - For React: Set environment variable `PORT=3001 npm start`
     - For Flask: Modify the port in app.py, change `app.run(debug=True)` to `app.run(debug=True, port=5001)`

## Contributing

This project is part of a university assignment. Contributions should follow the project requirements and coding standards.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request


## Acknowledgments

- University of Chicago project team members
- Survey participants who provided valuable insights
