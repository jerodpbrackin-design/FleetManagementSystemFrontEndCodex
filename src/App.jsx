import { Routes, Route, Link } from "react-router-dom";
import DriversPage from "./pages/DriversPage";
import VehiclesPage from "./pages/VehiclesPage";
import RoutesPage from "./pages/RoutesPage";
import PackagesPage from "./pages/PackagesPage";

function App() {
  return (
    <div>
      <h1>Fleet Management System</h1>

      <nav>
        <Link to="/">Drivers</Link>
        {" | "}
        <Link to="/vehicles">Vehicles</Link>
        {" | "}
        <Link to="/routes">Routes</Link>
        {" | "}
        <Link to="/packages">Packages</Link>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<DriversPage />} />
        <Route path="/vehicles" element={<VehiclesPage />} />
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/packages" element={<PackagesPage />} />
      </Routes>
    </div>
  );
}

export default App;
