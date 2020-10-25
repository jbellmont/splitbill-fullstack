import React from 'react';
import { Link } from 'react-router-dom';
import '../css/ActivityList.css';


const ActivityList = (props) => {

  const renderedList = props.activityData.map(activity => {
    return (
      <div 
        className="activity-button" 
        key={activity.activity_id}
        data-id={activity.activity_id}
      >
        <Link to={`/activity/${activity.activity_id}`}>
        {activity.activity_name}</Link> <br />
        {activity.time_created} <br />
        <button onClick={props.onDeleteActivityClick}>Delete activity</button>
      </div>
    );
  });

  return (
    <div>
      {renderedList}
    </div>
  );
};

export default ActivityList;