import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import Header from './Header'
import Sidebar from './Sidebar'
import Dashboard from './pages/Dashboard'
import PrivacyReview from './pages/PrivacyReview'
import ROPA from './pages/ROPA'
import Loading from './Loading'

function AppLayout() {
  const [darkMode, setDarkMode] = useState(false)
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0()

  if (isLoading) return <Loading />
  
  if (!isAuthenticated) {
    loginWithRedirect()
    return <Loading />
  }

  return (
    <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="main-content">
        <Sidebar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/privacy-review" element={<PrivacyReview />} />
            <Route path="/ropa" element={<ROPA />} />
            {/* Add other routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default AppLayout 