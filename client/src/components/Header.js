import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

const Header = () => {
  return (
    <nav>
      <Link to="/">Home</Link> | 
      <Link to="/activity">Activity</Link> | 
      <Link to="/receipts">Receipts</Link>
    </nav>
  );
};

export default Header;