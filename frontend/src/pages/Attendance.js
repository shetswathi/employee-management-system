import { useEffect, useState } from "react";
import api from "../api";


export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState("");
  const [status, setStatus] = useState("Present");

  useEffect(() => {
    api.get("/employees").then(res => setEmployees(res.data));
  }, []);

  const mark = async () => {
    await api.post("/attendance", { employeeId: selected, status });
    alert("Attendance Marked");
  };

  return (
    <div style={{display:"flex"}}>
     
      <div className="d-flex">
  
  <div className="container mt-4">
    {/* existing attendance UI */}
  </div>
</div>


      <div className="container" style={{marginLeft:"220px"}}>
        <h2>Mark Attendance</h2>

        <select className="input" onChange={e=>setSelected(e.target.value)}>
          <option>Select Employee</option>
          {employees.map(e=>(
            <option key={e._id} value={e._id}>{e.name}</option>
          ))}
        </select>

        <select className="input" onChange={e=>setStatus(e.target.value)}>
          <option>Present</option>
          <option>Absent</option>
          <option>Leave</option>
        </select>

        <button className="btn" onClick={mark}>Mark</button>
      </div>
    </div>
  );
}
