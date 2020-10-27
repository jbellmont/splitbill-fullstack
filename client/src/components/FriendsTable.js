import React from 'react';
import EditFormOverlay from './EditFormOverlay';
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
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.friendsData.map((friend, index) => {
            return (
              <tr key={friend.friend_id} data-id={friend.friend_id}>
                <td>{index + 1}</td>
                <td>{friend.friend_name}</td>
                <td>{friend.total_paid}</td>
                <td>
                  <Link to={`/receipts/${friend.friend_id}`}>
                    <button onClick={props.onAddReceiptClick}>Amend receipts</button>
                  </Link>
                </td>
                <td data-id={friend.friend_id}>
                  <button onClick={props.onDeleteFriendClick}>Delete friend</button>
                </td>
                <td>
                  <button onClick={props.openCloseOverlay}>Edit friend name</button>
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