import React from 'react';
import './Sidebar.css';
import {Link} from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">
            <img src="/Icons/Dashboard-active.svg" alt="Dashboard" />
          </Link>
        </li>
        <li>
          <Link to="/project-List">
            <img src="/Icons/Project-list-active.svg" alt="Dashboard" />
          </Link>
        </li>
        <li>
          <Link to="/create-project">
            <img src="/Icons/create-project-active.svg" alt="create-project" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
