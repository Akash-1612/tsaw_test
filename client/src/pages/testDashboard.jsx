// TestDashboard.jsx
import React, { useEffect, useState } from "react";
import "./testDashboard.css";
import { useNavigate } from "react-router-dom";

function TestDashboard() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const navigate = useNavigate();
  const [timer, setTimer] = useState(1800);
  const [finishStatus, setFinishStatus] = useState(false);


  //going to next question
  const handleNext = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  //going to previous question
  const handlePrev = () => {
    setCurrentQuestion((prev) => Math.max(1, prev - 1));
  };

  //finishing the test
  const handleFinish = () => {
    const response = window.confirm("Are you sure you want to finish the test?");

    if (response) {
      navigate("/home");
    }
  };


  //timer
  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timerId);
  }, []);
//timer format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }


//Handling back button
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!finishStatus) {
      if (window.confirm("Navigating back will close & submit the test, and you won't be able to take it again.")) {
        setFinishStatus(true)
        navigate("/home");
      } else {
        window.history.pushState(null, null, window.location.pathname);
        setFinishStatus(false)
      }
    }
  }

  //Handling back button
  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
    };
    // eslint-disable-next-line
  }, [navigate]);



  return (
    <div className="test-dashboard">
      <div className="side-panel">
        <h3>Question Numbers</h3>
        <ul>
          {/* Generate question numbers dynamically */}
          {Array.from({ length: 30 }, (_, index) => (
            <li key={index} className={currentQuestion === index + 1 ? "active" : ""}>
              {index + 1}
            </li>
          ))}
        </ul>
      </div>

      <div className="main-content">
        <div className="top-bar">
          <div>Timer: {formatTime(timer)}</div>
          <button onClick={handleFinish}>Finish</button>
        </div>

        <div className="question-box">
          <h2>Question {currentQuestion}</h2>
          <p>This is the question content...</p>

          {/* Options */}
          <div className="options">
            <label>
              <input type="radio" name={`question${currentQuestion}`} value="option1" />
              Option 1
            </label>
            <label>
              <input type="radio" name={`question${currentQuestion}`} value="option2" />
              Option 2
            </label>
            <label>
              <input type="radio" name={`question${currentQuestion}`} value="option3" />
              Option 3
            </label>
            <label>
              <input type="radio" name={`question${currentQuestion}`} value="option4" />
              Option 4
            </label>
          </div>

          {/* Save Button */}
          <button className="save-button">Save</button>
        </div>

        <div className="bottom-bar">
          <button onClick={handlePrev} disabled={currentQuestion === 1}>
            Prev
          </button>
          <button onClick={handleNext} disabled={currentQuestion === 30}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestDashboard;