import React, { useState, useEffect } from 'react';
import CreateForm from './CreateForm';
import ActivityList from './ActivityList';
import '../css/Global.css';

const Home = () => {

  // Create new activity
  const [newActivityInput, setNewActivityInput] = useState('');
  const [buttonClicked, setButtonClicked] = useState(true);
  const onCreateActivitySubmit = (e) => {
    // Creates a new Activity in the MySQL data
    e.preventDefault();
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

  // Input on change logic
  const onCreateActivityFormChange = (e) => {
    setNewActivityInput(e.target.value);
  };


  return (
    <div>
      <CreateForm 
        onCreateSubmit={onCreateActivitySubmit}
        inputValue={newActivityInput}
        onChange={onCreateActivityFormChange}
        buttonText="Create activity"
        description="Activities are things like a group holiday, a restaurant bill or stag do"
        placeholderText="activity name"
      />

      {activities.length === 0 ?
        <div><i className="fas fa-spinner spinner"></i> Loading</div> :
        <ActivityList 
          activitiesData={activities}
          onDeleteActivityClick={onDeleteActivityClick}
        />
      }

    </div>
  );
};

export default Home;
