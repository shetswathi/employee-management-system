const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  salary: Number,
  status: { type: String, default: "Active" }
});

module.exports = mongoose.model("Employee", EmployeeSchema);
