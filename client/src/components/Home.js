import React, { useState, useEffect } from 'react';
import ActivityList from './ActivityList';

const Home = () => {

  // Create new activity
  const [newActivityInput, setNewActivityInput] = useState('');
  const [buttonClicked, setButtonClicked] = useState(true);
  const onCreateActivitySubmit = (e) => {
    // Creates a new Activity in the MySQL data
    e.preventDefault();
    console.log(newActivityInput);
    // Request body
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        activityName: newActivityInput
      })
    };

    // API call
    fetch('http://localhost:5000/activities/add', options)
      .then(response => {
        console.log('Creating activity response status: ', response.status);
        setButtonClicked(!buttonClicked);
      })
      .catch(err => console.log(err));
  };


  // Activity list logic
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/activities/all')
      .then(response => response.json())
      .then(response => {
        setActivities(response.map(activity => activity));
        console.log(response);
      })
      .catch(error => console.log(error));
  }, [buttonClicked]);


  // Delete activity logic
  const onDeleteActivityClick = (e) => {
    const currentActivityButtonID = e.target.parentNode.dataset.id;
    fetch(`http://localhost:5000/activities/delete/${currentActivityButtonID}`, { method: "DELETE" })
      .then(response => {
        console.log(response.status);
        console.log(`ID ${currentActivityButtonID} successfully deleted`);
        setButtonClicked(!buttonClicked);
      })
      .catch(error => console.log(error));
  };


  return (
    <div>
      <form className="create-activity-form" onSubmit={onCreateActivitySubmit} >
        <input type="text" placeholder="activity name" value={newActivityInput} onChange={(e) => setNewActivityInput(e.target.value)}/>
        <button>Create activity</button>
        <p>Activities are things like a group holiday, a restaurant bill or stag do</p>
      </form>
      <ActivityList 
        activities={activities}
        onDeleteActivityClick={onDeleteActivityClick}
      />
    </div>
  );
};

export default Home;
