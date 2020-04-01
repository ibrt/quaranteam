import URLSearchParams from '@ungap/url-search-params'
import React, { useState } from 'react'
import { AspectRatio, Box, Grid, Label, Select } from 'theme-ui'
import defaultProfileUrl from '../assets/default-profile.png'
import Frame from './Frame'

const languages = {
  en: {
    label: 'English',
    count: 9
  },
  fr: {
    label: 'Française',
    count: 3
  }
}

export default function Selector({ currentFrameUrl, setCurrentFrameUrl }) {
  const [ language, setLanguage ] = useState(getLanguageFromURL())
  const languageSpec = languages[language]

  const handleLanguageChange = (e) => {
    setLanguageToURL(e.target.value)
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
            {Object.entries(languages).map(e =>
                <option key={e[0]} value={e[0]}>{e[1].label}</option>
            )}
          </Select>
        </Box>
        <AspectRatio ratio={1}>
          <Grid columns={3} gap={2}>
            {[ ...Array(languageSpec.count).keys() ].map((_, i) => {
              const frameUrl = `frames/${language}/${(i + 1).toString().padStart(3, 0)}.png`

              return <Frame
                  dimmed={frameUrl !== currentFrameUrl}
                  frameUrl={frameUrl}
                  key={i}
                  onClick={() => setCurrentFrameUrl(frameUrl)}
                  profileUrl={defaultProfileUrl}
                  selected={frameUrl === currentFrameUrl}
                  zoom={100}/>
            })}
          </Grid>
        </AspectRatio>
      </Box>
  )
}

function getLanguageFromURL() {
  const params = new URLSearchParams(window.location.search)
  const lang = params.get('lang')
  return lang && languages[lang] ? lang : 'en'
}

function setLanguageToURL(language) {
  const params = new URLSearchParams(window.location.search)
  params.set('lang', language)
  window.location.search = params.toString()
}
