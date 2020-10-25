import React, { useState, useEffect } from 'react';

const WhoOwesWho = ({ friendsData }) => {
  
  const [dropdownValue, setDropdownValue] = useState(friendsData[0].friend_id);
  const onDropdownChange = (e) => {
    setDropdownValue(Number(e.target.value));
  };
  
  const [activeFriendName, setActiveFriendName] = useState('');
  useEffect(() => {
    const filteredFriendData = [...friendsData].filter(friend => friend.friend_id === dropdownValue);
    setActiveFriendName(filteredFriendData[0].friend_name);
    
  }, [dropdownValue])

  return (
    <div>
      <h2>Who owes who</h2>

      <select 
        name="friend" 
        id="select-friend-list"
        value={dropdownValue}
        onChange={onDropdownChange}
      >
        {friendsData.map(friend => <option value={friend.friend_id}>{friend.friend_name}</option>)}
      </select>

      <h3>{activeFriendName} owes...</h3>

      {friendsData.map(friend => friend.friend_id !== dropdownValue ? <div>{friend.friend_name}: £</div> : null)}
    </div>
  );
};

export default WhoOwesWho;