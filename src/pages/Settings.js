import React, { useEffect } from 'react'
import { Typography, Container, Box, Grid } from '@mui/material'

export default function Settings() {
  useEffect(() => {
    document.title = 'Settings'
  }, [])

  return (
    <Box sx={{ mt: 14 }}>
      <Container maxwidth="sm">
        <Typography
          variant="h3"
          sx={({ flexGrow: 1 }, { textAlign: 'center' })}
        >
          <b>Settings</b>
        </Typography>
      </Container>
    </Box>
  )
}
