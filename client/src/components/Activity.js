import React, { useState, useEffect } from 'react';
import CreateForm from './CreateForm';
import FriendList from './FriendsList';
import '../css/Global.css';

const Activity = () => {

  // state & setup
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(true);
  const currentActivityID = window.location.pathname.split('/')[2]; 

  // Get Activity name
  const [activityName, setActivityName] = useState('');
  useEffect(() => {
    fetch(`http://localhost:5000/activities/get/${currentActivityID}`)
    .then(response => response.json())
    .then(response => setActivityName(response.activity_name))
    .catch(error => console.log(error))
  }, []);


  // Get the friends data related to the current Activity ID
  useEffect(() => {
    fetch(`http://localhost:5000/friends/get/${currentActivityID}`)
    .then(response => response.json())
    .then(response => {
      setFriends(response);
      setLoading(false);
    })
    .catch(error => console.log(error))
  }, [buttonClicked]);


  // Create new friend
  const [newFriendInput, setNewFriendInput] = useState('');
  const onCreateFriendSubmit = (e) => {
    // Creates a new Friend in the MySQL data
    e.preventDefault();
    // Request body
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        friendName: newFriendInput,
        activityID: window.location.pathname.split('/')[2]
      })
    };

    // API call
    fetch('http://localhost:5000/friends/add', options)
      .then(response => {
        console.log('Creating friend response status: ', response.status);
        setButtonClicked(!buttonClicked);
      })
      .catch(err => console.log(err));
  };


  // Delete friend logic
  const onDeleteFriendClick = (e) => {
    const currentFriendID = e.target.parentNode.dataset.id;
    fetch(`http://localhost:5000/friends/delete/${currentFriendID}`, { method: "DELETE" })
      .then(response => {
        console.log(response.status);
        console.log(`ID ${currentFriendID} successfully deleted`);
        setButtonClicked(!buttonClicked);
      })
      .catch(error => console.log(error));
  };

  // Input on change logic
  const onCreateFriendFormChange = (e) => {
    setNewFriendInput(e.target.value);
  };

  return (
    <div>

      {loading ?
        <div><i className="fas fa-spinner spinner"></i> Loading</div> :
        <div>
          <h1>{activityName ? activityName : null}</h1>

          <CreateForm 
            onCreateSubmit={onCreateFriendSubmit}
            inputValue={newFriendInput}
            onChange={onCreateFriendFormChange}
            buttonText={`Add friend`}
            description={`Add all friends who were part of the ${activityName ? activityName : null}`}
            placeholderText="friend name"
          />

          <FriendList 
            friendsData={friends}
            onDeleteFriendClick={onDeleteFriendClick}
          />

        </div>
      }



    </div>
  );
};

export default Activity;