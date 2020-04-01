import html2canvas from 'html2canvas'
import React, { useRef, useState } from 'react'
import { AspectRatio, Box, Button, Flex, Grid, Label, Slider } from 'theme-ui'
import Frame from './Frame'
import RawFrame from './RawFrame'

export default function Editor({ frameSpec, profileSpec, setProfileSpec }) {
  const [ zoom, setZoom ] = useState(100)
  const fileInputRef = useRef(null)
  const frameRef = useRef(null)

  const handleFileInputChange = () => {
    if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files.length === 1) {
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        const image = new Image()

        image.addEventListener('load', () => {
          setZoom(100)
          setProfileSpec({
            height: image.height,
            url:    reader.result,
            width:  image.width
          })
        })

        image.src = reader.result
      })

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
            frameSpec={frameSpec}
            profileSpec={profileSpec}
            ref={frameRef}
            size={600}
            zoom={zoom}/>
        <Grid
            columns={2}
            gap={2}
            pb={3}>
          <Button
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              variant='outline'>
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
        <Flex pt={'15px'} pb={2} sx={{ alignItems: 'center', flexFlow: 'row nowrap' }}>
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
              frameSpec={frameSpec}
              profileSpec={profileSpec}
              zoom={zoom}/>
        </AspectRatio>
      </Box>
  )
}
