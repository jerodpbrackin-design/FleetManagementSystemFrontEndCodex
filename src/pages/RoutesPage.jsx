import { useEffect, useState } from "react";
import api from "../api/api";

function RoutesPage() {
  const [routes, setRoutes] = useState([]);
  const [packages, setPackages] = useState([]);

  const [date, setDate] = useState("");
  const [serviceZone, setServiceZone] = useState("");
  const [driverId, setDriverId] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const fetchRoutes = async () => {
    try {
      const response = await api.get("/routes");
      console.log(response.data);
      setRoutes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPackages = async () => {
    try {
      const response = await api.get("/packages");
      console.log(response.data);
      setPackages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRoutes();
    fetchPackages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !serviceZone || !driverId) {
      alert("All fields are required");
      return;
    }

    const routeData = {
      date,
      service_zone: serviceZone,
      driver_id: driverId,
    };

    try {
      if (editingId) {
        await api.put(`/routes/${editingId}`, routeData);
      } else {
        await api.post("/routes", routeData);
      }

      setDate("");
      setServiceZone("");
      setDriverId("");
      setEditingId(null);

      fetchRoutes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (route) => {
    setEditingId(route[0]);

    // Adjust indexes here if backend order changed
    setDate(route[1] || "");
    setServiceZone(route[2] || "");
    setDriverId(route[3] || "");
  };

  const handleDelete = async (id) => {
    await api.delete(`/routes/${id}`);
    fetchRoutes();
  };

  return (
    <div>
      <h2>Route Management</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Service Zone"
          value={serviceZone}
          onChange={(e) => setServiceZone(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Driver ID"
          value={driverId}
          onChange={(e) => setDriverId(e.target.value)}
          required
        />

        <button type="submit">
          {editingId ? "Update Route" : "Add Route"}
        </button>
      </form>

      <table border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Service Zone</th>
            <th>Driver ID</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {routes.map((route) => (
            <tr key={route[0]}>
              {/* Update indexes if backend changed */}
              <td>{route[1]}</td>
              <td>{route[2]}</td>
              <td>{route[3]}</td>

              <td>
                <button onClick={() => handleEdit(route)}>
                  Edit
                </button>

                <button onClick={() => handleDelete(route[0])}>
                  Delete
                </button>

                <button onClick={() => setSelectedRoute(route[0])}>
                  View Packages
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRoute && (
        <div>
          <h3>Packages for Route #{selectedRoute}</h3>

          {packages.filter((pkg) => Number(pkg[3]) === Number(selectedRoute))
            .length === 0 ? (
            <p>No packages assigned.</p>
          ) : (
            <ul>
              {packages
                .filter(
                  (pkg) => Number(pkg[3]) === Number(selectedRoute)
                )
                .map((pkg) => (
                  <li key={pkg[0]}>
                    {pkg[1]} - {pkg[2]}kg
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default RoutesPage;