import React from "react";
import { supabase } from '../supabaseClient.js';
import { Link } from "react-router-dom";
import flowerBlue from '../../images/flower-blue.gif';
import flowerPink from '../../images/flower-pink.gif';
import flowerRed from '../../images/flower-red.gif';
import tulipPurple from '../../images/tulip-purple.gif';
import '../styles/FlowerSelect.css';

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

    const flowerOptions = [
        { type: "flower-blue", image: flowerBlue, label: "Blue" },
        { type: "flower-pink", image: flowerPink, label: "Pink" },
        { type: "flower-red", image: flowerRed, label: "Red" },
        { type: "tulip-purple", image: tulipPurple, label: "Purple" }
    ];

    return(
        <div className="fs-page">
            <div className="fs-header">
                <Link to="/grow" className="back-link">← Back to home</Link>
                <h1 className="fs-title">Choose Your Flower</h1>
            </div>
            
            <div className="flowers-grid">
                {flowerOptions.map((flower) => (
                    <div 
                        key={flower.type}
                        className="flower-card"
                        onClick={() => configureFlower(flower.type)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                configureFlower(flower.type);
                            }
                        }}
                        tabIndex={0}
                        role="button"
                        aria-label={`Select ${flower.label}`}
                    >
                        <img 
                            src={flower.image} 
                            alt={flower.label}
                            className="flower-image"
                        />
                        <h3 className="flower-label">{flower.label}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FlowerSelect;