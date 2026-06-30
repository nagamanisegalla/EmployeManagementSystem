const express = require("express");

const router = express.Router();

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

router.post(
  "/",
  protect,
  authorize("Admin", "HR Manager"),
  createEmployee
);

router.get(
  "/",
  protect,
  getEmployees
);

router.get(
  "/:id",
  protect,
  getEmployee
);

router.put(
  "/:id",
  protect,
  authorize("Admin", "HR Manager"),
  updateEmployee
);

router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  deleteEmployee
);

module.exports = router;