import React from 'react';
import '../css/ActivityList.css';


const FriendsList = (props) => {

  const renderedList = props.friendsData.map(data => {
    return (
      <div 
        className="" 
        key={data.friend_id}
        data-id={data.friend_id}
      >
        {data.friend_name}
        <button onClick={props.onDeleteFriendClick}>Delete friend</button>
      </div>
    );
  });

  return (
    <div>
      {renderedList}
    </div>
  );
};

export default FriendsList;