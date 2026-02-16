import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Attendance = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Present');
  const [history, setHistory] = useState([]);
  const token = localStorage.getItem('token');

  const fetchHistory = useCallback(async () => {
    if (!employeeId) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/attendance/${employeeId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(res.data);
    } catch (err) {
      alert('Error fetching history: ' + err.response.data.error);
    }
  }, [employeeId, token]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const markAttendance = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/attendance', { employeeId, date, status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Attendance marked!');
      fetchHistory();
    } catch (err) {
      alert('Error marking attendance: ' + err.response.data.error);
    }
  };

  return (
    <div>
      <h2>Attendance Management</h2>
      <form onSubmit={markAttendance}>
        <input
          type="text"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Leave">Leave</option>
        </select>
        <button type="submit">Mark Attendance</button>
      </form>
      <h3>Attendance History</h3>
      <ul>
        {history.map((record, index) => (
          <li key={index}>
            {record.date} - {record.status}
          </li>
        ))}
      </ul>
      <a href="/dashboard">Back to Dashboard</a>
    </div>
  );
};

export default Attendance;