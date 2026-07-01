const User = require("../models/User");
const Employee = require("../models/Employee");

const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found in token",
      });
    }

    const user = req.user;

    const employee = await Employee.findOne({
      email: user.email,
    });

    res.status(200).json({
      success: true,
      profile: {
        name: user.name,
        email: user.email,
        role: user.role,
        phone: employee?.phone,
        department: employee?.department,
        designation: employee?.designation,
        salary: employee?.salary,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
};