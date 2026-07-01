const Employee = require("../models/Employee");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Create Employee
const createEmployee = async (req, res) => {
  try {
    console.log(req.body);

    const {
      name,
      email,
      phone,
      department,
      designation,
      salary,
      password,
    } = req.body;

    console.log("Password:", password);

    const employeeExists =
      await Employee.findOne({ email });

    if (employeeExists) {
      return res.status(400).json({
        success: false,
        message: "Employee already exists",
      });
    }

    const employee =
      await Employee.create({
        name,
        email,
        phone,
        department,
        designation,
        salary,
      });

    const userExists =
      await User.findOne({ email });

    if (!userExists) {
      const hashedPassword =
        await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "Employee",
      });

      console.log(
        "User created:",
        user
      );
    }

    res.status(201).json({
      success: true,
      message:
        "Employee created successfully",
      employee,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(
      req.params.id
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const employee =
      await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Employees
const getEmployees = async (req, res) => {
  try {
    const employees =
      await Employee.find();

    res.status(200).json({
      success: true,
      count: employees.length,
      employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const deleteEmployee = async (req, res) => {
  try {
    const employee =
      await Employee.findByIdAndDelete(
        req.params.id
      );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};