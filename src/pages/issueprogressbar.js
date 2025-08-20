import React from 'react';
import '../css/issueprogressbar.css';

const IssueProgressBar = ({ issue, status }) => {
    const getProgress = () => {
        return status === 'done' ? 100 : status === 'pending' ? 50 : status === 'opened' ? 10 : ''; // Example logic
    };

    return (
        <div className="progress-item">
            <span className="issue-label">{issue}</span>
            <div className="progress-bar">
                <div
                    className="progress"
                    style={{ width: `${getProgress()}%` }}
                />
            </div>
            <span className="status-label">{status}</span>
        </div>
    );
};

export default IssueProgressBar;