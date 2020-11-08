import React, { useState } from 'react';
import '../css/Dropdown.css';

const Dropdown = (props) => {

  // friends or categories
  const [dataType, setDataType] = useState(props.type);

  const listRender = (dataType) => {
    if (dataType === 'friends') {
      return (
        <ul className="dd-list">
            {props.data.map(friend => <li key={friend.friend_id} className="dd-list-item" onClick={props.onDropdownChange} data-id={friend.friend_id}>{friend.friend_name} owes...</li>)}
        </ul>
      );
    } else if (dataType === 'categories') {
      return (
        <ul className="dd-list">
          {props.data.map(category => <li key={Math.floor(Math.random() * 999)} className="dd-list-item" onClick={props.onDropdownChange} >{category}</li>)}
        </ul>
      );
    } else {
      return;
    }
  };

  return (
    <div className="dd-container" onClick={props.toggleList}>
      <div className="dd-header">
        <div className="dd-header-title">
          <div className="dd-header-title-text">{props.header}</div>
          <div className="dd-header-title-icon"><i class="fas fa-angle-down"></i></div>
        </div>
      </div>

      {props.listOpen
        ? listRender(dataType)
        : null
      }

    </div>
  );
};

export default Dropdown;