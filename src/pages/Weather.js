import React, { useState, useEffect } from 'react'
import {
  Typography,
  Container,
  Box,
  Grid,
  IconButton,
  Button,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close'
import AirIcon from '@mui/icons-material/Air'
import { WiHumidity, WiThermometer } from 'react-icons/wi'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import NearMeIcon from '@mui/icons-material/NearMe'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const style = {
  // background: 'linear-gradient(45deg, #FE6B8B 10%, #FF8E53 90%)',
  borderRadius: 50,
  border: 0,
  // color: 'white',
  height: 63,
  padding: '0 16px',
  // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.14),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}))

export default function Weather() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [celsius, setCelsius] = useState(true)
  const [error, setError] = useState(false)
  const [open, setOpen] = useState(false)

  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)

  const urlGeo = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=895284fb2d2c50a520ea537456963d9c`

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude)
      setLng(position.coords.longitude)
    })
  }, [])

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude)
        setLng(position.coords.longitude)
        axios
          .get(urlGeo)
          .then((response) => {
            setData(response.data)
            console.log(response.data)
            // setOpen(true)
          })
          .catch((error) => {
            setError(true)
            setOpen(true)
            console.error('THIS IS ERROR --->', error)
          })
        setError(false)
        setLocation('')
      })
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=895284fb2d2c50a520ea537456963d9c`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios
        .get(url)
        .then((response) => {
          setData(response.data)
          console.log(response.data)
          // setOpen(true)
        })
        .catch((error) => {
          setError(true)
          setOpen(true)
          console.error('THIS IS ERROR --->', error)
        })
      setError(false)
      setLocation('')
    }
  }

  const clearData = () => {
    setData({})
  }

  return (
    <Box sx={{ mt: 14 }}>
      <Container maxwidth="sm">
        <Typography
          variant="h3"
          component="div"
          sx={({ flexGrow: 1 }, { textAlign: 'center' })}
        >
          <b>Enter the name of the city</b>
        </Typography>
        <Box
          sx={{ mt: 5 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            <IconButton
              onClick={getLocation}
              color="inherit"
              size="large"
              title="My location"
            >
              <NearMeIcon />
            </IconButton>
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              onKeyPress={searchLocation}
            />
          </Search>
          <Box>
            {error ? (
              <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="error"
                  sx={{ width: '100%' }}
                >
                  Enter the correct name!
                </Alert>
              </Snackbar>
            ) : null}
          </Box>
        </Box>
        <br />
        <br />

        {data.main ? (
          <Box>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs sx={({ flexGrow: 1 }, { textAlign: 'center' })}>
                {celsius ? (
                  <IconButton
                    onClick={() => setCelsius((prev) => !prev)}
                    color="inherit"
                    size="large"
                    title="Change to °F"
                  >
                    <Button style={style} fontSize="inherit" color="inherit">
                      <h1>°F</h1>
                    </Button>
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => setCelsius((prev) => !prev)}
                    color="inherit"
                    size="large"
                    title="Change to °C"
                  >
                    <Button style={style} fontSize="inherit" color="inherit">
                      <h1>°C</h1>
                    </Button>
                  </IconButton>
                )}
              </Grid>
              <Grid item xs={6} sx={({ flexGrow: 1 }, { textAlign: 'center' })}>
                <Box>
                  <Box>
                    <Typography
                      variant="h2"
                      component="div"
                      sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                    >
                      <b>{data.name}</b> - {data.sys?.country}{' '}
                      {data.main ? (
                        <img
                          alt="flag"
                          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${data.sys?.country}.svg`}
                          width="50px"
                          height="50px"
                        />
                      ) : null}
                    </Typography>
                  </Box>
                  <br />

                  <Typography
                    variant="h1"
                    component="div"
                    sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                  >
                    {celsius ? (
                      <b>{data.main.temp.toFixed() - 273}°C</b>
                    ) : (
                      <b>
                        {(
                          ((data.main.temp.toFixed() - 273) * 9) / 5 +
                          32
                        ).toFixed()}
                        °F
                      </b>
                    )}
                  </Typography>
                  <br />
                  <br />
                </Box>
              </Grid>
              <Grid item xs sx={({ flexGrow: 1 }, { textAlign: 'center' })}>
                <Box>
                  <IconButton onClick={clearData} color="inherit" title="Close">
                    <CloseIcon style={{ fontSize: 40 }} />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={3} sx={({ flexGrow: 1 }, { textAlign: 'center' })}>
                <h2>Conditions</h2>
                <Typography
                  variant="p"
                  component="div"
                  sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                >
                  {data.main ? (
                    <img
                      src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                      //@2x
                      alt="weather icon"
                      // height="100"
                    />
                  ) : null}
                  {data.weather ? (
                    <h2>
                      {data.weather[0].description
                        .toLowerCase()
                        .split(' ')
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.substring(1)
                        )
                        .join(' ')}
                    </h2>
                  ) : null}
                </Typography>
              </Grid>
              <Grid item xs={3} sx={({ flexGrow: 1 }, { textAlign: 'center' })}>
                <h2>Feels Like</h2>
                <Typography
                  variant="p"
                  component="div"
                  sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                >
                  <WiThermometer style={{ fontSize: 50 }} />

                  {celsius ? (
                    <h2>{data.main.feels_like.toFixed() - 273}°C</h2>
                  ) : (
                    <h2>
                      {(
                        ((data.main.feels_like.toFixed() - 273) * 9) / 5 +
                        32
                      ).toFixed()}
                      °F
                    </h2>
                  )}
                </Typography>
              </Grid>
              <Grid item xs={3} sx={({ flexGrow: 1 }, { textAlign: 'center' })}>
                <h2>Humidity</h2>
                <WiHumidity style={{ fontSize: 50 }} />
                <Typography
                  variant="p"
                  component="div"
                  sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                >
                  {data.main ? <h2>{data.main.humidity} %</h2> : null}
                </Typography>
              </Grid>
              <Grid item xs={3} sx={({ flexGrow: 1 }, { textAlign: 'center' })}>
                <h2>Wind Speed</h2>
                <AirIcon style={{ fontSize: 50 }} />
                <Typography
                  variant="p"
                  component="div"
                  sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                >
                  {data.wind ? <h2>{data.wind.speed.toFixed(1)} m/s</h2> : null}
                </Typography>
              </Grid>
            </Grid>
            {/* <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: '100%' }}
              >
                Great!
              </Alert>
            </Snackbar> */}
          </Box>
        ) : (
          <Box
            sx={{ mt: -4 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/weather-bg.svg`}
              alt="weather"
            />
          </Box>
        )}
      </Container>
    </Box>
  )
}
