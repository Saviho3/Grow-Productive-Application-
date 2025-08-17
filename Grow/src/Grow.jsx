import React, { useState } from "react";
import "./Grow.css";



const Grow = () => {

  const [userTask, setUserTask] = useState('');
  const [task, setTask] = useState('');
  const [taskData, setTaskData] = useState(null);
  const [taskName, setTaskName] = useState('')
  const[taskTime, setTaskTime] = useState('')
  const[taskStatus, setTaskStatus] = useState('')


  const callPython = async (userTask) => {
    try {
      const response = await fetch("/grow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: userTask }),
      });

      const data = await response.json();
      setTaskData(data);
      setTaskName(data.result.name);
      setTaskTime(data.result.time)
      setTaskStatus(data.result.status);
    } catch (error) {
      console.error("Error calling Python backend:", error);
    }
  };


  return (
    <div className="grow-page">
      <div className="grow-container">
        <h1>Welcome to Grow</h1>
        <p>You have successfully logged in!</p>
        <input className="task-text" 
        type="text" 
        placeholder="Please enter a task"
        onChange={(e) => setUserTask(e.target.value)}/>
        <button 
        type='submit'
        onClick={() => callPython(userTask)}
        >Submit</button>
        {taskData && (
          <div className="response-box">
            <p>Server Response: {JSON.stringify(taskData)}</p>
            <p>Task Name: {taskName}</p>
            <p>Status: {taskStatus}</p>
            <p>Time: {taskTime} minutes</p>

          </div>
        )}
      </div>
      
    </div>
  );
};

export default Grow;
