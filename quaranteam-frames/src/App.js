import React, { useState } from 'react'
import { Box, Grid, Heading } from 'theme-ui'
import defaultProfileUrl from './assets/default-profile.png'
import Editor from './components/Editor'
import Header from './components/Header'
import Selector from './components/Selector'

export default function App() {
  const [ profileUrl, setProfileUrl ] = useState(defaultProfileUrl)
  const [ frameUrl, setFrameUrl ] = useState('frames/en/001.png')

  return (
      <Box
          sx={{
            maxWidth: 1280,
            margin:   '0 auto'
          }}
          py={[ 2, null, 4 ]}
          px={[ 2, null, 4 ]}>
        <Header/>
        <Box pb={[ 3, null, 4 ]} sx={{ textAlign: 'center' }}>
          <Heading as='h2' variant='title'>Choose your Profile Photo Frame</Heading>
          <Heading as='h3' variant='subtitle'>Add to any social media, like TikTok, Instagram, Nextdoor, Hinge, LinkedIn…</Heading>
        </Box>
        <Box>
          <Grid
              columns={[ 1, null, 2 ]}
              gap={3}>
            <Editor
                frameUrl={frameUrl}
                profileUrl={profileUrl}
                setProfileUrl={setProfileUrl}/>
            <Selector
                currentFrameUrl={frameUrl}
                setCurrentFrameUrl={setFrameUrl}/>
          </Grid>
        </Box>
      </Box>
  )
}
