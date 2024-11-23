function Header({ darkMode, setDarkMode }) {
  return (
    <header className="header">
      <h1>Privacy Hub</h1>
      <button 
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    </header>
  )
}

export default Header 