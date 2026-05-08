import { useEffect, useState } from 'react'
import VehicleForm from '../components/VehicleForm'
import VehiclesList from '../components/VehiclesList'

function VehiclesPage() {
  const [vehicles, setVehicles] = useState([])

  const API_URL = 'https://jerod.pathway4.click/vehicles'

  async function fetchVehicles() {
    const response = await fetch(API_URL)
    const data = await response.json()
    setVehicles(data)
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  async function addVehicle(vehicle) {
    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicle),
    })

    fetchVehicles()
  }

  async function deleteVehicle(id) {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })

    fetchVehicles()
  }

  return (
    <div>
      <h2>Vehicles</h2>

      <VehicleForm addVehicle={addVehicle} />

      <VehiclesList
        vehicles={vehicles}
        deleteVehicle={deleteVehicle}
      />
    </div>
  )
}

export default VehiclesPage