import React, { useState } from 'react';
import CalendarPage from './pages/CalendarPage';
import FocusPage from './pages/FocusPage';
import './App.css';

function App() {
  const [page, setPage] = useState('calendar');
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [calendarTasks, setCalendarTasks] = useState({});
  
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
        <CalendarPage onDaySelect={handleDaySelect} tasks={tasks} setTasks={setTasks} calendarTasks={calendarTasks} setCalendarTasks={setCalendarTasks}/>
      ) : (
        <FocusPage 
          selectedDate={selectedDate} 
          onBack={handleBackToCalendar}
          tasks={tasks}
          setTasks={setTasks} 
        />
      )}
    </div>
  );
}

export default App;