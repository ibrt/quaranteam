import React, { useState } from 'react'
import { AspectRatio, Box, Grid, Select } from 'theme-ui'
import defaultProfileUrl from '../assets/default-profile.png'
import Frame from './Frame'

const languages = {
  english: {
    label: 'English',
    count: 9
  },
  french:  {
    label: 'Française',
    count: 3
  }
}

export default function Selector({ currentFrameUrl, setCurrentFrameUrl }) {
  const [ language, setLanguage ] = useState('english')
  const languageSpec = languages[language]

  return (
      <Box sx={{display: 'flex', flexDirection: ['column-reverse', null, 'column'] }}>
        <AspectRatio ratio={1}>
          <Grid columns={3} gap={2}>
            {[ ...Array(languageSpec.count).keys() ].map((_, i) => {
              const frameUrl = `frames/${language}/${(i + 1).toString().padStart(3, 0)}.png`

              return <Frame
                  frameUrl={frameUrl}
                  key={i}
                  onClick={() => setCurrentFrameUrl(frameUrl)}
                  profileUrl={defaultProfileUrl}
                  selected={frameUrl === currentFrameUrl}
                  zoom={100}/>
            })}
          </Grid>
        </AspectRatio>
        <Box pt={[0, null, 3]} pb={[3, null, 0]}>
          <Select onChange={e => setLanguage(e.target.value)} value={language}>
            {Object.entries(languages).map(e =>
                <option key={e[0]} value={e[0]}>{e[1].label}</option>
            )}
          </Select>
        </Box>
      </Box>
  )
}
