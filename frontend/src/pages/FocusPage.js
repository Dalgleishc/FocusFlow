import React, { useState, useEffect } from 'react';
import './FocusPage.css';
import SchedulingTab from '../components/Tabs/SchedulingTab';
import ProductivityTab from '../components/Tabs/ProductivityTab';
import LeaderboardTab from '../components/Tabs/LeaderboardTab';
import FlowerTimer from '../components/FocusTimer/FlowerTimer';

const FocusPage = ({ selectedDate, onBack, tasks, setTasks }) => {
  const [activeTab, setActiveTab] = useState('scheduling');
  const [currentTask, setCurrentTask] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);

  // Simulating fetching user's tasks for the selected date
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchUserTasks = async () => {
      // Simulated data - in a real app, you'd fetch from the backend
      
      // let mockTasks = [
      //   { 
      //     id: 1, 
      //     title: 'Complete Math Assignment', 
      //     type: 'Study',
      //     duration: 90, // in minutes
      //     subTasks: [] // Will be populated by the task splitter
      //   },
      //   { 
      //     id: 2, 
      //     title: 'Read Chapter 5 for Biology', 
      //     type: 'Study',
      //     duration: 60,
      //     subTasks: []
      //   },
      //   { 
      //     id: 3, 
      //     title: 'Work on Project Presentation', 
      //     type: 'Work',
      //     duration: 120,
      //     subTasks: []
      //   }
      // ];
      // mockTasks[3] = tasks[0];
      
      // Split tasks into 25-minute chunks (a simple implementation of the task splitter)
      const processedTasks = tasks.map(task => {
        const numSubTasks = Math.ceil(task.duration / 25); // TODO
        // To this for debugging:
        // const numSubTasks = Math.ceil(task.duration / 1); 
        const subTasks = [];

        // only activate task if it's for today
        const dateTest = task.date.getFullYear() === selectedDate.getFullYear() &&
         task.date.getMonth() === selectedDate.getMonth() &&
         task.date.getDate() === selectedDate.getDate();
        dateTest ? task.active = true : task.active = false;
        
        for (let i = 0; i < numSubTasks; i++) {
          let subTaskDuration = 25;
          if (i === numSubTasks - 1 && task.duration % 25 !== 0) {
            subTaskDuration = task.duration % 25;
          }
        // And also change the subtask duration assignment:
            // let subTaskDuration = 1; // Changed from 25 for debugging
            // if (i === numSubTasks - 1 && task.duration % 1 !== 0) {
            // subTaskDuration = task.duration % 1;
            // }
          
          subTasks.push({
            id: `${task.id}-${i+1}`,
            title: `${task.title} (Part ${i+1}/${numSubTasks})`,
            duration: subTaskDuration,
            completed: false
          });
        }
        
        return {
          ...task,
          subTasks
        };
      });
      
      setTasks(processedTasks);
    };
    
    fetchUserTasks();
  }, []);

  const handleTaskComplete = (taskId, subTaskId) => {
    // Mark subtask as completed
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          const updatedSubTasks = task.subTasks.map(subTask => {
            if (subTask.id === subTaskId) {
              return { ...subTask, completed: true };
            }
            return subTask;
          });
          
          // Check if all subtasks are completed
          const allCompleted = updatedSubTasks.every(subTask => subTask.completed);
          
          // If all subtasks are completed, move the task to completed tasks
          if (allCompleted) {
            setCompletedTasks(prev => [...prev, { ...task, subTasks: updatedSubTasks }]);
            return null; // Remove from active tasks
          }
          
          return { ...task, subTasks: updatedSubTasks };
        }
        return task;
      }).filter(Boolean) // Remove null entries (completed tasks)
    );
    
    // End the current session
    setIsTimerRunning(false);
    
    // Start a break
    setIsOnBreak(true);
    
    // After 5 minutes (in a real app), the break would end
    setTimeout(() => {
      setIsOnBreak(false);
      setCurrentTask(null);
    }, 5000); // Using 5 seconds for demo purposes
  };

  const startTask = (taskId, subTaskId) => {
    // Find the task and subtask
    const task = tasks.find(t => t.id === taskId);
    const subTask = task?.subTasks.find(st => st.id === subTaskId);
    
    if (task && subTask) {
      setCurrentTask({ 
        taskId, 
        subTaskId, 
        title: subTask.title, 
        duration: subTask.duration 
      });
      setIsTimerRunning(true);
    }
  };

  return (
    <div className="focus-page">
      <div className="focus-header">
        <button className="back-button" onClick={onBack}>← Back to Calendar</button>
        <h1>Focus Mode - {selectedDate?.toDateString()}</h1>
      </div>
      
      <div className="tabs-container">
        <div className="tabs-header">
          <button 
            className={`tab-button ${activeTab === 'scheduling' ? 'active' : ''}`}
            onClick={() => setActiveTab('scheduling')}
          >
            Scheduling
          </button>
          <button 
            className={`tab-button ${activeTab === 'productivity' ? 'active' : ''}`}
            onClick={() => setActiveTab('productivity')}
          >
            Productivity
          </button>
          <button 
            className={`tab-button ${activeTab === 'leaderboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('leaderboard')}
          >
            Leaderboard
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'scheduling' && (
            <SchedulingTab 
              allTasks={tasks}
              completedTasks={completedTasks}
              onStartTask={startTask}
            />
          )}
          
          {activeTab === 'productivity' && (
            <ProductivityTab 
              allTasks={tasks}
              completedTasks={completedTasks}
              onStartTask={startTask}
            />
          )}
          
          {activeTab === 'leaderboard' && (
            <LeaderboardTab />
          )}
        </div>
      </div>
      
      {/* Timer display always visible at the bottom */}
      <div className="timer-container">
        {currentTask ? (
          <>
            <div className="current-task-info">
              <h3>{isOnBreak ? 'Break Time!' : currentTask.title}</h3>
              <p>{isOnBreak ? 'Relax for 5 minutes' : `Focus for ${currentTask.duration} minutes`}</p>
            </div>
            <FlowerTimer 
              duration={isOnBreak ? 5 : currentTask.duration}
              isRunning={isTimerRunning || isOnBreak}
              isBreak={isOnBreak}
              onComplete={() => {
                if (!isOnBreak) {
                  handleTaskComplete(currentTask.taskId, currentTask.subTaskId);
                } else {
                  setIsOnBreak(false);
                  setCurrentTask(null);
                }
              }}
            />
            {!isOnBreak && (
              <button 
                className="complete-task-button"
                onClick={() => handleTaskComplete(currentTask.taskId, currentTask.subTaskId)}
              >
                Mark as Complete
              </button>
            )}
          </>
        ) : (
          <div className="no-task-message">
            <h3>No task in progress</h3>
            <p>Select a task from the Scheduling or Productivity tab to get started</p>
          </div>
        )}
      </div>
      {/* fixing this soon */}
      <button 
        className="seed-button"
        onClick={() => handleTaskComplete(currentTask.taskId, currentTask.subTaskId)}
      >
        <img src="/seedbag.png" alt="seedbag">
        </img>
        <div className="petals" style={{ 
            transform: `scale(.25)`
          }}>
          <div className="petal petal-1"></div>
          <div className="petal petal-2"></div>
          <div className="petal petal-3"></div>
          <div className="petal petal-4"></div>
          <div className="petal petal-5"></div>
          <div className="petal petal-6"></div>
          <div className="petal petal-center"></div>
        </div>
      </button>
    </div>
  );
};

export default FocusPage;