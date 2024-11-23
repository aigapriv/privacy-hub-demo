import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li><Link to="/app">Dashboard</Link></li>
        <li><Link to="/app/privacy-review">Privacy Review</Link></li>
        <li><Link to="/app/ropa">ROPA</Link></li>
      </ul>
    </nav>
  );
};

export default Sidebar; 