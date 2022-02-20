import React from 'react'
import { Box, Grid } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import CircularProgress from '@mui/material/CircularProgress'
import Slide from '@mui/material/Slide'

export default function Loading() {
  return (
    <>
      {/* <Slide
        direction="down"
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={{
          appear: 0,
          enter: 700,
          exit: 500,
        }}
      > */}
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <CircularProgress color="secondary" />
        </Grid>
      </Grid>
      {/* </Slide> */}

      {/* <Box sx={{ width: '100%' }}>
        <LinearProgress color="secondary" />
      </Box> */}
    </>
  )
}
