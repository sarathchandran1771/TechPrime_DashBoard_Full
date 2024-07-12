import React, { useEffect, useState } from 'react';
import './ProjectOptions.css';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';




export default function ProjectOptions() {

  const navigate = useNavigate()
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem('data_token');
  const user = localStorage.getItem('userId')


  const selectOptions = {
    reason: ['Business', 'Dealershio', 'Transport'],
    type: ['Internal', 'External', 'Vendor'],
    division: ['Comprossor', 'Filters', 'Pumps','Glass','Water Heater'],
    category: ['Quality A', 'Quality B', 'Quality C', 'Quality D'],
    priority: ['Low', 'Medium', 'High'],
    department: ['Strategy', 'Finance', 'Quality','Maintenance','Stores',],
    startDate: ['Start Date 1', 'Start Date 2', 'Start Date 3'],
    endDate: ['End Date 1', 'End Date 2', 'End Date 3'],
    location: ['Pune', 'Delhi', 'Mumbai'],
  };
  const initialFormData = {
    projectName: '',
    reason: '',
    type: '',
    division: '',
    category: '',
    priority: '',
    department: '',
    startDate: null,
    endDate: null,
    location: '',
    userId: user,
  };

  const [formData, setFormData] = useState(initialFormData);


  useEffect(() => {
    if (token) {
      navigate('/create-project');
    }else{
      navigate('/')
    }
  }, [navigate,token]);


  const handleDateChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value ? value.format('YYYY-MM-DD') : '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prevState) => ({
      ...prevState,
      [name]: value ? '' : 'This field is required',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(initialFormData).forEach((key) => {
      if (!formData[key] && key !== 'startDate' && key !== 'endDate') {
        newErrors[key] = 'This field is required';
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error('Please complete all required fields.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/recordData',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
  
      if (response.status === 201) {
        toast.success(response.data.message)
        setFormData('')
      } else {
        toast.error(`Failed to record: ${response.data.message}`);
      }
      console.log(response)
    } catch (error) {
        toast.error(`Failed to create record: ${error.message}`);
    }
  };
  

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="projectType">
          <div className="textInput">
            <input
              type="text"
              name="projectName"
              placeholder="Enter Project Theme"
              value={formData.projectName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="saveButton">
            <button type="submit">Save Project</button>
          </div>
        </div>

        <div className="sub-container">
        <div className="form-control">
          <label htmlFor="reason">Reason:</label>
          <select
            className={`select-control ${errors.reason ? 'error' : ''}`}
            name="reason"
            id="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          >
            <option value="">Select a reason</option>
            {selectOptions.reason.map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
          </select>
          {errors.reason && <span className="error-message">{errors.reason}</span>}
        </div>

        <div className="form-control">
          <label htmlFor="type">Type:</label>
          <select
            className={`select-control ${errors.type ? 'error' : ''}`}
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select a type</option>
            {selectOptions.type.map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
          </select>
          {errors.type && <span className="error-message">{errors.type}</span>}
        </div>

        <div className="form-control">
          <label htmlFor="division">Division:</label>
          <select
            className={`select-control ${errors.division ? 'error' : ''}`}
            name="division"
            id="division"
            value={formData.division}
            onChange={handleChange}
            required
          >
            <option value="">Select a division</option>
            {selectOptions.division.map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
          </select>
          {errors.division && <span className="error-message">{errors.division}</span>}
        </div>

        <div className="form-control">
          <label htmlFor="category">Category:</label>
          <select
            className={`select-control ${errors.category ? 'error' : ''}`}
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {selectOptions.category.map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
          </select>
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>

        <div className="form-control">
          <label htmlFor="priority">Priority:</label>
          <select
            className={`select-control ${errors.priority ? 'error' : ''}`}
            name="priority"
            id="priority"
            value={formData.priority}
            onChange={handleChange}
            required
          >
            <option value="">Select a priority</option>
            {selectOptions.priority.map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
          </select>
          {errors.priority && <span className="error-message">{errors.priority}</span>}
        </div>

        <div className="form-control">
          <label htmlFor="department">Department:</label>
          <select
            className={`select-control ${errors.department ? 'error' : ''}`}
            name="department"
            id="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select a department</option>
            {selectOptions.department.map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
          </select>
          {errors.department && <span className="error-message">{errors.department}</span>}
        </div>

        <div className="form-control">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem label="Start Date:">
              <DatePicker
                label="Start Date:"
                value={formData.startDate ? dayjs(formData.startDate) : null}
                onChange={(value) => handleDateChange('startDate', value)}
              />
            </DemoItem>
          </LocalizationProvider>
          {errors.startDate && <span className="error-message">{errors.startDate}</span>}
        </div>

        <div className="form-control">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem label="End Date:">
              <DatePicker
                label="End Date:"
                value={formData.endDate ? dayjs(formData.endDate) : null}
                onChange={(value) => handleDateChange('endDate', value)}
              />
            </DemoItem>
          </LocalizationProvider>
          {errors.endDate && <span className="error-message">{errors.endDate}</span>}
        </div>

        <div className="form-control">
          <label htmlFor="location">Location:</label>
          <select
            className={`select-control ${errors.location ? 'error' : ''}`}
            name="location"
            id="location"
            value={formData.location}
            onChange={handleChange}
            required
          >
            <option value="">Select a location</option>
            {selectOptions.location.map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
          </select>
          {errors.location && <span className="error-message">{errors.location}</span>}
        </div>
      </div>
        <div className="saveButtonBottom">
          <button type="submit">Save Project</button>
        </div>
      </form>
    </div>
  );
}
