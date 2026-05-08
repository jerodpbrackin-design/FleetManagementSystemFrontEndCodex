import { Routes, Route, Link } from 'react-router-dom'
import DriversPage from './pages/DriversPage'
import VehiclesPage from './pages/VehiclesPage'

function App() {
  return (
    <div>
      <h1>Fleet Management System</h1>

      <nav>
        <Link to="/">Drivers</Link>
        {' | '}
        <Link to="/vehicles">Vehicles</Link>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<DriversPage />} />
        <Route path="/vehicles" element={<VehiclesPage />} />
      </Routes>
    </div>
  )
}

export default App