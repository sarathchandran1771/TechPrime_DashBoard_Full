import React, { useState, useEffect } from "react";
import "./DashBoard.css";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("data_token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            params: { userId: userId },
            withCredentials: true,
          }
        );
        setData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (token && userId) {
      fetchData();
    }
  }, [token, userId]);

  return (
    <div className="stack">
      <div className="Top-Cards">
        Total Projects
        <p>{data?.totalProject}</p>
      </div>
      <div className="Top-Cards">
        Closed
        <p>{data?.closedProject}</p>
      </div>
      <div className="Top-Cards">
        Running
        <p>{data?.runningProject}</p>
      </div>
      <div className="Top-Cards">
        Closure Delay
        <p>{data?.closureDelayProject}</p>
      </div>
      <div className="Top-Cards">
        Cancelled
        <p>{data?.cancelledProject}</p>
      </div>
    </div>
  );
}
