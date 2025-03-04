import React, { useState } from 'react';
import './Tabs.css';

const ProductivityTab = ({ allTasks, completedTasks, onStartTask }) => {
  const [showCompleted, setShowCompleted] = useState(false);
  // only want today's (active) tasks
  const tasks = allTasks.filter((t) => {return t.active});
  
  // Calculate total focused time in minutes
  const calculateTotalFocusTime = () => {
    const completedSubtasks = completedTasks.flatMap(task => task.subTasks);
    return completedSubtasks.reduce((total, subtask) => total + subtask.duration, 0);
  };
  
  // Get all incomplete subtasks across all tasks
  const getAllSubtasks = () => {
    return tasks.flatMap(task => 
      task.subTasks.map(subtask => ({
        ...subtask,
        parentTaskId: task.id,
        parentTaskTitle: task.title,
        type: task.type
      }))
    );
  };
  
  // Get all completed subtasks
  const getAllCompletedSubtasks = () => {
    return completedTasks.flatMap(task => 
      task.subTasks.map(subtask => ({
        ...subtask,
        parentTaskId: task.id,
        parentTaskTitle: task.title,
        type: task.type
      }))
    );
  };
  
  const subtasks = getAllSubtasks();
  const completedSubtasks = getAllCompletedSubtasks();

  return (
    <div className="productivity-tab">
      <div className="focus-overview">
        <h2>Today's Productivity</h2>
        <div className="stats-container">
          <div className="stat-card">
            <h3>Focus Sessions</h3>
            <p className="stat-number">{completedSubtasks.length}</p>
          </div>
          <div className="stat-card">
            <h3>Total Focus Time</h3>
            <p className="stat-number">{calculateTotalFocusTime()} min</p>
          </div>
          <div className="stat-card">
            <h3>Tasks Completed</h3>
            <p className="stat-number">{completedTasks.length}</p>
          </div>
        </div>
      </div>
      
      <div className="task-breakdown">
        <div className="task-section-header">
          <h2>Focus Queue</h2>
          <div className="task-filter">
            <button 
              className={`filter-button ${!showCompleted ? 'active' : ''}`}
              onClick={() => setShowCompleted(false)}
            >
              Upcoming
            </button>
            <button 
              className={`filter-button ${showCompleted ? 'active' : ''}`}
              onClick={() => setShowCompleted(true)}
            >
              Completed
            </button>
          </div>
        </div>
        
        {!showCompleted ? (
          subtasks.length > 0 ? (
            <div className="subtasks-list">
              {subtasks.map((subtask, index) => (
                <div key={subtask.id} className={`subtask-card ${index === 0 ? 'next-up' : ''}`}>
                  {index === 0 && <div className="next-badge">Next Up</div>}
                  <div className="subtask-info">
                    <div className="subtask-details">
                      <h3>{subtask.title}</h3>
                      <p className="parent-task">From: {subtask.parentTaskTitle}</p>
                    </div>
                    <div className="subtask-meta">
                      <span className={`task-type ${subtask.type.toLowerCase()}`}>
                        {subtask.type}
                      </span>
                      <span className="duration">{subtask.duration} min</span>
                    </div>
                  </div>
                  <button 
                    className="start-focus-button"
                    onClick={() => onStartTask(subtask.parentTaskId, subtask.id)}
                  >
                    Start Focus
                  </button>
                </div>
              ))}
              
              <div className="breaks-reminder">
                <h3>Remember to take breaks!</h3>
                <p>Short breaks help maintain focus and productivity</p>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <p>No tasks in your focus queue</p>
              <p className="empty-subtext">Add some tasks in the Scheduling tab</p>
            </div>
          )
        ) : (
          completedSubtasks.length > 0 ? (
            <div className="subtasks-list completed-list">
              {completedSubtasks.map(subtask => (
                <div key={subtask.id} className="subtask-card completed">
                  <div className="subtask-info">
                    <div className="subtask-details">
                      <h3>{subtask.title}</h3>
                      <p className="parent-task">From: {subtask.parentTaskTitle}</p>
                    </div>
                    <div className="subtask-meta">
                      <span className={`task-type ${subtask.type.toLowerCase()}`}>
                        {subtask.type}
                      </span>
                      <span className="duration">{subtask.duration} min</span>
                      <span className="completed-time">Completed today</span>
                    </div>
                  </div>
                  <div className="completion-badge">
                    <i className="fas fa-check-circle"></i>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No completed tasks yet</p>
              <p className="empty-subtext">Complete tasks to see them here</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProductivityTab;