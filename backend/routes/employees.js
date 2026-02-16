const router = require("express").Router();
const Employee = require("../models/Employee");

// GET ALL
router.get("/", async (req, res) => {
  const search = req.query.search || "";
  const employees = await Employee.find({
    name: { $regex: search, $options: "i" }
  });
  res.json(employees);
});

// ADD
router.post("/", async (req, res) => {
  const emp = new Employee(req.body);
  await emp.save();
  res.json(emp);
});

// UPDATE
router.put("/:id", async (req, res) => {
  await Employee.findByIdAndUpdate(req.params.id, req.body);
  res.json("Updated");
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

module.exports = router;
