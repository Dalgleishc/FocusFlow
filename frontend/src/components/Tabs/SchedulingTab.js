import React from 'react';
import './Tabs.css';

const SchedulingTab = ({ allTasks, completedTasks, onStartTask }) => {
  // only want today's (active) tasks
  const tasks = allTasks.filter((t) => {return t.active});

  return (
    <div className="scheduling-tab">
      <div className="focus-overview">
        <h2>Focus Overview</h2>
        <div className="stats-container">
          <div className="stat-card">
            <h3>Tasks for Today</h3>
            <p className="stat-number">{tasks.length}</p>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <p className="stat-number">{completedTasks.length}</p>
          </div>
          <div className="stat-card">
            <h3>Progress</h3>
            <p className="stat-number">
              {tasks.length + completedTasks.length > 0 
                ? Math.round((completedTasks.length / (tasks.length + completedTasks.length)) * 100) 
                : 0}%
            </p>
          </div>
        </div>
      </div>

      <div className="schedule-container">
        <h2>Your Schedule</h2>
        
        {tasks.length > 0 ? (
          <div className="tasks-list">
            {tasks.map(task => (
              <div key={task.id} className="task-card">
                <div className="task-header">
                  <h3>{task.title}</h3>
                  <span className={`task-type ${task.type.toLowerCase()}`}>
                    {task.type}
                  </span>
                </div>
                
                <div className="task-duration">
                  <i className="fas fa-clock"></i> {task.duration} minutes total
                </div>
                
                <div className="subtasks-container">
                  <h4>Subtasks</h4>
                  {task.subTasks.map(subTask => (
                    <div key={subTask.id} className="subtask-item">
                      <span className="subtask-title">{subTask.title}</span>
                      <span className="subtask-duration">{subTask.duration} min</span>
                      {!subTask.completed && (
                        <button 
                          className="start-task-button"
                          onClick={() => onStartTask(task.id, subTask.id)}
                        >
                          Start
                        </button>
                      )}
                      {subTask.completed && (
                        <span className="completed-badge">Completed</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No tasks scheduled for today</p>
            <button className="add-task-button">Add a Task</button>
          </div>
        )}
        
        {completedTasks.length > 0 && (
          <div className="completed-tasks-section">
            <h2>Completed Tasks</h2>
            <div className="tasks-list">
              {completedTasks.map(task => (
                <div key={task.id} className="task-card completed">
                  <div className="task-header">
                    <h3>{task.title}</h3>
                    <span className={`task-type ${task.type.toLowerCase()}`}>
                      {task.type}
                    </span>
                  </div>
                  <div className="completion-badge">
                    <i className="fas fa-check-circle"></i> Completed
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulingTab;