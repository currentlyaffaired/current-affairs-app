import { useState, useEffect } from "react";

function Navbar({ setPage }) {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.body.className = dark ? "dark" : "";
    localStorage.setItem("darkMode", dark);
  }, [dark]);

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="navbar">
      <div>Current Affairs</div>

      <div>
        <button onClick={() => setOpen(!open)}>☰</button>

        {open && (
          <div className="menu">
            <div className="menu-item" onClick={() => setPage("home")}>
              Home
            </div>

            <div className="menu-item" onClick={() => setPage("quiz")}>
              Quiz
            </div>

            <div className="menu-item" onClick={() => setPage("starred")}>
              Starred
            </div>

            <div
              className="menu-item"
              onClick={() => setDark(!dark)}
            >
              {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
            </div>

            <div className="menu-item" onClick={logout}>
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;