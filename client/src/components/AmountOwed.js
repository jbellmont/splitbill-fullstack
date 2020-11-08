import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import '../css/AmountOwed.css';

const AmountOwed = ({ friendsData }) => {
  const [listOpen, setListOpen] = useState(false);
  const toggleList = () => setListOpen(!listOpen);

  const [dropdownValue, setDropdownValue] = useState(friendsData[0].friend_id);
  const onDropdownChange = (e) => {
    setDropdownValue(Number(e.target.dataset.id));
    setListOpen(!listOpen);
    setFriendDDHeaderValue(e.target.innerText);
  };

  const [friendDDheaderValue, setFriendDDHeaderValue] = useState('Select friend');
  
  const [activeFriendData, setActiveFriendData] = useState('');
  useEffect(() => {
    const filteredFriendData = [...friendsData].filter(friend => friend.friend_id === dropdownValue);
    setActiveFriendData(filteredFriendData[0]);
    
  }, [dropdownValue]);


  return (
    <div>
      <h2 className="extra-margin-bottom">Amount owed</h2>

      <Dropdown 
        header={friendDDheaderValue}
        data={friendsData}
        type='friends'
        onDropdownChange={onDropdownChange}
        toggleList={toggleList}
        listOpen={listOpen}
      />

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