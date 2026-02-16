import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-dark text-white p-3 vh-100" style={{width:"220px"}}>
      <h4 className="text-center">EMS</h4>
      <hr />

      <Link to="/dashboard" className="d-block text-white mb-3">Dashboard</Link>
      <Link to="/employees" className="d-block text-white mb-3">Employees</Link>
      <Link to="/attendance" className="d-block text-white">Attendance</Link>
    </div>
  );
}
