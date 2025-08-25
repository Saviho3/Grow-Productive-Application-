import React, { useState } from "react";
import "../styles/Grow.css";
import {FaSpinner} from 'react-icons/fa';
import { supabase } from '../supabaseClient.js'



const Grow = () => {

  const [userTask, setUserTask] = useState('');
  const [task, setTask] = useState('');
  const [taskData, setTaskData] = useState(null);
  const [taskName, setTaskName] = useState('')
  const[taskTime, setTaskTime] = useState('')
  const[taskStatus, setTaskStatus] = useState('')
  const[loading, setLoading] = useState(false)


  const callPython = async (userTask) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/grow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: userTask }),
      });

      const data = await response.json();
      setTaskData(data);
      setTaskName(data.name);
      setTaskTime(data.time)
      setTaskStatus(data.status);

      if (data.status == "not-exists") {
        await configureSupabase(data.name, data.time);
      }

    } catch (error) {
      console.error("Error calling Python backend:", error);
    } finally {
      setLoading(false);
    }

    
  };


  async function configureSupabase(task_name, task_time) {
    const {error} = await supabase.from("tasks").upsert({
      "name": task_name,
      "time": task_time,
    },
      {onConflict: 'name'}
    );

    if (error) {
      alert("Failed to add task.");
      console.error(error);
    } else {
      //alert("Task added");
    }

  }

  return (
    
    <div className="grow-page">
      <div className={`grow-container ${loading ? "blurred" : ""}`}>
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
        <button className="flower-picker-button">Pick a flower</button>
        {taskData && (
          <div className="response-box">
            <p>Server Response: {JSON.stringify(taskData)}</p>
            <br />
            <p>Task Name: {taskName}</p>
            <br />
            <p>Status: {taskStatus}</p>
            <br />
            <p>Time: {taskTime} minutes</p>

          </div>
        )}
      </div>
      {loading && (
        <div className = 'loading-overlay'>
          <FaSpinner className='loading-icon'></FaSpinner>
        </div>
      )}
    </div>
  );
};

export default Grow;
