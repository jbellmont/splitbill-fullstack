import React, { useState, useEffect } from 'react';
import CreateForm from './CreateForm';
import FriendList from './FriendsList';
import WhoOwesWho from './WhoOwesWho';
import '../css/Global.css';

const Activity = () => {

  // state & setup
  const [friendsLoading, setFriendsLoading] = useState(true);
  const [friendsData, setFriendsData] = useState([{activity_name: 'Default'}]);
  const [activityButtonClicked, setActivityButtonClicked] = useState(true);
  const currentActivityID = window.location.pathname.split('/')[2]; 
  const [friendTotalAmount, setFriendTotalAmount] = useState([]);

  // Get the Friends data related to the current Activity ID
  useEffect(() => {
    fetch(`http://localhost:5000/friends/get/${currentActivityID}`)
    .then(response => response.json())
    .then(response => {
      console.log('Response:', response);
      setFriendsData(response);
      console.log('Friends data: ', friendsData)
      setFriendsLoading(false);
    })
    .catch(error => console.log(error));

  }, [activityButtonClicked, currentActivityID]);


  // Set activity name
  const [activityName, setActivityName] = useState('XXXX');
  useEffect(() => setActivityName(friendsData[0].activity_name), [friendsData]);


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
        activityID: currentActivityID
      })
    };

    // API call
    fetch('http://localhost:5000/friends/add', options)
      .then(response => {
        console.log('Creating friend response status: ', response.status);
        setActivityButtonClicked(!activityButtonClicked);
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
        setActivityButtonClicked(!activityButtonClicked);
      })
      .catch(error => console.log(error));
  };

  // Add receipt
  const onAddReceiptClick = () => '';

  // On change logic for the create new Friend input form
  const onCreateFriendFormChange = (e) => setNewFriendInput(e.target.value);


  return (
    <div>

      {friendsLoading ?
        <div><i className="fas fa-spinner spinner"></i> Loading</div> :
        <div>
          <h1>{activityName}</h1>

          <CreateForm 
            onCreateSubmit={onCreateFriendSubmit}
            inputValue={newFriendInput}
            onChange={onCreateFriendFormChange}
            buttonText={`Add friend`}
            description={`Add all friends who were part of the ${activityName}`}
            placeholderText="friend name"
          />

          <FriendList 
            friendsData={friendsData}
            friendTotalAmount={friendTotalAmount}
            onAddReceiptClick={onAddReceiptClick}
            onDeleteFriendClick={onDeleteFriendClick}
          />

          <WhoOwesWho 
            friendsData={friendsData}
          />

        </div>
      }



    </div>
  );
};

export default Activity;