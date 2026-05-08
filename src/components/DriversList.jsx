function DriverList({ drivers, deleteDriver }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>License Type</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {drivers.map((driver) => (
          <tr key={driver[0]}>
            <td>{driver[1]}</td>
            <td>{driver[2]}</td>
            <td>
              <button onClick={() => deleteDriver(driver[0])}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DriverList