import React from 'react'
import { Container, Typography, Box } from '@mui/material'

export default function Footer() {
  return (
    <footer>
      <Container fixed>
        <Box sx={{ textAlign: 'center', m: 3 }}>
          <Typography variant="p" component="div">
            © ℜossi, 2021-2022
          </Typography>
        </Box>
      </Container>
    </footer>
  )
}
