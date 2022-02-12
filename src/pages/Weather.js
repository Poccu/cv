import React, { useState } from 'react'
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

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=895284fb2d2c50a520ea537456963d9c`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
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
                <IconButton
                  onClick={() => setCelsius((prev) => !prev)}
                  color="inherit"
                  size="large"
                >
                  {celsius ? (
                    <Button style={style} fontSize="inherit" color="inherit">
                      <h1>°F</h1>
                    </Button>
                  ) : (
                    <Button style={style} fontSize="inherit" color="inherit">
                      <h1>°C</h1>
                    </Button>
                  )}
                </IconButton>
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
                      <b>{((data.main.temp.toFixed() - 273) * 9) / 5 + 32}°F</b>
                    )}
                  </Typography>
                  <br />
                  <br />
                </Box>
              </Grid>
              <Grid item xs sx={({ flexGrow: 1 }, { textAlign: 'center' })}>
                <Box>
                  <IconButton color="inherit">
                    <CloseIcon onClick={clearData} style={{ fontSize: 40 }} />
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
                  <p>
                    {data.weather ? (
                      <h2>
                        {data.weather[0].description[0].toUpperCase() +
                          data.weather[0].description.slice(1)}
                      </h2>
                    ) : null}
                  </p>
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
                      {((data.main.feels_like.toFixed() - 273) * 9) / 5 + 32}°F
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
                  {data.wind ? <h2>{data.wind.speed.toFixed()} m/s</h2> : null}
                </Typography>
              </Grid>
            </Grid>
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
