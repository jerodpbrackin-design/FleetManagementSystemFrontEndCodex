import { useEffect, useState } from "react";
import api from "../api/api";

function RoutesPage() {
  const [routes, setRoutes] = useState([]);
  const [date, setDate] = useState("");
  const [serviceZone, setServiceZone] = useState("");
  const [driverId, setDriverId] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchRoutes = async () => {
    try {
      const response = await api.get("/routes");
      setRoutes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRoutes();
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

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Service Zone</th>
            <th>Driver ID</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {routes.map((route, index) => (
            <tr key={index}>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RoutesPage;