import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Scheduler = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios.get('/api/sessions')
      .then(response => {
        setSessions(response.data);
      })
      .catch(error => {
        console.error('Error fetching sessions:', error);
      });
  }, []);

  const calculateTotalTime = (session) => {
    return session.morningTime + session.afternoonTime + session.eveningTime + session.nightTime;
  };

  const renderSessionProgress = () => {
    return sessions.map(session => (
      <div key={session._id} className="session-progress">
        <h4>{new Date(session.date).toLocaleDateString()}</h4>
        <div className="circular-progress">
          <CircularProgressbar
            value={(calculateTotalTime(session) / 24).toFixed(2) * 100}
            text={`${(calculateTotalTime(session) / 24).toFixed(2) * 100}%`}
            styles={buildStyles({
              textSize: '16px',
              pathColor: '#4caf50',
              textColor: '#000',
              trailColor: '#d6d6d6',
            })}
          />
        </div>
      </div>
    ));
  };

  return (
    <div className="scheduler">
      <h2>30 Days Session Progress</h2>
      {renderSessionProgress()}
    </div>
  );
};

export default Scheduler;
