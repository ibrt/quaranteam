import React, { useState } from 'react'
import { Box, Button, Grid, Label, Select } from 'theme-ui'
import { getDefaultProfileSpec, getFrameSpecs, getLanguageFromUrl, getLanguages, setLanguageToUrl } from '../utils'
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
        <Box pt={[ 1, null, 86 ]} pb={[ 3, null, 34 ]}>
          <Label>Choose language:</Label>
          <Select onChange={handleLanguageChange} value={language}>
            {getLanguages().map(l =>
                <option key={l.code} value={l.code}>{l.label}</option>
            )}
          </Select>
        </Box>
        <Grid columns={3} gap={2}>
          {getFrameSpecs(language).map(frameSpec =>
              <Frame
                  dimmed={frameSpec.id !== currentFrameSpec.id}
                  frameSpec={frameSpec}
                  key={frameSpec.id}
                  onClick={() => setCurrentFrameSpec(frameSpec)}
                  profileSpec={getDefaultProfileSpec()}
                  selected={frameSpec.id === currentFrameSpec.id}
                  zoom={100}/>
          )}
        </Grid>
        {language === currentFrameSpec.language && currentFrameSpec.fbUrl &&
        <Box pt={2} sx={{ textAlign: 'center' }}>
          <Button as='a' href={currentFrameSpec.fbUrl} target='_blank' rel='noopener noreferrer' sx={{ fontFamily: 'body' }} variant='outline'>Use selected frame on Facebook</Button>
        </Box>
        }
      </Box>
  )
}
