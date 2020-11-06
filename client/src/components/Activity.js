import React, { useState, useEffect } from 'react';
import CreateForm from './CreateForm';
import EditFormOverlay from './EditFormOverlay';
import FriendsTable from './FriendsTable';
import AmountOwed from './AmountOwed';
import '../css/Global.css';
import '../css/Activity.css';

const Activity = () => {

  // state & setup
  const [friendsLoading, setFriendsLoading] = useState(true);
  const [friendsData, setFriendsData] = useState([{activity_name: 'Trip'}]);
  const [activityButtonClicked, setActivityButtonClicked] = useState(true);
  const currentActivityID = window.location.pathname.split('/')[2]; 
  const [friendTotalAmount, setFriendTotalAmount] = useState([]);

  // Get the current Activity Name
  const [currentActivityName, setCurrentActivityName] = useState('Trip');
  useEffect(() => {
    fetch(`http://localhost:5000/activities/get/${currentActivityID}`)
    .then(response => response.json())
    .then(response => setCurrentActivityName(response[0].activity_name))
    .catch(error => console.log(error));
  }, []);

  // Get the Friends data related to the current Activity ID
  useEffect(() => {
    fetch(`http://localhost:5000/friends/get/${currentActivityID}`)
    .then(response => response.json())
    .then(response => {
      console.log('Response:', response);
      if (response.length === 0) {
        setFriendsLoading(false);
        return;
      }
      setFriendsData(response);
      console.log('Friends data: ', friendsData)
      setFriendsLoading(false);
    })
    .catch(error => console.log(error));

  }, [activityButtonClicked, currentActivityID]);


  // Set activity name
  const [activityName, setActivityName] = useState('Default');
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
    const currentFriendID = e.currentTarget.parentNode.dataset.id;
    fetch(`http://localhost:5000/friends/delete/${currentFriendID}`, { method: "DELETE" })
      .then(response => {
        console.log(response.status);
        console.log(`ID ${currentFriendID} successfully deleted`);
      })
      .catch(error => console.log(error));

    fetch(`http://localhost:5000/receipts/delete/${currentFriendID}`, { method: "DELETE" })
      .then(response => {
        console.log(response.status);
        console.log(`Receipts for ${currentFriendID} successfully deleted`);
        setActivityButtonClicked(!activityButtonClicked);
      })
      .catch(error => console.log(error));
  };

  // Add receipt
  const onAddReceiptClick = () => '';

  // On change logic for the create new Friend input form
  const onCreateFriendFormChange = (e) => setNewFriendInput(e.target.value);

  // Show/hide Edit Activity overlay
  const [showEditActivityOverlay, setShowEditActivityOverlay] = useState(false);
  const onEditActivityOverlayClick = () => setShowEditActivityOverlay(!showEditActivityOverlay);

  // Update Activity name
  const [editActivityInputValue, setEditActivityInputValue] = useState('');
  const onEditActivityInputValueChange = (e) => setEditActivityInputValue(e.target.value);
  const onEditActivitySubmitForm = (e) => {
    e.preventDefault();
    // Request body
    const options = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        updatedActivityName: editActivityInputValue,
        updatedSettledStatus: 0 // UPDATE THIS! UPDATE THIS! UPDATE THIS! UPDATE THIS! UPDATE THIS! UPDATE THIS!
      })
    };

    fetch(`http://localhost:5000/activities/update/${currentActivityID}`, options)
      .then(response => {
        console.log(response.status);
        console.log('Activity name updated');
        setActivityButtonClicked(!activityButtonClicked);
      })
      .catch(error => console.log(error));
    
      // closes the Edit Activity Name overlay
      setShowEditActivityOverlay(!showEditActivityOverlay);
  };


  // Show/hide Edit Friend name overlay
  const [showEditFriendOverlay, setShowEditFriendOverlay] = useState(false);
  const onEditFriendOverlayClick = (e) => {
    setShowEditFriendOverlay(!showEditFriendOverlay);
    setActiveFriendID(Number(e.target.parentNode.parentNode.dataset.id));
  };

  // Update Friend name
  const [activeFriendID, setActiveFriendID] = useState(0);
  const [editFriendInputValue, setEditFriendInputValue] = useState('');
  const onEditFriendInputValueChange = (e) => setEditFriendInputValue(e.target.value);
  const onEditFriendSubmitForm = (e) => {
    e.preventDefault();
    // Request body
    const options = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        updatedFriendName: editFriendInputValue,
        updatedSettledStatus: 0 // UPDATE THIS! UPDATE THIS! UPDATE THIS! UPDATE THIS! UPDATE THIS! UPDATE THIS!
      })
    };

    fetch(`http://localhost:5000/friends/update/${activeFriendID}`, options)
      .then(response => {
        console.log(response.status);
        console.log('Activity name updated');
        setActivityButtonClicked(!activityButtonClicked);
      })
      .catch(error => console.log(error));
    
      // closes the Edit Activity Name overlay
      setShowEditFriendOverlay(!showEditFriendOverlay);
  };


  return (
    <div>

      {friendsLoading ?
        <div><i className="fas fa-spinner spinner"></i> Loading</div> :
        <div>
          <h1 className="activity-name-title">{currentActivityName}</h1><button onClick={onEditActivityOverlayClick} className="edit-button"><i class="fas fa-edit"></i></button>

          {/* Edit Activity overlay */}
          <EditFormOverlay 
            toEdit="activity"
            showOverlay={showEditActivityOverlay}
            formInputOneValue={editActivityInputValue}
            onFormInputOneChange={onEditActivityInputValueChange}
            onFormSubmit={onEditActivitySubmitForm}
            closeOverlay={onEditActivityOverlayClick}
          />

          {/* Edit Friend overlay */}
          <EditFormOverlay 
            toEdit="friend"
            showOverlay={showEditFriendOverlay}
            formInputOneValue={editFriendInputValue}
            onFormInputOneChange={onEditFriendInputValueChange}
            onFormSubmit={onEditFriendSubmitForm}
            closeOverlay={onEditFriendOverlayClick}
          />

          <section>
            <CreateForm 
              onCreateSubmit={onCreateFriendSubmit}
              inputValue={newFriendInput}
              onChange={onCreateFriendFormChange}
              buttonText={`Add friend`}
              description={`Add all Friends who were part of ${activityName}`}
              placeholderText="friend name"
            />
          </section>

          <hr />

          <section>
            <h2>Friend list</h2>
            <FriendsTable 
              friendsData={friendsData}
              friendTotalAmount={friendTotalAmount}
              onAddReceiptClick={onAddReceiptClick}
              onDeleteFriendClick={onDeleteFriendClick}
              openCloseOverlay={onEditFriendOverlayClick}
            />
          </section>

          <hr />

          {friendsData.length > 1 ? 
            <section>
              <AmountOwed 
                friendsData={friendsData}
              />
            </section> :
            null }


        </div>
      }



    </div>
  );
};

export default Activity;