import React from 'react'
import { Container, Typography, Box } from '@mui/material'
import Socials from './Socials'

export default function Footer() {
  return (
    <footer>
      <Container fixed>
        <Box sx={{ textAlign: 'center', mb: 3, marginTop: 'calc(2% + 10px)' }}>
          <Box sx={{ mb: 3 }}>
            <Socials />
          </Box>
          <Typography variant="p" component="div">
            © ℜossi, 2021-2022
          </Typography>
        </Box>
      </Container>
    </footer>
  )
}
