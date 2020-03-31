import { useTheme } from 'emotion-theming'
import React from 'react'
import { Box, Image } from 'theme-ui'

export default React.forwardRef(({ dimmed, frameUrl, onClick, profileUrl, selected, size, style, zoom }, ref) => {
  return (
      <Box
          ref={ref}
          style={style}
          sx={{
            height:   size ? size : null,
            opacity:  dimmed ? 0.5 : 1,
            overflow: 'hidden',
            position: 'relative',
            width:    size ? size : null
          }}>
        <div style={{
          alignItems: 'center',
          display: 'flex',
          height: '100%',
          left: 0,
          position: 'absolute',
          top: 0,
          width: '100%',
          zIndex: -1
        }}>
          <img
              src={profileUrl}
              style={{
                height: 'auto',
                width: '100%',
                transform: `scale(${zoom / 100}) `,
              }}/>
        </div>

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
            fill:            theme.colors.primary,
            position:        'absolute',
            left:            '50%',
            top:             '50%',
            transformOrigin: 'center',
            transform:       'translate(-50%, -50%) scale(2)'
          }}
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'>
        <path d='M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z'/>
      </svg>
  )
}
