import React from 'react'
import { Container, Box, Typography, Chip } from '@mui/material'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'

export default function Password() {
  return (
    <Box sx={{ mt: 14 }}>
      <Container maxwidth="sm">
        <Typography>Password</Typography>
        <Chip
          color="error"
          icon={<SentimentVeryDissatisfiedIcon />}
          label="Weak"
        />
      </Container>
    </Box>
  )
}
