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