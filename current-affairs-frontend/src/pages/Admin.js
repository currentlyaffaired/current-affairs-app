import { useState } from "react";
import API from "../api";

const categories = [
  "SPORTS",
  "ECONOMY",
  "AWARDS",
  "SCIENCE",
  "APPOINTMENTS",
  "NATIONAL & INTERNATIONAL",
  "MISCELLANEOUS"
];

function Admin() {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");

  const [questions, setQuestions] = useState([
    { question: "", answer: "", explanation: "", category: "SPORTS" }
  ]);

  const token = localStorage.getItem("token");

  // ➕ Add new block
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", answer: "", explanation: "", category: "SPORTS" }
    ]);
  };

  // ✏️ Update field
  const handleChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  // ❌ Remove block
  const removeQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  // 🚀 Submit
  const submitData = async () => {
    if (!date || !title) {
      alert("Fill date & title");
      return;
    }

    try {
      await API.post(
        "/admin/add-ca",
        {
          date,
          title,
          content: questions
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Uploaded!");

      setQuestions([
        { question: "", answer: "", explanation: "", category: "SPORTS" }
      ]);

    } catch {
      alert("Upload failed");
    }
  };

  return (
    <div className="container">
      <div className="admin-box">
        <h3>📤 Add Current Affairs</h3>

        {/* DATE */}
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />

        {/* TITLE */}
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <hr />

        {/* QUESTIONS */}
        {questions.map((q, index) => (
          <div className="card" key={index}>
            <h4>Question {index + 1}</h4>

            <input
              placeholder="Question"
              value={q.question}
              onChange={e =>
                handleChange(index, "question", e.target.value)
              }
            />

            <input
              placeholder="Answer"
              value={q.answer}
              onChange={e =>
                handleChange(index, "answer", e.target.value)
              }
            />

            <textarea
              placeholder="Explanation"
              value={q.explanation}
              onChange={e =>
                handleChange(index, "explanation", e.target.value)
              }
            />

            <select
              value={q.category}
              onChange={e =>
                handleChange(index, "category", e.target.value)
              }
            >
              {categories.map(cat => (
                <option key={cat}>{cat}</option>
              ))}
            </select>

            <button
              style={{ background: "#dc2626" }}
              onClick={() => removeQuestion(index)}
            >
              Remove
            </button>
          </div>
        ))}

        {/* ACTIONS */}
        <button onClick={addQuestion}> Add Question</button>

        <br /><br />

        <button onClick={submitData}>Upload All</button>
      </div>
    </div>
  );
}

export default Admin;