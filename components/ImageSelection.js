import React from 'react'
import useFirestore from '@/lib/useFirestore'

export const ImageSelection = () => {
  const { docs } = useFirestore('templates')

  return (
    <div className="img-selection">
      {docs &&
        docs.map((doc) => (
          <div key={doc.img}>
            <img src={doc.img} alt="uploaded image">
              {console.log(doc.img)}
            </img>
          </div>
        ))}
    </div>
  )
}
