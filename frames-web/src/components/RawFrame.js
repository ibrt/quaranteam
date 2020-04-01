import React from 'react'
import Frame from './Frame'

export default React.forwardRef(({ frameSpec, profileUrl, zoom }, ref) => {
  const size = 720 / (window.devicePixelRatio ? window.devicePixelRatio : 1)

  return (
      <>
        <div style={{
          backgroundColor: 'white',
          height:          size,
          left:            0,
          position:        'fixed',
          top:             0,
          width:           size,
          zIndex:          -1
        }}/>
        <div
            ref={ref}
            style={{
              height:   size,
              left:     0,
              position: 'fixed',
              top:      0,
              width:    size,
              zIndex:   -2
            }}>
          <Frame
              frameSpec={frameSpec}
              profileUrl={profileUrl}
              ref={ref}
              size={size}
              zoom={zoom}/>
        </div>
      </>
  )
})
