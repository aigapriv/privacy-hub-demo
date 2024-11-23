import { useQuery } from '@tanstack/react-query'
import { fetchDashboardStats } from '../api/dashboard'
import DashboardWidget from '../components/DashboardWidget'

function Dashboard() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
    retry: 1
  })

  if (isLoading) return <div>Loading...</div>
  
  if (error) {
    return (
      <div className="error-container">
        <h3>Error loading dashboard</h3>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    )
  }

  return (
    <main className="dashboard">
      <h2>Welcome to Privacy Hub</h2>
      <div className="dashboard-grid">
        <DashboardWidget
          title="Active Privacy Reviews"
          value={stats.activeReviews}
          icon="📋"
          trend={stats.reviewTrend}
        />
        <DashboardWidget
          title="Pending DSRs"
          value={stats.pendingDSRs}
          icon="⏳"
          trend={stats.dsrTrend}
          urgent={stats.pendingDSRs > 5}
        />
        <DashboardWidget
          title="Risk Score"
          value={`${stats.riskScore}%`}
          icon="🎯"
          trend={stats.riskTrend}
        />
        {/* Add more widgets */}
      </div>
    </main>
  )
}

export default Dashboard 