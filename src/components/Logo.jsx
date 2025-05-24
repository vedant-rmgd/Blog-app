import React from 'react'

function Logo({width = '100px'}) {

  const imageUrl = "src/components/png-transparent-blog-blooger-communication-internet-media-social-technology-social-media-logos-ii-flat-colorful-icon-thumbnail-removebg-preview.png"

  return (
    <div>
      <img src={`${imageUrl ? imageUrl : null}`}  className='rounded-xl w-12'/>
    </div>
  )
}

export default Logo