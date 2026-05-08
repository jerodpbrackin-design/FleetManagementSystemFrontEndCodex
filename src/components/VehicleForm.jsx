import { useState } from 'react'

function VehicleForm({ addVehicle }) {
  const [licensePlate, setLicensePlate] = useState('')
  const [model, setModel] = useState('')
  const [driverId, setDriverId] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    addVehicle({
      license_plate: licensePlate,
      model,
      driver_id: driverId,
    })

    setLicensePlate('')
    setModel('')
    setDriverId('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="License Plate"
        value={licensePlate}
        onChange={(e) => setLicensePlate(e.target.value)}
      />

      <input
        type="text"
        placeholder="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />

      <input
        type="text"
        placeholder="Driver ID"
        value={driverId}
        onChange={(e) => setDriverId(e.target.value)}
      />

      <button type="submit">Add Vehicle</button>
    </form>
  )
}

export default VehicleForm