import React from 'react';
import { Link } from 'react-router-dom';


const FriendsTable = (props) => {

  return (
    <div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Friend name</th>
            <th>Total paid</th>
            <th>Amend receipts</th>
            <th>Edit Friend name</th>
            <th>Delete Friend</th>
          </tr>
        </thead>
        <tbody>
          {props.friendsData.map((friend, index) => {
            return (
              <tr key={friend.friend_id} data-id={friend.friend_id}>
                <td>{index + 1}</td>
                <td>{friend.friend_name}</td>
                <td>£ {friend.total_paid}</td>
                <td className="center">
                  <Link to={`/receipts/${friend.friend_id}`}>
                    <button onClick={props.onAddReceiptClick}><i class="fas fa-file-invoice-dollar"></i></button>
                  </Link>
                </td>
                <td className="center">
                  <button onClick={props.openCloseOverlay}><i class="fas fa-edit"></i> </button>
                </td>
                <td data-id={friend.friend_id} className="center">
                  <button onClick={props.onDeleteFriendClick}><i class="fas fa-trash-alt"></i> </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

    </div>
  );
};

export default FriendsTable;