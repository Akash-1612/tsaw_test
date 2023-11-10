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
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla enim dignissimos velit accusamus asperiores, nemo minima veniam maiores voluptatibus omnis distinctio totam vero nisi quia adipisci a officia explicabo sit?</p>
                <h3>Marking System</h3>
                <p>Information about the marking system goes here.</p>
                <h3>Flag and Review System</h3>
                <p>Details about the flag and review system go here.</p>
            </div>
            <div className="test-buttons">
                <button onClick={onClose}>Back</button>
                <button onClick={handleStartTest}>Start Test</button>
            </div>
        </div>
    );
}

export default TestBox;
