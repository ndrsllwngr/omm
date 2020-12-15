import React, { useState } from 'react'
import { MemeProgress } from '@/components/MemeProgress'

export const UploadImage = () => {
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)

  const types = ['image/png', 'image/jpeg']

  const handleChange = (e) => {
    let selected = e.target.files[0]

    if (selected && types.includes(selected.type)) {
      setFile(selected)
      setError('')
    } else {
      setFile(null)
      setError('Please select an image.')
    }
  }

  return (
    <form>
      <label>
        <input type="file" onChange={handleChange} />
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <MemeProgress file={file} setFile={setFile} />}
      </div>
    </form>
  )
}
