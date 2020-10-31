import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Header.css';

const Header = () => {

  // Set state to control what's displayed on the Nav bar
  let url = useLocation().pathname.split('/')[1];
  let idFromURL = useLocation().pathname.split('/')[2];
  const [activityID, setActivityID] = useState('');
  useEffect(() => {
    if (url === 'activity') {
      setActivityID(idFromURL);
    }
  }, [url]);

  return (
    <nav>
      <Link to="/"><i class="fas fa-home"></i> Home</Link>
      {url !== '' ? <Link to={`/activity/${activityID}`}><i class="fas fa-users"></i> Activity</Link> : null}
    </nav>
  );
};

export default Header;