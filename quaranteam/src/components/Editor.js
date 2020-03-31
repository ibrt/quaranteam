import html2canvas from 'html2canvas'
import React, { useRef, useState } from 'react'
import { AspectRatio, Box, Button, Grid, Slider } from 'theme-ui'
import Frame from './Frame'

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
      const canvas = await html2canvas(frameRef.current)
      const image = canvas.toDataURL('image/png')
      const link = document.createElement('a')

      link.setAttribute('download', 'profile-image.png')
      link.setAttribute('href', image)
      link.click()
    }
  }

  return (
      <Box>
        <AspectRatio ratio={1}>
          <Frame
              frameUrl={frameUrl}
              profileUrl={profileUrl}
              ref={frameRef}
              zoom={zoom}/>
        </AspectRatio>
        <Box pt={2}>
          <Slider
              max={150}
              min={50}
              onChange={e => setZoom(e.target.value)}
              value={zoom}/>
        </Box>
        <Grid
            columns={2}
            gap={2}
            pt={2}>
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
      </Box>
  )
}
