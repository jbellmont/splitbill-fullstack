import React, { useState, useEffect } from 'react';

const WhoOwesWho = ({ friendsData }) => {
  
  const [dropdownValue, setDropdownValue] = useState(friendsData[0].friend_id);
  const onDropdownChange = (e) => {
    setDropdownValue(Number(e.target.value));
  };
  
  const [activeFriendData, setActiveFriendData] = useState('');
  useEffect(() => {
    const filteredFriendData = [...friendsData].filter(friend => friend.friend_id === dropdownValue);
    setActiveFriendData(filteredFriendData[0]);
    
  }, [dropdownValue]);

  // (currentFriendSpend/friendsData.length) - (friendYouOwe/friendsData.length)

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

      <h3>{activeFriendData.friend_name} owes...</h3>

      {friendsData.map(friend => friend.friend_id !== dropdownValue ? <div>{friend.friend_name}: £{(friend.total_paid / friendsData.length) - (activeFriendData.total_paid / friendsData.length)}</div> : null)}
    </div>
  );
};

export default WhoOwesWho;