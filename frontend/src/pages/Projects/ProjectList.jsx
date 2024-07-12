import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import './ProjectList.css'
import ProjectListComponent from '../../components/projectListComponent/ProjectListComponent'

const ProjectList = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <ProjectListComponent/>
      </div>
    </div>
  )
}

export default ProjectList
