import React from 'react';
import { Link } from 'react-router-dom';
import '../css/ActivityList.css';


const ActivityList = (props) => {

  const renderedList = props.activityData.map(activity => {
    const dateCreated = new Date(activity.time_created);
    return (
      <div 
        className="activity-button" 
        key={activity.activity_id}
        data-id={activity.activity_id}
      >
        <div className="left-side">
          <Link to={`/activity/${activity.activity_id}`}>
          <h3>{activity.activity_name}</h3></Link> <br />
          Created: {dateCreated.getDate()}/{dateCreated.getMonth() + 1}/{dateCreated.getFullYear()}
        </div>

        <div className="right-side">
          <button onClick={props.onDeleteActivityClick}><i className="fas fa-trash-alt"></i></button>
        </div>

      </div>
    );
  });

  return (
    <div className="activity-button-container">
      {renderedList}
    </div>
  );
};

export default ActivityList;