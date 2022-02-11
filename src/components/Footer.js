import React from 'react'
import { Container, Typography, Box } from '@mui/material'
import Socials from './Socials'

export default function Footer() {
  return (
    <footer>
      <Box
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          // backgroundColor: (theme) =>
          //   theme.palette.mode === 'light'
          //     ? theme.palette.grey[200]
          //     : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ textAlign: 'center', marginTop: 'calc(2% + 10px)' }}>
            <Box sx={{ mb: 3 }}>
              <Socials />
            </Box>
            <Typography variant="p" component="div">
              © ℜossi, 2021 - 2022
            </Typography>
          </Box>
        </Container>
      </Box>
    </footer>
  )
}
