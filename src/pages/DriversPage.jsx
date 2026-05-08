import { useEffect, useState } from "react";
import DriverForm from "../components/DriverForm";
import DriversList from "../components/DriversList";

function DriversPage() {
  const [drivers, setDrivers] = useState([]);

  const API_URL = "https://jerod.pathway4.click/drivers";

  async function fetchDrivers() {
    const response = await fetch(API_URL);
    const data = await response.json();
    setDrivers(data);
  }

  useEffect(() => {
    fetchDrivers();
  }, []);

  async function addDriver(driver) {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(driver),
    });

    fetchDrivers();
  }

  async function deleteDriver(id) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    fetchDrivers();
  }

  return (
    <div>
      <h2>Drivers</h2>

      <DriverForm addDriver={addDriver} />

      <DriversList drivers={drivers} deleteDriver={deleteDriver} />
    </div>
  );
}

export default DriversPage;
