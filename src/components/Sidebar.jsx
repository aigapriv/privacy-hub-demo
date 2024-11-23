function Sidebar() {
  const modules = [
    'Privacy Review',
    'ROPA',
    'Privacy by Design',
    'Privacy Notices',
    'Consent Management',
    'DSR Management',
    'Knowledge Base',
    'Risk Dashboard',
    'Support'
  ]

  return (
    <nav className="sidebar">
      {modules.map(module => (
        <button key={module} className="nav-item">
          {module}
        </button>
      ))}
    </nav>
  )
}

export default Sidebar 