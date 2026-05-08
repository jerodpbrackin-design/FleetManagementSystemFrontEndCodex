function VehiclesList({ vehicles, deleteVehicle }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>License Plate</th>
          <th>Model</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {vehicles.map((vehicle) => (
          <tr key={vehicle[0]}>
            <td>{vehicle[1]}</td>
            <td>{vehicle[2]}</td>
            <td>
              <button onClick={() => deleteVehicle(vehicle[0])}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default VehiclesList