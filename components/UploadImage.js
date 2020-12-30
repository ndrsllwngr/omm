import React, { useState } from 'react'
import { MemeProgress } from '@/components/MemeProgress'

export const UploadImage = () => {
  const [otherFile, setOtherFile] = useState(null)
  const [error, setError] = useState(null)

  const types = ['image/png', 'image/jpeg']

  const handleChange = (e) => {
    let selected = e.target.files[0]

    if (selected && types.includes(selected.type)) {
      setOtherFile(selected)
      setError('')
    } else {
      setOtherFile(null)
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
        {otherFile && <div>{otherFile.name}</div>}
        {otherFile && <MemeProgress otherFile={otherFile} setOtherFile={setOtherFile} />}
      </div>
    </form>
  )
}
