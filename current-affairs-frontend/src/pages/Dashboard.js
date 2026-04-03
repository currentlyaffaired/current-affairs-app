import { useEffect, useState } from "react";
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

function Dashboard() {
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    const res = await API.get("/user/all", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setFiltered(res.data);
  };

  const handleSearch = async () => {
    if (!search) return fetchData();

    const res = await API.get(`/user/search?keyword=${search}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setFiltered(res.data);
  };

  const handleCategory = async (cat) => {
    setActiveCategory(cat);

    if (cat === "ALL") return fetchData();

    const res = await API.get(`/user/category/${cat}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setFiltered(res.data);
  };

  const handleDelete = async (caId, qId) => {
    if (!window.confirm("Delete this question?")) return;

    await API.delete("/admin/delete-question", {
      data: { caId, questionId: qId },
      headers: { Authorization: `Bearer ${token}` }
    });

    fetchData();
  };

  const handleEdit = (q, caId) => {
    setEditing({ ...q, caId });
    setForm(q);
  };

  const submitEdit = async () => {
    await API.put(
      "/admin/edit-question",
      {
        caId: editing.caId,
        questionId: editing._id,
        updatedData: form
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setEditing(null);
    fetchData();
  };

  return (
    <div className="container">
      <h2>Current Affairs</h2>

      {/* SEARCH */}
      <div className="search-bar">
        <input
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* CATEGORY */}
      <div className="category-container">
        {["ALL", ...categories].map(cat => (
          <button
            key={cat}
            className={`category-btn ${
              activeCategory === cat ? "active" : ""
            }`}
            onClick={() => handleCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* DATA */}
      {filtered.map(item => (
        <div key={item._id}>
          <h3 style={{ marginTop: "20px", color: "#475569" }}>{item.date}</h3>

          {item.content.map((q, i) => (
            <div className="card" key={i} style={{ marginTop: "10px" }}>
              {editing && editing._id === q._id ? (
                <>
                  <input
                    value={form.question}
                    onChange={e =>
                      setForm({ ...form, question: e.target.value })
                    }
                  />
                  <input
                    value={form.answer}
                    onChange={e =>
                      setForm({ ...form, answer: e.target.value })
                    }
                  />

                  <select
                    value={form.category}
                    onChange={e =>
                      setForm({ ...form, category: e.target.value })
                    }
                  >
                    {categories.map(cat => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>

                  <button onClick={submitEdit}>Save</button>
                </>
              ) : (
                <>
                  <p className="question">Q. {q.question}</p>
                  <p className="answer">Ans: {q.answer}</p>

                  {q.explanation && (
                    <p className="explanation">{q.explanation}</p>
                  )}

                  <span className="category-tag">{q.category}</span>

                  {role === "admin" && (
                    <>
                      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                        <button onClick={() => handleEdit(q, item._id)}>Edit</button>
                        <button style={{ background: "#dc2626" }} onClick={() => handleDelete(item._id, q._id)}> Delete </button>
                        </div>
                    </>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;