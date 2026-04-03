const CurrentAffair = require("../models/CurrentAffair");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const parseCurrentAffairs = require("../utils/parser");

exports.createUser = async (req, res) => {
  const { username, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: hashed,
    role: "admin"
  });

  res.json(user);
};

exports.addCurrentAffairs = async (req, res) => {
  try {
    const { date, title, content } = req.body;

    const ca = await CurrentAffair.create({
      date,
      title,
      content
    });

    res.json(ca);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.updateCategory = async (req, res) => {
  const { caId, index, category } = req.body;

  const ca = await CurrentAffair.findById(caId);
  ca.content[index].category = category;

  await ca.save();

  res.json({ msg: "Category updated" });
};

exports.deleteQuestion = async (req, res) => {
  const { caId, questionId } = req.body;

  const ca = await CurrentAffair.findById(caId);

  ca.content = ca.content.filter(
    item => item._id.toString() !== questionId
  );

  await ca.save();

  res.json({ msg: "Deleted successfully" });
};

exports.editQuestion = async (req, res) => {
  try {
    const { caId, questionId, updatedData } = req.body;

    const ca = await CurrentAffair.findById(caId);

    if (!ca) return res.status(404).json({ msg: "CA not found" });

    const question = ca.content.find(
      item => item._id.toString() === questionId
    );

    if (!question) {
      return res.status(404).json({ msg: "Question not found" });
    }

    question.question = updatedData.question || question.question;
    question.answer = updatedData.answer || question.answer;
    question.explanation = updatedData.explanation || "";
    question.category = updatedData.category || question.category;

    await ca.save();

    res.json({ msg: "Updated successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};