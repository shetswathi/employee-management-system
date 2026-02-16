import { useState, useEffect } from "react";
import api from "../api";
import Navbar from "../components/Navbar";



export default function Employees() {
  const [emps, setEmps] = useState([]);
  const [form, setForm] = useState({ name:"", position:"", salary:"" });
  const [editingId, setEditingId] = useState(null);

  const load = () => {
    api.get("/employees").then(r => setEmps(r.data));
  };

  useEffect(() => {
    load();
  }, []);

  // ADD EMPLOYEE
  const add = async () => {
    await api.post("/employees", form);
    setForm({ name:"", position:"", salary:"" });
    load();
  };

  // DELETE
  const del = async id => {
    await api.delete("/employees/" + id);
    load();
  };

  // START EDIT
  const startEdit = (emp) => {
    setForm(emp);
    setEditingId(emp._id);
  };

  // UPDATE EMPLOYEE
  const update = async () => {
    await api.put("/employees/" + editingId, form);
    setEditingId(null);
    setForm({ name:"", position:"", salary:"" });
    load();
  };

  return (
    
  <div className="d-flex">
    

    <div className="container mt-4">
      <h2>Employees</h2>

      <div className="mb-3">
        <input className="form-control mb-2" placeholder="Name"
          value={form.name}
          onChange={e=>setForm({...form,name:e.target.value})} />

        <input className="form-control mb-2" placeholder="Position"
          value={form.position}
          onChange={e=>setForm({...form,position:e.target.value})} />

        <input className="form-control mb-2" placeholder="Salary"
          value={form.salary}
          onChange={e=>setForm({...form,salary:e.target.value})} />

        {editingId ?
          <button className="btn btn-warning" onClick={update}>Update</button> :
          <button className="btn btn-success" onClick={add}>Add</button>
        }
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {emps.map(e => (
            <tr key={e._id}>
              <td>{e.name}</td>
              <td>{e.position}</td>
              <td>{e.salary}</td>
              <td>
                <button className="btn btn-info btn-sm me-2" onClick={()=>startEdit(e)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={()=>del(e._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);


}

const card = {
  border:"1px solid #ccc",
  padding:"15px",
  margin:"10px",
  borderRadius:"10px"
};
