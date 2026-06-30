const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

const markAttendance = async (req, res) => {
  try {
    const { employee, status } = req.body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const alreadyMarked =
      await Attendance.findOne({
        employee,
        date: {
          $gte: today,
        },
      });

    if (alreadyMarked) {
      return res.status(400).json({
        success: false,
        message:
          "Attendance already marked today",
      });
    }

    const attendance =
      await Attendance.create({
        employee,
        status,
      });

    res.status(201).json({
      success: true,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAttendance = async (req, res) => {
  try {
    const attendance =
      await Attendance.find()
        .populate("employee");

    res.status(200).json({
      success: true,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTodayAttendance =
  async (req, res) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow =
        new Date(today);

      tomorrow.setDate(
        tomorrow.getDate() + 1
      );

      const attendance =
        await Attendance.find({
          date: {
            $gte: today,
            $lt: tomorrow,
          },
        }).populate("employee");

      res.status(200).json({
        success: true,
        attendance,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  module.exports = {
  markAttendance,
  getAttendance,
  getTodayAttendance,
};