import { useEffect, useState } from "react";
import api from "../api/api";

function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [routes, setRoutes] = useState([]);

  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [routeId, setRouteId] = useState("");

  const [editingId, setEditingId] = useState(null);

  const fetchPackages = async () => {
    try {
      const response = await api.get("/packages");
      setPackages(response.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  const fetchRoutes = async () => {
    try {
      const response = await api.get("/routes");
      setRoutes(response.data);
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  useEffect(() => {
    fetchPackages();
    fetchRoutes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !weight || !routeId) {
      alert("All fields are required");
      return;
    }

    const packageData = {
      description,
      weight,
      route_id: routeId,
    };

    try {
      if (editingId) {
        await api.put(`/packages/${editingId}`, packageData);
      } else {
        await api.post("/packages", packageData);
      }

      setDescription("");
      setWeight("");
      setRouteId("");
      setEditingId(null);

      fetchPackages();
    } catch (error) {
      console.error("Error saving package:", error);
    }
  };

  const handleEdit = (pkg) => {
    setEditingId(pkg[0]);
    setDescription(pkg[1] || "");
    setWeight(pkg[2] || "");
    setRouteId(pkg[3] || "");
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/packages/${id}`);
      fetchPackages();
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  return (
    <div>
      <h2>Package Management</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Weight"
          min="1"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />

        <select
          value={routeId}
          onChange={(e) => setRouteId(e.target.value)}
          required
        >
          <option value="">Select Route</option>

          {routes.map((route, index) => (
            <option key={index} value={route[0]}>
              {route[0]}
            </option>
          ))}
        </select>

        <button type="submit">
          {editingId ? "Update Package" : "Add Package"}
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Weight</th>
            <th>Route ID</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {packages.map((pkg, index) => (
            <tr key={index}>
              <td>{pkg[1]}</td>
              <td>{pkg[2]}</td>
              <td>{pkg[3]}</td>

              <td>
                <button onClick={() => handleEdit(pkg)}>
                  Edit
                </button>

                <button onClick={() => handleDelete(pkg[0])}>
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

export default PackagesPage;