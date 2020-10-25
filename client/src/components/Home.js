import React, { useState, useEffect } from 'react';
import CreateForm from './CreateForm';
import ActivityList from './ActivityList';
import '../css/Global.css';

const Home = () => {

  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(true);

  // Get all Activity data
  const [activityData, setActivityData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/activities/all')
      .then(response => response.json())
      .then(response => {
        setActivityData(response);
        setActivitiesLoading(false)
      })

      .catch(error => console.log(error));
  }, [buttonClicked]);


  // Create new Activity
  const [newActivityInput, setNewActivityInput] = useState('');
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


  // Delete specific Activity
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

  // On change logic for the create new Activity input form
  const onCreateActivityFormChange = (e) => setNewActivityInput(e.target.value);


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

      {activitiesLoading ?
        <div><i className="fas fa-spinner spinner"></i> Loading</div> :
        <ActivityList 
          activityData={activityData}
          onDeleteActivityClick={onDeleteActivityClick}
        />
      }

    </div>
  );
};

export default Home;
