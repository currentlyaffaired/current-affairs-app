const CurrentAffair = require("../models/CurrentAffair");

exports.getAll = async (req, res) => {
  const data = await CurrentAffair.find().sort({ date: -1 });
  res.json(data);
};

exports.search = async (req, res) => {
  const { keyword } = req.query;

  const data = await CurrentAffair.find();

  const filtered = [];

  data.forEach(ca => {
    const matchedQuestions = ca.content.filter(item =>
      item.question.toLowerCase().includes(keyword.toLowerCase()) ||
      item.answer.toLowerCase().includes(keyword.toLowerCase()) ||
      (item.explanation && item.explanation.toLowerCase().includes(keyword.toLowerCase()))
    );

    if (matchedQuestions.length > 0) {
      filtered.push({
        _id: ca._id,
        date: ca.date,
        title: ca.title,
        content: matchedQuestions
      });
    }
  });

  res.json(filtered);
};

exports.filterByCategory = async (req, res) => {
  const { category } = req.params;

  const data = await CurrentAffair.find();

  const filtered = [];

  data.forEach(ca => {
    const matchedQuestions = ca.content.filter(
      item => item.category === category
    );

    if (matchedQuestions.length > 0) {
      filtered.push({
        _id: ca._id,
        date: ca.date,
        title: ca.title,
        content: matchedQuestions
      });
    }
  });

  res.json(filtered);
};