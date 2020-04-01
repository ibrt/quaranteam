import React, { useState } from 'react'
import { AspectRatio, Box, Grid, Label, Select } from 'theme-ui'
import defaultProfileUrl from '../assets/default-profile.png'
import { frames, getFrameSpecs } from '../frames'
import { getLanguageFromUrl, setLanguageToUrl } from '../language'
import Frame from './Frame'

export default function Selector({ currentFrameSpec, setCurrentFrameSpec }) {
  const [ language, setLanguage ] = useState(getLanguageFromUrl())

  const handleLanguageChange = (e) => {
    setLanguageToUrl(e.target.value)
    setLanguage(e.target.value)
  }

  return (
      <Box
          sx={{
            display:       'flex',
            flexDirection: 'column'
          }}>
        <Box pt={[ 1, null, 3 ]} pb={[ 3, null, 68 ]}>
          <Label>Choose language:</Label>
          <Select onChange={handleLanguageChange} value={language}>
            {Object.entries(frames).map(e =>
                <option key={e[0]} value={e[0]}>{e[1].label}</option>
            )}
          </Select>
        </Box>
        <AspectRatio ratio={1}>
          <Grid columns={3} gap={2}>
            {getFrameSpecs(language).map(frameSpec =>
                <Frame
                    dimmed={frameSpec.id !== currentFrameSpec.id}
                    frameSpec={frameSpec}
                    key={frameSpec.id}
                    onClick={() => setCurrentFrameSpec(frameSpec)}
                    profileUrl={defaultProfileUrl}
                    selected={frameSpec.id === currentFrameSpec.id}
                    zoom={100}/>
            )}
          </Grid>
        </AspectRatio>
      </Box>
  )
}
