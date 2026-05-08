import { useEffect, useState } from "react";
import api from "../api/api";

function DriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [name, setName] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchDrivers = async () => {
    try {
      const response = await api.get("/drivers");
      setDrivers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const driverData = {
      name,
      license_type: licenseType,
    };

    try {
      if (editingId) {
        await api.put(`/drivers/${editingId}`, driverData);
      } else {
        await api.post("/drivers", driverData);
      }

      setName("");
      setLicenseType("");
      setEditingId(null);

      fetchDrivers();
    } catch (error) {
      console.error("Error saving driver:", error);
    }
  };

  const handleEdit = (driver) => {
    setEditingId(driver[0]);
    setName(driver[1] || "");
    setLicenseType(driver[2] || "");
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/drivers/${id}`);
      fetchDrivers();
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  return (
    <div>
      <h2>Driver Management</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Driver Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="License Type"
          value={licenseType}
          onChange={(e) => setLicenseType(e.target.value)}
          required
        />

        <button type="submit">
          {editingId ? "Update Driver" : "Add Driver"}
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>License Type</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {drivers.map((driver, index) => (
            <tr key={index}>
              <td>{driver[1]}</td>
              <td>{driver[2]}</td>
              <td>
                <button onClick={() => handleEdit(driver)}>Edit</button>

                <button onClick={() => handleDelete(driver[0])}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DriversPage;
