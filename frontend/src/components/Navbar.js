import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={{ background:"#333", padding:"10px" }}>
      <Link to="/dashboard" style={{color:"white", margin:"10px"}}>Dashboard</Link>
      <Link to="/employees" style={{color:"white", margin:"10px"}}>Employees</Link>
      <Link to="/attendance" style={{color:"white", margin:"10px"}}>Attendance</Link>
    </div>
  );
}
