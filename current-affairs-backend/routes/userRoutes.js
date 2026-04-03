const express = require("express");
const router = express.Router();
const {
  getAll,
  search,
  filterByCategory
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.get("/all", protect, getAll);
router.get("/search", protect, search);
router.get("/category/:category", protect, filterByCategory);

module.exports = router;