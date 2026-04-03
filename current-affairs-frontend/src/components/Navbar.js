function Navbar() {
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="navbar">
      <div> Current Affairs</div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Navbar;