import React from 'react'
import { Grid } from '@mui/material'
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
    </>
  )
}
