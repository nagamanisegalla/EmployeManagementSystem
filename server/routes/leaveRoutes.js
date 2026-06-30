const express = require("express");

const router = express.Router();

const {
  applyLeave,
  getLeaves,
  updateLeaveStatus,
} = require(
  "../controllers/leaveController"
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
  applyLeave
);

router.get(
  "/",
  protect,
  getLeaves
);

router.put(
  "/:id",
  protect,
  authorize(
    "Admin",
    "HR Manager"
  ),
  updateLeaveStatus
);

module.exports = router;