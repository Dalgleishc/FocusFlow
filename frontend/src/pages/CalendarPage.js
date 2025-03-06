import React from 'react';
import Calendar from '../components/Calendar/Calendar';
import { useState } from 'react';

const CalendarPage = ({ onDaySelect, tasks, setTasks, calendarTasks, setCalendarTasks }) => {
  

  return (
    <div className="calendar-page">
      <h1>FocusFlow Calendar</h1>
      <Calendar onDaySelect={onDaySelect} rootTasks={tasks} setRootTasks={setTasks} tasks={calendarTasks} setTasks={setCalendarTasks}/>
    </div>
  );
};

export default CalendarPage;