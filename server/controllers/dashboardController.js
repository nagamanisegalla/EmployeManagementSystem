const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");
const Leave = require("../models/Leave");

const getDashboardStats = async (req, res) => {
  try {
    const totalEmployees =
      await Employee.countDocuments();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(
      tomorrow.getDate() + 1
    );

    const presentToday =
      await Attendance.countDocuments({
        date: {
          $gte: today,
          $lt: tomorrow,
        },
        status: "Present",
      });

    const absentToday =
      await Attendance.countDocuments({
        date: {
          $gte: today,
          $lt: tomorrow,
        },
        status: "Absent",
      });

    const pendingLeaves =
      await Leave.countDocuments({
        status: "Pending",
      });

    res.status(200).json({
      success: true,
      totalEmployees,
      presentToday,
      absentToday,
      pendingLeaves,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};