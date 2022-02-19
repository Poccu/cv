import React from 'react'
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
  // backgroundColor: alpha(theme.palette.search.primary, 0.1),
  '&:hover': {
    border: '2px solid',
    borderColor: alpha(theme.palette.search.primary, 0),
    backgroundColor: alpha(theme.palette.search.primary, 0.1),
  },
  // '&:active': {
  //   backgroundColor: '#0062cc',
  // },
}))

export default function NotFound() {
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
              title="Home"
              component={Link}
              to="/"
            >
              Home
            </ThemeButton>
            {/* <Link to="/">Go Home</Link> */}
            <Box
              // sx={{ mt: -1, display: { md: 'none' } }}
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
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
