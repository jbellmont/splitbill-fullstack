import React, { useState, useEffect } from 'react';

const Activity = () => {

  const [friends, setFriends] = useState([]);

  const currentActivityName = 'Dummy';

  // Get the friends data related to the current Activity ID
  useEffect(() => {
    const currentActivityID = window.location.pathname.split('/')[2]; 
    fetch(`http://localhost:5000/friends/get/${currentActivityID}`)
    .then(response => response.json())
    .then(response => {
      setFriends(response);
      console.log(response[0].activity_name);
      currentActivityName = response[0].activity_name;
    })
    .catch(error => console.log(error))
  }, []);

  if (friends === undefined) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div>{currentActivityName}</div>
  );
};

export default Activity;