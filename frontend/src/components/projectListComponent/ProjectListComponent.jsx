import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ProjectListComponent.css'
import RecordTables from './RecordTables/RecordTables'
import axios from 'axios'
import { toast } from 'react-toastify';

const ProjectListComponent = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/logout");
      localStorage.removeItem("data_token");
      localStorage.removeItem("userId");
      // Redirect to login or home page
      navigate("/");
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="Bg-Header">
      <div className="Top-Class-Container">
        <div>
          <p className="Main-Param">Projects</p>
        </div>
        <div className="Main-Logo">
          <img src="/Icons/Logo.svg" alt="Logo" />
        </div>
      </div>
      <div className="Logout-Option" onClick={handleLogout}>
        <img src="/Icons/logout.svg" alt="logout" />
      </div>

      <div>
        <RecordTables />
      </div>
    </div>
  );
}

export default ProjectListComponent
