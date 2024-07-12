import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';

const BarChartComponent = () => {
  const [totalData, setTotalData] = useState([]);
  const [closedData, setClosedData] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const token = localStorage.getItem('data_token');
  const userId = localStorage.getItem('userId');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/barRecordData', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          params: { userId: userId },
          withCredentials: true,
        });
        const data = response.data;

        const total = data.map(item => item.total);
        const closed = data.map(item => item.closed);
        const labels = data.map(item => item.department);

        setTotalData(total);
        setClosedData(closed);
        setXLabels(labels);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <BarChart
      slotProps={{
        loadingOverlay: { message: 'Data should be available soon.' },
        noDataOverlay: { message: 'Select some data to display.' },
      }}
      width={600}
      height={350}
      series={[
        { data: totalData, label: 'Total', id: 'totalId' },
        { data: closedData, label: 'Closed', id: 'closedId' },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
  );
};

export default BarChartComponent;
