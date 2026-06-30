const express = require("express");

const router = express.Router();

const {
  markAttendance,
  getAttendance,
  getTodayAttendance,
} = require(
  "../controllers/attendanceController"
);

const {
  protect,
  authorize,
} = require(
  "../middleware/authMiddleware"
);

router.post(
  "/",
  protect,
  authorize("Admin", "HR Manager"),
  markAttendance
);

router.get(
  "/",
  protect,
  getAttendance
);

router.get(
  "/today",
  protect,
  getTodayAttendance
);

module.exports = router;