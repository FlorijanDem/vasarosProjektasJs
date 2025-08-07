const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/adminController");
const restrictToAdmin = require("../middleware/restrictToAdmin");
const protect = require("../middleware/protect");
const authMiddleware = require("../middleware/authMiddleware");

router
  .route("/users")
  .get(authMiddleware, protect, restrictToAdmin, getAllUsers)
  .post(authMiddleware, protect, restrictToAdmin, createUser);
router
  .route("/user/:id")
  .put(authMiddleware, protect, restrictToAdmin, updateUser)
  .delete(authMiddleware, protect, restrictToAdmin, deleteUser);

module.exports = router;
