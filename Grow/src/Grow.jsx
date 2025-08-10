import React from "react";
import "./Grow.css";

const Grow = () => {
  return (
    <div className="grow-page">
      <div className="grow-container">
        <h1>Welcome to Grow</h1>
        <p>You have successfully logged in!</p>
        <div className="grow-content">
          <h2>Start Growing Today</h2>
          <p>This is your personal growth dashboard where you can track your progress and achieve your goals.</p>
          <div className="features">
            <div className="feature-card">
              <h3>Track Progress</h3>
              <p>Monitor your daily activities and see your growth over time.</p>
            </div>
            <div className="feature-card">
              <h3>Set Goals</h3>
              <p>Define clear objectives and work towards achieving them.</p>
            </div>
            <div className="feature-card">
              <h3>Stay Motivated</h3>
              <p>Get inspired with personalized insights and progress reminders.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grow;
