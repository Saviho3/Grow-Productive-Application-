import React, { useState, useEffect } from "react";
import "../styles/Grow.css";
import {FaSlash, FaSpinner} from 'react-icons/fa';
import { supabase } from '../supabaseClient.js'
import { Link } from "react-router-dom";
import Flower from '../components/Flower.jsx'



const Grow = () => {

  const [userTask, setUserTask] = useState('');
  const [task, setTask] = useState('');
  const [taskData, setTaskData] = useState(null);
  const [taskName, setTaskName] = useState('');
  const[taskTime, setTaskTime] = useState(null);
  const[taskStatus, setTaskStatus] = useState('');
  const[loading, setLoading] = useState(false);
  const userID = localStorage.getItem("user_id");
  const [userLevel, setUserLevel] = useState(0) ;
  const [currentExp, setCurrentExp] = useState(0);
  const [requiredExp, setRequiredExp] = useState(10);
  const [flowerType, setFlowerType] = useState('');
  const [blockedStatus, setBlockedStatus] = useState(false);

  useEffect(() => {
    if (!flowerType) {
      setBlockedStatus(true);
    } else {
      setBlockedStatus(false);
    }
  }, [flowerType])

  useEffect(() => {
          const fetchUserStats = async () => {
            const { data, error } = await supabase
              .from("profiles")
              .select("level, current_exp, required_exp, current_flower")
              .eq("id", userID)
              .maybeSingle();
      
            if (error) {
              console.error("Failed to get user_level:", error);
            } else {
              console.log(data);
              setUserLevel(data?.level ?? null);
              setCurrentExp(data?.current_exp ?? null);
              setRequiredExp(data?.required_exp ?? null);
              setFlowerType(data?.current_flower ?? null);
            }
          };
      
          if (userID) {
            fetchUserStats();
          }
        }, [userID]);



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

  const handleLevelUp = async (newLevel, newExp, newRequiredExp) => {
    setCurrentExp(newExp);
    setRequiredExp(newRequiredExp);
    setUserLevel(newLevel);

    if (newLevel >= 4) {
      setBlockedStatus(true);
    }
    const { error } = await supabase
      .from("profiles")
      .update({
        level: newLevel,
        current_exp: newExp,
        required_exp: newRequiredExp,
      })
      .eq("id", userID);

    if (error) {
      console.error("Error updating level:", error);
    }

  };


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
        disabled={blockedStatus}
        >Submit</button>
        <Link to="/flower-picker" className = 'flower-picker-link'>Pick a Flower</Link>
        <Flower 
              taskTime = {taskTime}
              userLevel = {userLevel}
              currentExp = {currentExp}
              requiredExp = {requiredExp}
              flowerType = {flowerType}
              onLevelUp={handleLevelUp}/>
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
