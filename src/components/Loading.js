import React from 'react'
import { Box, Grid } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import CircularProgress from '@mui/material/CircularProgress'

export default function Loading() {
  return (
    <>
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

      {/* <Box sx={{ width: '100%' }}>
        <LinearProgress color="secondary" />
      </Box> */}
    </>
  )
}
