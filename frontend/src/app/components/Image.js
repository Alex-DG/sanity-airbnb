'use client'

import { urlFor } from '../../../sanity'

const Image = ({ identifier, image, wrapper = true }) => {
  if (!wrapper) return <img src={urlFor(image)} />

  return (
    <div className={identifier === 'main-image' ? 'main-image' : 'image'}>
      <img src={urlFor(image)} />
    </div>
  )
}

export default Image
