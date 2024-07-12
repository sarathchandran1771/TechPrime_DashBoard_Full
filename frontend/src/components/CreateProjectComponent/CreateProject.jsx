import React from 'react'
import './CreateProject.css'
import ProjectOptions from './Project-Options/ProjectOptions'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';

const CreateProjectComponent = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post("https://tech-prime-dash-board-full-server.vercel.app/logout");
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
          <p className="Main-Param">Create Project</p>
        </div>
        <div className="Main-Logo">
          <img src="/Icons/Logo.svg" alt="Logo" />
        </div>
      </div>
      <div className="Logout-Option" onClick={handleLogout}>
        <img src="/Icons/Logout.svg" alt="logout" />
      </div>
      <div>
        <ProjectOptions />
      </div>
    </div>
  );
}

export default CreateProjectComponent
