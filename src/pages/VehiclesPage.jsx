import { useEffect, useState } from "react";
import api from "../api/api";

function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [licensePlate, setLicensePlate] = useState("");
  const [model, setModel] = useState("");
  const [driverId, setDriverId] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchVehicles = async () => {
    try {
      const response = await api.get("/vehicles");
      setVehicles(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const vehicleData = {
      license_plate: licensePlate,
      model,
      driver_id: driverId,
    };

    try {
      if (editingId) {
        await api.put(`/vehicles/${editingId}`, vehicleData);
      } else {
        await api.post("/vehicles", vehicleData);
      }

      setLicensePlate("");
      setModel("");
      setDriverId("");
      setEditingId(null);

      fetchVehicles();
    } catch (error) {
      console.error("Error saving vehicle:", error);
    }
  };

  const handleEdit = (vehicle) => {
    setEditingId(vehicle[0]);
    setLicensePlate(vehicle[1] || "");
    setModel(vehicle[2] || "");
    setDriverId(vehicle[3] || "");
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/vehicles/${id}`);
      fetchVehicles();
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  return (
    <div>
      <h2>Vehicle Management</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="License Plate"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Vehicle Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
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
          {editingId ? "Update Vehicle" : "Add Vehicle"}
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>License Plate</th>
            <th>Model</th>
            <th>Driver ID</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map((vehicle, index) => (
            <tr key={index}>
              <td>{vehicle[1]}</td>
              <td>{vehicle[2]}</td>
              <td>{vehicle[3]}</td>
              <td>
                <button onClick={() => handleEdit(vehicle)}>
                  Edit
                </button>

                <button onClick={() => handleDelete(vehicle[0])}>
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

export default VehiclesPage;