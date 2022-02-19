import React, { useState, useEffect } from 'react'
import {
  Typography,
  Container,
  Box,
  Grid,
  IconButton,
  Button,
  Stack,
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
  fontSize: 16,
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
  backgroundColor: alpha(theme.palette.search.primary, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.search.primary, 0.14),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '400px',
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
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
      width: '342px',
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
            // console.log(response.data)
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
          // console.log(response.data)
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
              <NearMeIcon style={{ fontSize: 30 }} />
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
              <Grid
                item
                xs={12}
                md={3}
                sx={({ flexGrow: 1 }, { textAlign: 'center' })}
              >
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
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
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={({ flexGrow: 1 }, { textAlign: 'center' })}
              >
                <Box>
                  <Box>
                    <Typography
                      variant="h2"
                      component="div"
                      sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                    >
                      {/* - {data.sys?.country} */}
                      <b>{data.name}</b>{' '}
                      {data.main ? (
                        <img
                          alt="flag"
                          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${data.sys?.country}.svg`}
                          width="30px"
                          height="30px"
                          title={data.sys?.country}
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
              <Grid
                item
                xs={12}
                md={3}
                sx={({ flexGrow: 1 }, { textAlign: 'center' })}
              >
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <IconButton onClick={clearData} color="inherit" title="Clear">
                    <CloseIcon style={{ fontSize: 40 }} />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <Stack justifyContent="center" direction="row" spacing={5}>
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
                <IconButton onClick={clearData} color="inherit" title="Clear">
                  <CloseIcon style={{ fontSize: 40 }} />
                </IconButton>
              </Stack>
              <br />
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid
                  item
                  md={3}
                  sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                >
                  <Typography variant="h4" color="textSecondary">
                    <b>Conditions</b>
                  </Typography>
                  <br />
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
                    <br />
                    <br />
                    <Typography variant="h4" color="textSecondary">
                      {data.weather ? (
                        <b>
                          {data.weather[0].description
                            .toLowerCase()
                            .split(' ')
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.substring(1)
                            )
                            .join(' ')}
                        </b>
                      ) : null}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={3}
                  sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                >
                  <Typography variant="h4" color="textSecondary">
                    <b>Feels Like</b>
                  </Typography>
                  <br />
                  <Typography
                    variant="p"
                    component="div"
                    sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                  >
                    <WiThermometer style={{ fontSize: 50 }} />
                    <br />
                    <br />
                    <Typography variant="h4" color="textSecondary">
                      {celsius ? (
                        <b>{data.main.feels_like.toFixed() - 273}°C</b>
                      ) : (
                        <b>
                          {(
                            ((data.main.feels_like.toFixed() - 273) * 9) / 5 +
                            32
                          ).toFixed()}
                          °F
                        </b>
                      )}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={3}
                  sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                >
                  <Typography variant="h4" color="textSecondary">
                    <b>Humidity</b>
                  </Typography>
                  <br />
                  <WiHumidity style={{ fontSize: 50 }} />
                  <br />
                  <br />
                  <Typography variant="h4" color="textSecondary">
                    {data.main ? <b>{data.main.humidity} %</b> : null}
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={3}
                  sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                >
                  <Typography variant="h4" color="textSecondary">
                    <b>Wind Speed</b>
                  </Typography>
                  <br />
                  <AirIcon style={{ fontSize: 50 }} />
                  {/* <Typography
                    variant="p"
                    component="div"
                    sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                  > */}
                  <br />
                  <br />
                  <Typography variant="h4" color="textSecondary">
                    {data.wind ? <b>{data.wind.speed.toFixed(1)} m/s</b> : null}
                  </Typography>
                  {/* </Typography> */}
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <Stack justifyContent="center" direction="column" spacing={0}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid
                    item
                    xs={4}
                    sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                  >
                    <Typography variant="h5" color="textSecondary">
                      <b>Conditions</b>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={4}
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
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                  >
                    <Typography variant="h5" color="textSecondary">
                      {data.weather ? (
                        <b>
                          {data.weather[0].description
                            .toLowerCase()
                            .split(' ')
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.substring(1)
                            )
                            .join(' ')}
                        </b>
                      ) : null}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid
                    item
                    xs={4}
                    sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                  >
                    <Typography variant="h5" color="textSecondary">
                      <b>Feels Like</b>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                  >
                    <WiThermometer style={{ fontSize: 50 }} />
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                  >
                    <Typography variant="h5" color="textSecondary">
                      {celsius ? (
                        <b>{data.main.feels_like.toFixed() - 273}°C</b>
                      ) : (
                        <b>
                          {(
                            ((data.main.feels_like.toFixed() - 273) * 9) / 5 +
                            32
                          ).toFixed()}
                          °F
                        </b>
                      )}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid
                    item
                    xs={4}
                    sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                  >
                    <Typography variant="h5" color="textSecondary">
                      <b>Humidity</b>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                  >
                    <WiHumidity style={{ fontSize: 50 }} />
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                  >
                    <Typography variant="h5" color="textSecondary">
                      {data.main ? <b>{data.main.humidity} %</b> : null}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid
                    item
                    xs={4}
                    sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                  >
                    <Typography variant="h5" color="textSecondary">
                      <b>Wind Speed</b>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                  >
                    <AirIcon style={{ fontSize: 50 }} />
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                  >
                    <Typography variant="h5" color="textSecondary">
                      {data.wind ? (
                        <b>{data.wind.speed.toFixed(1)} m/s</b>
                      ) : null}
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            </Box>

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
          <>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                sx={{ mt: -4 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/weather-bg.svg`}
                  alt="weather"
                  draggable={false}
                />
              </Box>
            </Box>

            <Box sx={{ display: { md: 'none' } }}>
              <Box
                sx={{ mt: -4 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/weather-bg.svg`}
                  alt="weather"
                  height="100%"
                  width="100%"
                  draggable={false}
                />
              </Box>
            </Box>
          </>
        )}
      </Container>
    </Box>
  )
}
