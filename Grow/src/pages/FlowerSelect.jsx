import React, { useState } from "react";
import {FaSpinner} from 'react-icons/fa';
import { supabase } from '../supabaseClient.js';
import { Link } from "react-router-dom";

const FlowerSelect = () => {
    const userID = localStorage.getItem("user_id")

    const configureFlower = async(flowerType) => {
        const { data, error } = await supabase
            .from('profiles')
            .update({ current_flower: flowerType, level: 1, current_exp: 0, required_exp: 10 })
            .eq('id', userID)
            .select()

             if (error) {
                alert("Failed to add Flower.");
                console.error(error);
            } else {
                alert("Flower added");
                }
    }

    return(
        <div className="flower-select-div">
            <Link to ="/grow">Back to home</Link>
            <div 
            className = "flower-blue"
            onClick={() => configureFlower("flower-blue")}><img src="../../images/flower-blue.gif" alt="image of a blue flower" /></div>
            
            <div 
            className = "flower-blue"
            onClick={() => configureFlower("flower-pink")}><img src="../../images/flower-pink.gif" alt="image of a pink flower" /></div>
            
            <div 
            className = "flower-blue"
            onClick={() => configureFlower("flower-red")}><img src="../../images/flower-red.gif" alt="image of a red flower" /></div>
           
            <div 
            className = "flower-blue"
            onClick={() => configureFlower("tulip-purple")}><img src="../../images/tulip-purple.gif" alt="image of a pruple flower" /></div>

        </div>
    )
}


export default FlowerSelect;