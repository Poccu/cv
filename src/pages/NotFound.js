import React, { useEffect } from 'react'
import { Typography, Container, Box, Grid, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles'
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined'

const ThemeButton = styled(Button)(({ theme }) => ({
  fontSize: 22,
  color: theme.palette.button.primary,
  borderRadius: 50,
  height: 58,
  padding: '0 24px',
  border: '2px solid',
  borderColor: alpha(theme.palette.search.primary, 0.1),
  '&:hover': {
    border: '2px solid',
    borderColor: alpha(theme.palette.search.primary, 0),
    backgroundColor: alpha(theme.palette.search.primary, 0.1),
  },
}))

export default function NotFound() {
  useEffect(() => {
    document.title = 'Oops! Page not found 😞'
  }, [])

  return (
    <Box sx={{ mt: 16 }}>
      <Container maxwidth="sm">
        <Box sx={{ mt: 16, mb: 1 }}>
          <Grid
            container
            direction="column"
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h3">
              <b>Oops! Page not found 😞</b>
            </Typography>
            <br />
            <ThemeButton
              variant="outlined"
              startIcon={<CottageOutlinedIcon style={{ fontSize: 30 }} />}
              component={Link}
              to="/cv"
            >
              Home
            </ThemeButton>
            <>
              <Box
                sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/404-bg.png`}
                  alt="dictionary"
                  height="100%"
                  width="100%"
                  draggable={false}
                />
              </Box>
              <Box
                sx={{ mt: 9, mb: 4, display: { md: 'none' } }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/404-bg.png`}
                    alt="weather"
                    height="85%"
                    width="85%"
                    draggable={false}
                  />
                </Box>
              </Box>
            </>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
