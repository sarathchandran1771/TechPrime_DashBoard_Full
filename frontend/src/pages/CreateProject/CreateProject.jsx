import React from 'react'
import CreateProjectComponent from '../../components/CreateProjectComponent/CreateProject'
import Sidebar from '../../components/Sidebar/Sidebar'
import './CreateProject.css'

const CreateProject = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <CreateProjectComponent/>
      </div>
    </div>
  )
}

export default CreateProject
