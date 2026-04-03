const express = require("express");
const router = express.Router();

const {
  createUser,
  addCurrentAffair,
  updateCategory,
  addCurrentAffairs
} = require("../controllers/adminController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/create-user", protect, adminOnly, createUser);
router.post("/add-ca", protect, adminOnly, addCurrentAffairs);
router.post("/add-ca-text", protect, adminOnly, addCurrentAffairs);
router.put("/update-category", protect, adminOnly, updateCategory);

const { deleteQuestion, editQuestion } = require("../controllers/adminController");

router.delete("/delete-question", protect, adminOnly, deleteQuestion);
router.put("/edit-question", protect, adminOnly, editQuestion);

module.exports = router;