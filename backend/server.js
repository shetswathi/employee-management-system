require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"));

app.use("/auth", require("./routes/auth"));
app.use("/employees", require("./routes/employees"));
app.use("/attendance", require("./routes/attendance"));

app.listen(process.env.PORT, () =>
  console.log("Server Running")
);
