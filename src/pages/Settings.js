import { useEffect } from 'react'
import { Typography, Container, Box, Grid, IconButton } from '@mui/material'
import Divider from '@mui/material/Divider'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'

export default function Settings({ light, setLight, celsius, setCelsius }) {
  useEffect(() => {
    document.title = 'Settings'
  }, [])

  return (
    <Box sx={{ mt: 14 }}>
      <Container maxwidth="sm">
        <Typography variant="h3" sx={{ textAlign: 'center' }}>
          <b>SETTINGS</b>
        </Typography>
        <br />
        <Divider variant="middle" sx={{ borderBottomWidth: 2 }} />
        <br />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            <b>Theme</b>
          </Typography>
          {!light ? (
            <IconButton
              onClick={() => setLight((prev) => !prev)}
              color="inherit"
              size="large"
              title="Change Theme to Light Mode"
            >
              <DarkModeOutlinedIcon fontSize="inherit" />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => setLight((prev) => !prev)}
              color="inherit"
              size="large"
              title="Change Theme to Dark Mode"
            >
              <LightModeOutlinedIcon fontSize="inherit" />
            </IconButton>
          )}
        </Grid>
        <br />
        <Divider variant="middle" sx={{ borderBottomWidth: 2 }} />
        <br />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            <b>Temperature</b>
          </Typography>
          {celsius === true || celsius === null ? (
            <IconButton
              onClick={() => setCelsius(false)}
              color="inherit"
              size="large"
              title="Change temperature to °F"
              sx={{ width: '52px', height: '52px' }}
            >
              <h5>°C</h5>
            </IconButton>
          ) : (
            <IconButton
              onClick={() => setCelsius(true)}
              color="inherit"
              size="large"
              title="Change temperature to °C"
              sx={{ width: '52px', height: '52px' }}
            >
              <h5>°F</h5>
            </IconButton>
          )}
        </Grid>
        <br />
        <Divider variant="middle" sx={{ borderBottomWidth: 2 }} />
      </Container>
    </Box>
  )
}
