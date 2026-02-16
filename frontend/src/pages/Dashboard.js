import { useEffect, useState } from "react";
import api from "../api";

export default function Dashboard() {
  const [total, setTotal] = useState(0);
  const [present, setPresent] = useState(0);

  const loadData = async () => {
    const empRes = await api.get("/employees");
    setTotal(empRes.data.length);

    let count = 0;
    const today = new Date().toISOString().split("T")[0];

    for (let emp of empRes.data) {
      const att = await api.get("/attendance/" + emp._id);

      att.data.forEach(a => {
        if (
          new Date(a.date).toISOString().split("T")[0] === today &&
          a.status === "Present"
        ) {
          count++;
        }
      });
    }

    setPresent(count);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>

      <div className="row mt-4">

        <div className="col-md-4">
          <div className="card text-white bg-primary p-3">
            <h4>Total Employees</h4>
            <h2>{total}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-success p-3">
            <h4>Present Today</h4>
            <h2>{present}</h2>
          </div>
        </div>

      </div>
    </div>
  );
}
