import React, { useState, useEffect, useRef } from 'react';
import './FlowerTimer.css';

const FlowerTimer = ({ duration, isRunning, isBreak, onComplete }) => {
  const [timeRemaining, setTimeRemaining] = useState(duration * 60); // Convert minutes to seconds
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const totalTime = duration * 60; // Total duration in seconds

  useEffect(() => {
    // Reset timer when duration changes
    setTimeRemaining(duration * 60);
    if (!isBreak) {
      setProgress(0);
    } else {
      // Show full flower on break
      setProgress(100);
    }
  }, [duration, isBreak]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
        
        // Update progress percentage, only on focus mode
        if (!isBreak) {
          setProgress(prev => {
          const newProgress = 100 - ((timeRemaining - 1) / totalTime * 100);
          return Math.min(newProgress, 100); // Ensure we don't exceed 100%
        });
        }
        
      }, 1000);
    } else {
      // Clear the interval when the timer is paused
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, timeRemaining, totalTime, onComplete, isBreak]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate flower growth stage based on progress
  const getFlowerStage = () => {
    if (isBreak) {
      return 'bloomed'; // Fully bloomed during break
    }
    
    if (progress < 25) {
      return 'seed';
    } else if (progress < 50) {
      return 'sprout';
    } else if (progress < 75) {
      return 'bud_stage';
    } else if (progress < 100) {
      return 'bloom';
    } else {
      return 'bloomed';
    }
  };

  return (
    <div className="flower-timer">
      <div className="time-display">
        {formatTime(timeRemaining)}
      </div>
      
      <div className="flower-container">
        <div className={`flower ${getFlowerStage()} ${isBreak ? 'break-time' : ''}`}>
          {/* Flower Stem */}
          <div className="stem" style={{ height: `${Math.min(80, progress * 0.8)}%` }}></div>
          
          {/* Leaves - only appear after 25% progress */}
          {progress > 25 && <div className="leaf left" style={{transform: `rotate(${progress % 15}deg)`}}></div>}
          {progress > 40 && <div className="leaf right" style={{transform: `rotate(-${progress % 15}deg)`}}></div>}
          {progress > 55 && <div className="leaf left" style={{bottom: '40%', 
                                                              transform: `rotate(${progress % 15}deg)`}}></div>}
          {progress > 70 && <div className="leaf right" style={{bottom: '48%',
                                                              transform: `rotate(-${progress % 15}deg)`}}></div>}
          
          {/* Flower Bud - starts appearing at 50% progress */}
          {progress > 50 && (
            <div className="bud" style={{ 
              transform: `scale(${Math.min(1, (progress - 50) / 50)})`,
              opacity: Math.min(1, (progress - 50) / 30),
              bottom: `${Math.min(80, progress * 0.8) - 5}%`
            }}></div>
          )}
          
          {/* Flower Petals - start appearing at 75% progress */}
          {progress > 75 && (
            <div className="petals" style={{ 
              transform: `scale(${Math.min(1, (progress - 75) / 25)})`,
              opacity: Math.min(1, (progress - 75) / 25),
              bottom: `${Math.min(80, progress * 0.8) - 8}%`
            }}>
              <div className="petal petal-1"></div>
              <div className="petal petal-2"></div>
              <div className="petal petal-3"></div>
              <div className="petal petal-4"></div>
              <div className="petal petal-5"></div>
              <div className="petal petal-6"></div>
            </div>
          )}
        </div>
      </div>
      
      <div className="progress-text">
        {isBreak 
          ? 'Enjoy your break!' 
          : progress < 100 
            ? `${Math.round(progress)}% complete` 
            : 'Task complete!'}
      </div>
    </div>
  );
};

export default FlowerTimer;