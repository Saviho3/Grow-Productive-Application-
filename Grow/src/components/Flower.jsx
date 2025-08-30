import React, { useState, useEffect } from "react";
import level1 from '../../images/level-1.png';
import level2 from '../../images/level-2.gif';
import level3 from '../../images/level-3.gif';
import flowerBlue from '../../images/flower-blue.gif';
import flowerPink from '../../images/flower-pink.gif';
import flowerRed from '../../images/flower-red.gif';
import tulipPurple from '../../images/tulip-purple.gif';

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
          setFlowerFile(level1);
        } else if (userLevel == 2) {
          setFlowerFile(level2);
        } else if (userLevel == 3) {
          setFlowerFile(level3);
        } else {
          setFlowerFile(null);
        }
      } else {
        const flowerMap = {
          'flower-blue': flowerBlue,
          'flower-pink': flowerPink,
          'flower-red': flowerRed,
          'tulip-purple': tulipPurple,
        };
        setFlowerFile(flowerMap[flowerType] || null);
      }
    }



  return(
        <div>
          {flowerFile && <img src={flowerFile} alt="image of flower" />}
          <h3>Level: {userLevel}</h3>
          <h3>Flower Growth Status: {currentExp}/{requiredExp}</h3>
        </div>
    )
}


export default Flower;