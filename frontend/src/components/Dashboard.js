import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, active: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/employees', { headers: { Authorization: `Bearer ${token}` } });
      setStats({ total: res.data.length, active: res.data.filter(e => e.salary > 0).length }); // Example logic
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1>Employee Management System</h1>
      <p>Total Employees: {stats.total}</p>
      <p>Active Employees: {stats.active}</p>
      <a href="/employees">Employee List</a> | <a href="/attendance">Attendance</a>
    </div>
  );
};

export default Dashboard;