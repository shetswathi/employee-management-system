import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const token = localStorage.getItem('token');

  const fetchEmployees = useCallback(async () => {
    const res = await axios.get(`http://localhost:5000/api/employees?search=${search}`, { headers: { Authorization: `Bearer ${token}` } });
    setEmployees(res.data);
  }, [search, token]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const deleteEmployee = async (id) => {
    await axios.delete(`http://localhost:5000/api/employees/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchEmployees();
  };

  const printDetails = () => {
    window.print();
  };

  return (
    <div>
      <input type="text" placeholder="Search by name" value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={printDetails}>Print Details</button>
      <Link to="/add-employee">Add Employee</Link>
      <ul>
        {employees.map(emp => (
          <li key={emp._id}>
            {emp.name} - {emp.position} - ${emp.salary}
            <Link to={`/edit-employee/${emp._id}`}>Edit</Link>
            <button onClick={() => deleteEmployee(emp._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;