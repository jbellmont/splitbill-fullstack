import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/ActivityList.css';


const ActivityList = (props) => {

  const renderedList = props.activitiesData.map(data => {
    return (
      <div 
        className="activity-button" 
        key={data.activity_id}
        data-id={data.activity_id}
      >
        <Link to={`/activity/${data.activity_id}`}>
        {data.activity_name}</Link> <br />
        {data.time_created} <br />
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