import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import './Home.css'
import HomeComponent from '../../components/Home/HomeComponent'

const Home = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <HomeComponent />
      </div>
    </div>
  );
};

export default Home
