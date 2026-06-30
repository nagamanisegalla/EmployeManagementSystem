const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const employeeRoutes =
  require("./routes/employeeRoutes");

const attendanceRoutes =
  require("./routes/attendanceRoutes");

const leaveRoutes =
  require("./routes/leaveRoutes");

const dashboardRoutes =
  require("./routes/dashboardRoutes");

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use(
  "/api/employees",
  employeeRoutes
);

app.use(
  "/api/attendance",
  attendanceRoutes
);

app.use(
  "/api/leaves",
  leaveRoutes
);


app.use(
  "/api/dashboard",
  dashboardRoutes
);
// Default Route
app.get("/", (req, res) => {
  res.send("Employee Management API Running...");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});