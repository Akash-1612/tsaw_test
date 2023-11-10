// TestDashboard.jsx
import React, { useEffect, useState } from "react";
import "./testDashboard.css";
import { useNavigate } from "react-router-dom";
import questions from "../components/questions.json";

function TestDashboard() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const navigate = useNavigate();
  const [timer, setTimer] = useState(900);
  const [finishStatus, setFinishStatus] = useState(false);
  const [questionData, setQuestionData] = useState(questions);
  const [selectedOption, setSelectedOption] = useState({});
  const [tabSwitchCount, setTabSwitchCount] = useState(0);


  //going to next question
  const handleNext = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  //going to previous question
  const handlePrev = () => {
    setCurrentQuestion((prev) => Math.max(0, prev - 1));
  };

  //saving the answer of the current question
  useEffect(() => {
    setSelectedOption((prev) => {
      return {
        ...prev,
        [currentQuestion]: document.querySelector(`input[name="question${currentQuestion}"]:checked`)
          ? document.querySelector(`input[name="question${currentQuestion}"]:checked`).value
          : null,
      };
    });
  }, [currentQuestion]);

  //saving for prev question
  useEffect(() => {
    if (selectedOption[currentQuestion] !== undefined) {
      const radioButtons = document.querySelectorAll(`input[name="question${currentQuestion}"]`);
      radioButtons.forEach((button) => {
        if (button.value === selectedOption[currentQuestion]) {
          button.checked = true;
        } else {
          button.checked = false;
        }
      });
    }
  }, [currentQuestion, selectedOption]);

  //handle option change
  const handleOptionChange = (selectedValue) => {
    setSelectedOption((prev) => ({
      ...prev,
      [currentQuestion]: selectedValue,
    }));
  };

  //finishing the test
  const handleFinish = () => {
    const response = window.confirm("Are you sure you want to finish the test?");

    if (response) {
      navigate("/home");
    }
  };


  //Timer Setup
  useEffect(() => {
    const savedTimer = localStorage.getItem("testTimer");
    const initialTime = savedTimer ? parseInt(savedTimer, 10) : 900;

    setTimer(initialTime);

    const timerId = setInterval(() => {
      setTimer((prev) => {
        const newTime = Math.max(0, prev - 1);
        localStorage.setItem("testTimer", newTime.toString());
        return newTime;
      });
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

  //Warning on refresh
  useEffect(() => {
    window.onbeforeunload = function () {
      return "All answers will be lost. Are you sure you want to leave?";
    };
  }, []);

  //fetching questions
  const fetchQuestions = async () => {
    try {
      const response = await fetch(questions);
      const data = await response.json();

      //shuffling the questions out of 72
      const shuffledQuestions = data.sort(() => Math.random() - 0.5);

      console.log("Shuffled Questions:", shuffledQuestions.length); // Debug log

      //taking only 30 questions
      const selectedQuestions = shuffledQuestions.slice(0, 30);
      setQuestionData(selectedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  useEffect(() => {
    if (questionData === null) {
      fetchQuestions();
    }
    // eslint-disable-next-line
  }, []);

  //Handling tab switch
  const handleTabSwitch = () => {
    setTabSwitchCount((count) => count + 1);
  };
  useEffect(() => {
    const handleVisibiltyChange = () => {
      if (document.hidden) {
        handleTabSwitch();
      }
    };
    document.addEventListener("visibilitychange", handleVisibiltyChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibiltyChange);
    };
  }, []);
  useEffect(() => {
    if (tabSwitchCount >= 3) {
      alert("You have switched tabs more than 3 times. Your test will be submitted now.");
      handleFinish();
    }
  }, [tabSwitchCount]);



  // Rendering the test dashboard
  return (
    <div className="test-dashboard">
      <div className="side-panel">
        <h3>Question Numbers</h3>
        <ul>
          {questionData.map((_, index) => (
            <li key={index} className={currentQuestion === index ? "active" : ""}>
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
          <h2>Question {currentQuestion + 1}</h2>
          <p>{questionData[currentQuestion].question}</p>

          <div className="options">
            {questionData[currentQuestion].options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name={`question${currentQuestion}`}
                  value={`option${index + 1}`}
                  checked={selectedOption[currentQuestion] === `option${index + 1}`}
                  onChange={() => handleOptionChange(`option${index + 1}`)}
                />
                {option}
              </label>
            ))}
          </div>

          <button className="save-button">Save</button>
        </div>

        <div className="bottom-bar">
          <button onClick={handlePrev} disabled={currentQuestion === 0}>
            Prev
          </button>
          <button onClick={handleNext} disabled={currentQuestion === questionData.length - 1}>
            Next
          </button>
        </div>
        <div className="tabCounter">
        <p>Tab Switch Count: {tabSwitchCount}! </p>
      </div>
      </div>
    </div>
  );
}

export default TestDashboard;