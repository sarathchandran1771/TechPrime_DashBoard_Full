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
          "https://tech-prime-dash-board-full-server.vercel.app/api/dashboard",
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
        <p>Total Projects </p>
        <p>{data?.totalProject}</p>
      </div>
      <div className="Top-Cards">
        <p>Closed</p>
        <p>{data?.closedProject}</p>
      </div>
      <div className="Top-Cards">
        <p>Running</p>
        <p>{data?.runningProject}</p>
      </div>
      <div className="Top-Cards">
        <p>Closure Delay</p>
        <p>{data?.closureDelayProject}</p>
      </div>
      <div className="Top-Cards">
        <p>Cancelled</p>
        <p>{data?.cancelledProject}</p>
      </div>
    </div>
  );
}
