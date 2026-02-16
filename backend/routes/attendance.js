const router = require("express").Router();
const Attendance = require("../models/Attendance");

// Mark attendance
router.post("/", async (req, res) => {
  const record = new Attendance(req.body);
  await record.save();
  res.json("Marked");
});

// Get history
router.get("/:id", async (req, res) => {
  const data = await Attendance.find({ employeeId: req.params.id });
  res.json(data);
});

module.exports = router;
