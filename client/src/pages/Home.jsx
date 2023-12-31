// home.jsx
import React, { useState, useEffect } from "react";
import "./home.css";
import TestBox from "../components/testBox";
import { useNavigate } from "react-router-dom";

function Home() {
  const [showTestDetails, setShowTestDetails] = useState(false);
  const [testName, setTestName] = useState("");


  const handleTestClick = (event, test) => {
    event.preventDefault();
    setTestName(test);
    setShowTestDetails(true);
  };

  const handleBackClick = (event) => {
    event.preventDefault();
    setShowTestDetails(false);
  };

  // Load showTestDetails state from local storage on component mount
  useEffect(() => {
    const storedShowTestDetails = localStorage.getItem("showTestDetails");
    if (storedShowTestDetails) {
      setShowTestDetails(JSON.parse(storedShowTestDetails));
    }
  }, []); 

  // Save showTestDetails state to local storage on state change
  useEffect(() => {
    localStorage.setItem("showTestDetails", JSON.stringify(showTestDetails));
  }, [showTestDetails]);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };



  return (
    <div className="container">
      <div className="navbar">
        <div className="logo">
          <span>TSAW Test</span>
        </div>
        <div className="user">
          <span>Welcome, User </span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {showTestDetails ? (
        <TestBox onClose={handleBackClick} testName={testName} />
      ) : (
        <div>
          <div className="welcome-container">
            <div className="welcomeText">
              <h2>Hello 👋</h2>
              <p>Welcome to our online test platform! We're excited to have you here and help you achieve your goals.
                Good Luck with your test.</p>
            </div>
          </div>
          <div className="dashboard">
            <div className="dashboard-child tests">
              <h3>📝 Available tests</h3>
              <ol>
                <a href="/" onClick={(e) => handleTestClick(e, "MERN Stack questions 1")}>
                  <li>MERN Stack questions - 1 (Easy)</li>
                </a>
                <a href="/" onClick={(e) => handleTestClick(e, "MERN Stack questions 2")}>
                  <li>MERN Stack questions - 2 (Medium)</li>
                </a>
                  More to come...
              </ol>
            </div>
            <div className="dashboard-child results">
              <h3>☑️ Recently attempted tests</h3>
              <ol>
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
