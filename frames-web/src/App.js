import React from 'react'
import { Box, Heading } from 'theme-ui'
import Editor from './components/Editor'
import Header from './components/Header'

export default function App() {

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
          <Heading as='h2' variant='title'>Add a frame to all your Social profiles</Heading>
          <Heading as='h3' variant='subtitle'><b>Step 1</b> - Upload and adjust photo</Heading>
          <Heading as='h3' variant='subtitle'><b>Step 2</b> - Select language and choose frame</Heading>
          <Heading as='h3' variant='subtitle'><b>Step 3</b> - Download new profile photo or use Facebook uploader</Heading>
        </Box>
        <Box>
          <Editor/>
        </Box>
      </Box>
  )
}
