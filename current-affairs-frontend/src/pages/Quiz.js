import { useEffect, useState } from "react";
import API from "../api";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const res = await API.get("/user/all", {
      headers: { Authorization: `Bearer ${token}` }
    });

    // flatten all questions
    let allQ = [];
    res.data.forEach(item => {
      item.content.forEach(q => {
        allQ.push(q);
      });
    });

    // shuffle
    allQ.sort(() => Math.random() - 0.5);

    setQuestions(allQ);
  };

  const handleAnswer = (option) => {
    setSelected(option);
    setShowAnswer(true);

    if (option === questions[current].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setCurrent(current + 1);
    setSelected(null);
    setShowAnswer(false);
  };

  if (questions.length === 0) {
    return <div className="container">Loading...</div>;
  }

  if (current >= questions.length) {
    return (
      <div className="container">
        <h2>🎉 Quiz Finished</h2>
        <p>Your Score: {score} / {questions.length}</p>
      </div>
    );
  }

  const q = questions[current];

  const options = q.options || [];

  return (
    <div className="container">
      <h2>🧠 Quiz Mode</h2>

      <p>
        Question {current + 1} / {questions.length}
      </p>

      <div className="card">
        <p className="question">{q.question}</p>

        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            disabled={showAnswer}
            style={{
              display: "block",
              margin: "10px 0",
              background:
                showAnswer && opt === q.answer
                  ? "#16a34a"
                  : showAnswer && opt === selected
                  ? "#dc2626"
                  : ""
            }}
          >
            {opt}
          </button>
        ))}

        {showAnswer && (
          <>
            <p className="answer">Correct: {q.answer}</p>

            <button onClick={nextQuestion}>
              Next →
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Quiz;