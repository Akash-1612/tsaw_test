// TestBox.jsx
import React from 'react';
import {useNavigate} from 'react-router-dom';
import './testBox.css';

function TestBox({ testName, onClose }) {

    const navigate = useNavigate();

    const handleStartTest = (event) => {
        event.preventDefault();
        // Start test
        navigate("/testDashboard");
    }

    return (
        <div className="test-box">
            <div className="test-header">
                <h2>{testName}</h2>
            </div>
            <div className="test-content">
                <h3>About the Test</h3>
                <p>Please do not move away from the window as the test is Auto-Proctored. Switching tabs is not allowed. Test will be automatically submitted after 3 tab switches. You'll get 15 minutes to attempt the test after which the test will be automatically submmitted.</p>
                <h3>Marking System</h3>
                <p>There will be 30 questions. 3 marks will be awarded for each correct attempt and -1 will be deducted for each wrong attempt. You need minimum of 40 marks to pass the test.</p>
                <h3>Flag and Review System</h3>
                <p>You can naivagate to any question using the side bar. Green color indicates question is attempted, red indicated question is not attempted & yellow inidcates the question has been marked for review.</p>
            </div>
            <div className="test-buttons">
                <button onClick={onClose}>Back</button>
                <button onClick={handleStartTest}>Start Test</button>
            </div>
        </div>
    );
}

export default TestBox;
