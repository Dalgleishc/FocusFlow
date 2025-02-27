import React from 'react';
import Calendar from '../components/Calendar/Calendar';

const CalendarPage = ({ onDaySelect }) => {
  return (
    <div className="calendar-page">
      <h1>FocusFlow Calendar</h1>
      <Calendar onDaySelect={onDaySelect} />
    </div>
  );
};

export default CalendarPage;