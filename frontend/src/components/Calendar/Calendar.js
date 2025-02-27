import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = ({ onDaySelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState({});
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    type: 'Work', // Default type
    startTime: '',
    endTime: '',
    repeats: {
      isRepeating: false,
      days: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
      }
    }
  });

  // Move to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Move to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Get the days in the current month
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = [];

    // Get the first day of the month
    const firstDay = new Date(year, month, 1).getDay();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const handleDayClick = (day) => {
    if (!day) return; // Don't do anything for empty cells
    
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
    
    // Always show modal with start button
    setShowTaskModal(true);
  };

  const handleTaskSubmit = () => {
    if (!selectedDate || !newTask.title) return;
    
    const dateKey = selectedDate.toISOString().split('T')[0];
    
    // Add the new task to the tasks state
    setTasks(prevTasks => ({
      ...prevTasks,
      [dateKey]: [...(prevTasks[dateKey] || []), { ...newTask, id: Date.now() }]
    }));
    
    // Reset the new task form
    setNewTask({
      title: '',
      type: 'Work',
      startTime: '',
      endTime: '',
      repeats: {
        isRepeating: false,
        days: {
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false
        }
      }
    });
    
    // Close the modal
    setShowTaskModal(false);
  };

  const formatMonth = () => {
    return currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  // Check if a day has tasks
  const hasTask = (day) => {
    if (!day) return false;
    const dateKey = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
    return tasks[dateKey] && tasks[dateKey].length > 0;
  };

  // Check if a day is today
  const isToday = (day) => {
    if (!day) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>{formatMonth()}</h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      
      <div className="weekdays">
        <div>Sunday</div>
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
        <div>Saturday</div>
      </div>
      
      <div className="days">
        {getDaysInMonth().map((day, index) => (
          <div 
            key={index} 
            className={`day-cell ${!day ? 'empty' : ''} ${isToday(day) ? 'today' : ''} ${hasTask(day) ? 'has-task' : ''}`}
            onClick={() => handleDayClick(day)}
          >
            {day}
            {hasTask(day) && <div className="task-indicator"></div>}
          </div>
        ))}
      </div>
      
      {showTaskModal && (
        <div className="task-modal-overlay">
          <div className="task-modal">
            <h3>Day: {selectedDate?.toDateString()}</h3>
            
            {/* Start Focus Session button */}
            <div className="start-focus-container">
              <button 
                className="start-focus-button"
                onClick={() => {
                  if (onDaySelect) {
                    onDaySelect(selectedDate);
                  }
                  setShowTaskModal(false);
                }}
              >
                Start Focus Session
              </button>
            </div>
            
            <div className="task-form-container">
              <h4>Add New Task</h4>
              <div className="form-group">
                <label>Task Title:</label>
                <input 
                  type="text" 
                  value={newTask.title} 
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="Enter task title"
                />
              </div>
              
              <div className="form-group">
                <label>Event Type:</label>
                <select 
                  value={newTask.type} 
                  onChange={(e) => setNewTask({...newTask, type: e.target.value})}
                >
                  <option value="Work">Work</option>
                  <option value="Study">Study</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>
              
              <div className="form-group time-inputs">
                <div>
                  <label>Start Time:</label>
                  <input 
                    type="time" 
                    value={newTask.startTime} 
                    onChange={(e) => setNewTask({...newTask, startTime: e.target.value})}
                  />
                </div>
                <div>
                  <label>End Time:</label>
                  <input 
                    type="time" 
                    value={newTask.endTime} 
                    onChange={(e) => setNewTask({...newTask, endTime: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>
                  <input 
                    type="checkbox" 
                    checked={newTask.repeats.isRepeating} 
                    onChange={(e) => setNewTask({
                      ...newTask, 
                      repeats: {
                        ...newTask.repeats,
                        isRepeating: e.target.checked
                      }
                    })} 
                  />
                  Repeats weekly
                </label>
              </div>
              
              {newTask.repeats.isRepeating && (
                <div className="repeat-days">
                  {Object.keys(newTask.repeats.days).map(day => (
                    <label key={day}>
                      <input 
                        type="checkbox" 
                        checked={newTask.repeats.days[day]} 
                        onChange={(e) => setNewTask({
                          ...newTask, 
                          repeats: {
                            ...newTask.repeats,
                            days: {
                              ...newTask.repeats.days,
                              [day]: e.target.checked
                            }
                          }
                        })} 
                      />
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </label>
                  ))}
                </div>
              )}
              
              <div className="modal-buttons">
                <button onClick={handleTaskSubmit}>Add Task</button>
                <button onClick={() => setShowTaskModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;