import { useTheme } from 'emotion-theming'
import React from 'react'
import { Box, Image } from 'theme-ui'

export default React.forwardRef(({ frameUrl, onClick, profileUrl, selected, size, zoom }, ref) => {
  return (
      <Box
          ref={ref}
          sx={{
            height:   size ? size : null,
            overflow: 'hidden',
            position: 'relative',
            width:    size ? size : null
          }}>
        <Image
            src={profileUrl}
            sx={{
              height:          '100%',
              left:            0,
              objectFit:       'contain',
              position:        'absolute',
              top:             0,
              transform:       `scale(${zoom / 100})`,
              transformOrigin: 'center',
              width:           '100%',
              zIndex:          -1
            }}/>
        {selected && <Tick/>}
        <Image
            onClick={onClick}
            src={frameUrl}
            sx={{
              cursor:  onClick ? 'pointer' : 'inherit',
              display: 'block',
              zIndex:  1
            }}/>
      </Box>
  )
})

function Tick() {
  const theme = useTheme()

  return (
      <svg
          style={{
            fill:      theme.colors.primary,
            position:  'absolute',
            left:      '50%',
            top:       '50%',
            transform: 'translate(-50%, -50%)'
          }}
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'>
        <path d='M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z'/>
      </svg>
  )
}