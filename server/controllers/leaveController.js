const Leave = require("../models/Leave");
const Employee = require("../models/Employee");

// Apply Leave
const applyLeave = async (req, res) => {
  try {
    const leave = await Leave.create(req.body);

    res.status(201).json({
      success: true,
      leave,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Leaves
const getLeaves = async (req, res) => {
  try {
    let leaves;

    if (req.user.role === "Employee") {
      const employee =
        await Employee.findOne({
          email: req.user.email,
        });

      leaves = await Leave.find({
        employee: employee._id,
      }).populate("employee");
    } else {
      leaves = await Leave.find()
        .populate("employee");
    }

    res.status(200).json({
      success: true,
      count: leaves.length,
      leaves,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Leave Status
const updateLeaveStatus = async (
  req,
  res
) => {
  try {
    const leave =
      await Leave.findById(
        req.params.id
      );

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave not found",
      });
    }

    leave.status =
      req.body.status;

    await leave.save();

    res.status(200).json({
      success: true,
      message:
        "Leave status updated",
      leave,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  applyLeave,
  getLeaves,
  updateLeaveStatus,
};