import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Activity from './Activity';
import Receipts from './Receipts';
import '../css/App.css';

const App = () => {

  return (
    <div>
      <Router>
        <header>
          <Header />
          <div className="header-title">
            <h1>splitbill</h1>
            <h2>Bill-splitting made easy</h2>
          </div>
        </header>

        <div className="container">
          <Route path="/" exact component={Home} />
          <Route path="/activity" component={Activity} />
          <Route path="/receipts" component={Receipts} />
        </div>
      </Router>

    </div>
  );
};

export default App;
