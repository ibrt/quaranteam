import html2canvas from 'html2canvas'
import React, { useRef, useState } from 'react'
import { AspectRatio, Box, Button, Flex, Grid, Label, Slider } from 'theme-ui'
import { getDefaultFrameSpec, getDefaultProfileSpec } from '../utils'
import Frame from './Frame'
import RawFrame from './RawFrame'
import Selector from './Selector'

export default function Editor() {
  const [ frameSpec, setFrameSpec ] = useState(getDefaultFrameSpec())
  const [ profileSpec, setProfileSpec ] = useState(getDefaultProfileSpec())

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
      <>
        <Grid
            columns={[2, null, 3]}
            gap={2}
            pb={3}
            px={[ 0, null, '4vw' ]}>
          <Button
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              sx={{gridColumn: ['span 2', 1, 1]}}
              variant='outline'>
            Upload Photo
          </Button>
          <input
              onChange={handleFileInputChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
              type={'file'}/>
          <Button
              onClick={handleDownloadClick}
              variant='primary'>
            Download Photo
          </Button>
          <Button disabled={frameSpec.fbUrl === null} onClick={() => frameSpec.fbUrl && (window.location = frameSpec.fbUrl)} sx={{ fontFamily: 'body' }} variant='facebook'>Use on Facebook</Button>
        </Grid>
        <Grid
            columns={[ 1, null, 2 ]}
            gap={3}>
          <Box>
            <RawFrame
                frameSpec={frameSpec}
                profileSpec={profileSpec}
                ref={frameRef}
                size={600}
                zoom={zoom}/>
            <Label p={0}>Zoom photo:</Label>
            <Flex pt={'16px'} pb={2} sx={{ alignItems: 'center', flexFlow: 'row nowrap' }}>
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
          <Selector
              currentFrameSpec={frameSpec}
              setCurrentFrameSpec={setFrameSpec}/>
        </Grid>
      </>
  )
}
