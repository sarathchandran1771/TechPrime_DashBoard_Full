import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './RecordTables.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


export default function DataTable() {
  const [record, setRecord] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const token = localStorage.getItem('data_token');
  const user = localStorage.getItem('userId')
  const navigate = useNavigate()

  useEffect(() => {
    if (token&& user) {
      navigate('/project-List');
    }else{
      navigate('/')
    }
  }, [navigate,token]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getData', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          params: { userId: user },
          withCredentials: true,
        });
        setRecord(response?.data?.projects || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (token && user) {
      fetchData();
    }
  }, [token, user]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const desiredColumns = [
    { field: 'projectName', headerName: 'Project Name', width: 100 },
    { field: 'category', headerName: 'Category', width: 120 },
    { field: 'department', headerName: 'Department', width: 120 },
    { field: 'division', headerName: 'Division', width: 120 },
    { field: 'location', headerName: 'Location', width: 120 },
    { field: 'priority', headerName: 'Priority', width: 120 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'startDate', headerName: 'Start Date', width: 120 },
    { field: 'endDate', headerName: 'End Date', width: 120 },
    {
      field: '',
      width: 200,
      renderCell: (params) => (
        <div className="action-buttons">
          <button id='start-button' onClick={() => handleAction(params.row, 'start')}>Start</button>
          <button id='cnc-button' onClick={() => handleAction(params.row, 'close')}>Close</button>
          <button id='cnc-button' onClick={() => handleAction(params.row, 'cancel')}>Cancel</button>
        </div>
      ),
    },
  ];

  const handleAction = async (row, action) => {
    try {
      const response = await axios.patch('http://localhost:5000/api/projects/statusUpdate', {
        id: row?._id,
        userId: user,
        status: action
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setRecord((prevRecords) => 
        prevRecords.map((project) => 
          project?._id === row?._id ? response?.data : project
        )
      );
    } catch (error) {
      console.error('Error updating project status:', error);
    }
  };

  if (!Array.isArray(record)) {
    return <div>Loading...</div>;
  }

  const columns = desiredColumns.map(column => ({
    field: column?.field,
    headerName: column?.headerName,
    width: column?.width,
    renderCell: column?.renderCell,
  }));

  const rows = record.map((project) => ({
    id: project._id,
    ...project,
  }));

  return (
    <div className='record-table-container'>
      {!isMobile ? (
        <DataGrid
          className='data-grid-custom'
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          getRowId={(row) => row.id}
        />
      ) : (
        record.map((project) => (
          <div key={project._id} className="card-container">
            {Object.keys(project)?.map((key) => key !== '_id' && key !== 'user' && (
              <div key={key} className="card-field">
                <span>{project[key]}</span>
              </div>
            ))}
            <div className="action-buttons">
              <button id='start-button' onClick={() => handleAction(project, 'start')}>Start</button>
              <button id='cnc-button' onClick={() => handleAction(project, 'close')}>Close</button>
              <button id='cnc-button' onClick={() => handleAction(project, 'cancel')}>Cancel</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
