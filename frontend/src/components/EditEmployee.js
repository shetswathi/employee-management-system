import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/employees`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const employee = res.data.find(emp => emp._id === id);
        if (employee) {
          setName(employee.name);
          setPosition(employee.position);
          setSalary(employee.salary);
        }
      } catch (err) {
        alert('Error fetching employee: ' + err.response.data.error);
      }
    };
    fetchEmployee();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/employees/${id}`, { name, position, salary }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Employee updated successfully!');
      navigate('/employees');
    } catch (err) {
      alert('Error updating employee: ' + err.response.data.error);
    }
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />
        <button type="submit">Update Employee</button>
      </form>
      <a href="/employees">Back to Employee List</a>
    </div>
  );
};

export default EditEmployee;