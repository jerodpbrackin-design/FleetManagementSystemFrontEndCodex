import { useState } from 'react'

function DriverForm({ addDriver }) {
  const [name, setName] = useState('')
  const [licenseType, setLicenseType] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    addDriver({
      name,
      license_type: licenseType,
    })

    setName('')
    setLicenseType('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Driver Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="License Type"
        value={licenseType}
        onChange={(e) => setLicenseType(e.target.value)}
      />

      <button type="submit">Add Driver</button>
    </form>
  )
}

export default DriverForm
