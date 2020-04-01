import html2canvas from 'html2canvas'
import React, { useRef, useState } from 'react'
import { AspectRatio, Box, Button, Flex, Grid, Label, Slider } from 'theme-ui'
import Frame from './Frame'
import RawFrame from './RawFrame'

export default function Editor({ frameUrl, profileUrl, setProfileUrl }) {
  const [ zoom, setZoom ] = useState(100)
  const fileInputRef = useRef(null)
  const frameRef = useRef(null)

  const handleFileInputChange = () => {
    if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files.length === 1) {
      const reader = new FileReader()
      reader.addEventListener('load', () => setProfileUrl(reader.result), false)
      reader.readAsDataURL(fileInputRef.current.files[0])
    }
  }

  const handleDownloadClick = async () => {
    if (frameRef.current) {
      const canvas = await html2canvas(frameRef.current, { scrollX: 0, scrollY: 0 })
      const image = canvas.toDataURL('image/png')
      const link = document.createElement('a')

      link.setAttribute('download', 'profile-image.png')
      link.setAttribute('href', image)
      link.click()
    }
  }

  return (
      <Box>
        <RawFrame
            frameUrl={frameUrl}
            profileUrl={profileUrl}
            ref={frameRef}
            size={600}
            zoom={zoom}/>
        <Grid
            columns={2}
            gap={2}
            pb={3}>
          <Button
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              variant='primary'>
            Change Photo
          </Button>
          <input
              onChange={handleFileInputChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
              type={'file'}/>
          <Button
              onClick={handleDownloadClick}
              variant='primary'>
            Download
          </Button>
        </Grid>
        <Label p={0}>Zoom photo:</Label>
        <Flex pb={2} sx={{ alignItems: 'center', flexFlow: 'row nowrap' }}>
          <Slider
              max={150}
              min={50}
              onChange={e => setZoom(e.target.value)}
              sx={{}}
              value={zoom}/>
        </Flex>
        <Label>Preview:</Label>
        <AspectRatio ratio={1}>
          <Frame
              frameUrl={frameUrl}
              profileUrl={profileUrl}
              zoom={zoom}/>
        </AspectRatio>
      </Box>
  )
}
