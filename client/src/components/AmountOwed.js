import React, { useState, useEffect } from 'react';
import '../css/AmountOwed.css';

const AmountOwed = ({ friendsData }) => {
  
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
      <h2>Amount owed</h2>

      <div className="owes-dropdown-container">
        <select 
          name="friend" 
          id="select-friend-list"
          value={dropdownValue}
          onChange={onDropdownChange}
        >
          {friendsData.map(friend => <option value={friend.friend_id}>{friend.friend_name}</option>)}
        </select>
        owes...
      </div>  

      <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Friend name</th>
              <th>Amount owed</th>
            </tr>
          </thead>
          <tbody>

      {friendsData.map((friend, index) => friend.friend_id !== dropdownValue ?
      <tr>
        <td>{index + 1}</td>
        <td>{friend.friend_name}</td>
        <td>£ {(friend.total_paid / friendsData.length) - (activeFriendData.total_paid / friendsData.length)}</td>
      </tr>
        : 
        null)}

          </tbody>
        </table>
      </div>
  );
};

export default AmountOwed;