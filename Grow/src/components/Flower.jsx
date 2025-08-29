import React, { useState, useEffect } from "react";
import {FaSpinner} from 'react-icons/fa';
import { supabase } from '../supabaseClient.js'

const Flower = ({taskTime, userLevel, currentExp, requiredExp, flowerType, onLevelUp }) => {
  const userID = localStorage.getItem('user_id');
  const [flowerFile, setFlowerFile] = useState(null);

  const configureLevelup = async () => {
    let newLevel = userLevel;
    let newExp = currentExp;
    let newRequiredExp = requiredExp;


    if (currentExp >= requiredExp && requiredExp !== null &&  currentExp !== null) {
      newLevel += 1;

      if (newLevel >= 4 ) {
        newLevel = 4;
        newExp = 0;
        newRequiredExp = 10;



      } else {
        newExp = currentExp - requiredExp;
        newRequiredExp = requiredExp * 2;
      }

      onLevelUp(newLevel, newExp, newRequiredExp);
      configureFlower();
    }
  };

  const configureExp = async () => {
    let ratio = taskTime/10;
    let newExp  = ratio + currentExp;
    if (newExp >= 0) {
      onLevelUp(userLevel, newExp, requiredExp);
    } else {
      console.log(newExp);
    }

  }

  useEffect(()=> {
    if (taskTime !== null){
    configureExp();
    }
  }, [taskTime])


  useEffect(()=> {
    configureLevelup()
  }, [currentExp])

  useEffect(() => {
    configureFlower();
  }, [userLevel, flowerType]);

  const configureFlower = async () => {
      if (userLevel < 4) {
        if (userLevel == 1) {
          setFlowerFile('../../images/level-'+userLevel+'.png')
        } else {
          setFlowerFile('../../images/level-'+userLevel+'.gif')
        }
      }
      else {
        setFlowerFile('../../images/'+flowerType+'.gif')
      }
    }



  return(
        <div>
          {flowerFile && <img src={flowerFile} alt="image of flower" />}
          <h3>Level: {userLevel}</h3>
          <h3>Flower Growth Status: {currentExp}/{requiredExp} {userLevel}</h3>
        </div>
    )
}


export default Flower;