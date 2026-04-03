const parseCurrentAffairs = (text) => {
  const lines = text.split("\n");

  const result = [];
  let current = {};

  const clean = (str) => str?.replace(/\s+/g, " ").trim();

  lines.forEach(line => {
    line = line.trim();

    if (!line) return;

    if (/^Q\d+/i.test(line)) {
      if (Object.keys(current).length > 0) {
        result.push(current);
        current = {};
      }

      current.question = clean(
        line.replace(/^Q\d+[\.\:\-\s]*/i, "")
      );
    }

    else if (/^(Ans|Answer)/i.test(line)) {
      current.answer = clean(
        line.replace(/^(Ans|Answer)[\:\-\s]*/i, "")
      );
    }

    else if (/^(Exp|Explanation)/i.test(line)) {
      current.explanation = clean(
        line.replace(/^(Exp|Explanation)[\:\-\s]*/i, "")
      );
    }

    else if (/^(Cat|Category)/i.test(line)) {
  let value = line
    .replace(/^Category\s*[:\-]?\s*/i, "")
    .replace(/^Cat\s*[:\-]?\s*/i, "")
    .trim();

  current.category = value.toUpperCase();
}

    else {
      if (current.explanation) {
        current.explanation += " " + clean(line);
      } else if (current.question) {
        current.question += " " + clean(line);
      }
    }
  });

  if (Object.keys(current).length > 0) {
    result.push(current);
  }

  return result;
};

module.exports = parseCurrentAffairs;