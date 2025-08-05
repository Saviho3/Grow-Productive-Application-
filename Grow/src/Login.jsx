import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert("Please fill in both email and password fields");
      return;
    }

    setLoading(true);
    
    try {
      if (isSignUp) {
        // Sign up flow
        const { data, error } = await supabase.auth.signUp({
          email,
          password
        });

        if (error) {
          alert(`Sign up failed: ${error.message}`);
        } else {
          alert("Account created successfully! Please check your email to verify your account.");
          setEmail("");
          setPassword("");
        }
      } else {
        // Login flow
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          alert(`Login failed: ${error.message}`);
        } else {
          alert("Login successful! Welcome back.");
          setEmail("");
          setPassword("");
        }
      }
    } catch (error) {
      alert(`An unexpected error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>{isSignUp ? "Create Account" : "Welcome"}</h2>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="login-btn"
            disabled={loading}
          >
            {loading ? (isSignUp ? "Creating Account..." : "Logging in...") : (isSignUp ? "Sign Up" : "Log In")}
          </button>
          
          <div className="toggle-container">
            <p className="toggle-text">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </p>
            <button 
              type="button" 
              className="toggle-btn"
              onClick={toggleMode}
              disabled={loading}
            >
              {isSignUp ? "Log In" : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 