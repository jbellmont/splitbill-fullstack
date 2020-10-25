import React from 'react';
import { Link } from 'react-router-dom';
import '../css/ActivityList.css';


const FriendsList = (props) => {

  return (
    <div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Friend name</th>
            <th>Total paid</th>
            <th>Receipts</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.friendsData.map((friend, index) => {
            return (
              <tr key={friend.friend_id} data-id={friend.friend_id}>
                <td>{index}</td>
                <td>{friend.friend_name}</td>
                <td>£00.00</td>
                <td>
                  <Link to={`/receipts/${friend.friend_id}`}>
                    <button onClick={props.onAddReceiptClick}>Amend receipts</button>
                  </Link>
                </td>
                <td data-id={friend.friend_id}>
                  <button onClick={props.onDeleteFriendClick}>Delete friend</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

    </div>
  );
};

export default FriendsList;