const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    token,
    mustChangePassword: user.mustChangePassword
  });
};

exports.changePassword = async (req, res) => {
  const { newPassword } = req.body;

  const hashed = await bcrypt.hash(newPassword, 10);

  await User.findByIdAndUpdate(req.user.id, {
    password: hashed,
    mustChangePassword: false
  });

  res.json({ msg: "Password updated" });
};