import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Activity from './Activity';
import Receipts from './Receipts';
import ActivityList from './ActivityList';
import '../css/App.css';

const App = () => {
  return (
    <div className="container">
      <Router>
        <header>
          <h1>splitbill</h1>
          <h2>simplifies the process of working out who owes what after a group trip or meal</h2>
          <Header />
        </header>
        <Route path="/" exact component={Home} />
        <Route path="/activity" component={Activity} />
        <Route path="/receipts" component={Receipts} />
      </Router>

    </div>
  );
};

export default App;
