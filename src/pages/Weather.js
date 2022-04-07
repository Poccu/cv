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
import Divider from '@mui/material/Divider'
import GpsFixedIcon from '@mui/icons-material/GpsFixed'
import RefreshIcon from '@mui/icons-material/Refresh'
import Carousel from 'react-elastic-carousel'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'

const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY
const apiUrl = process.env.REACT_APP_OPENWEATHER_URL
const apiIconsUrl = process.env.REACT_APP_OPENWEATHER_ICONS_URL
const flagsUrl = process.env.REACT_APP_COUNTRY_FLAG_ICONS_URL
const weatherIconsUrl = process.env.REACT_APP_ANIMATED_WEATHER_ICONS_URL
const weatherFillIconsUrl =
  process.env.REACT_APP_ANIMATED_WEATHER_FILL_ICONS_URL

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderBottom: `2px solid ${theme.palette.divider}`,
}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: '26px' }} color="secondary" />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
}))

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

  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)

  const [forecast, setForecast] = useState({})
  const [degree, setDegree] = useState(0)

  const [hourlyForecast, setHourlyForecast] = useState([])

  // localStorage
  useEffect(() => {
    setData(JSON.parse(window.localStorage.getItem('dataWeather')))
    setLocation(JSON.parse(window.localStorage.getItem('location')))
    setCelsius(JSON.parse(window.localStorage.getItem('celsius')))
    setLat(JSON.parse(window.localStorage.getItem('lat')))
    setLon(JSON.parse(window.localStorage.getItem('lon')))
    setForecast(JSON.parse(window.localStorage.getItem('forecast')))
    setDegree(JSON.parse(window.localStorage.getItem('degree')))
    setHourlyForecast(JSON.parse(window.localStorage.getItem('hourlyForecast')))
  }, [])

  useEffect(() => {
    window.localStorage.setItem('dataWeather', JSON.stringify(data))
  }, [data])

  useEffect(() => {
    window.localStorage.setItem('location', JSON.stringify(location))
  }, [location])

  useEffect(() => {
    window.localStorage.setItem('celsius', JSON.stringify(celsius))
  }, [celsius])

  useEffect(() => {
    window.localStorage.setItem('lat', JSON.stringify(lat))
  }, [lat])

  useEffect(() => {
    window.localStorage.setItem('lon', JSON.stringify(lon))
  }, [lon])

  useEffect(() => {
    window.localStorage.setItem('forecast', JSON.stringify(forecast))
  }, [forecast])

  useEffect(() => {
    window.localStorage.setItem('degree', JSON.stringify(degree))
  }, [degree])

  useEffect(() => {
    window.localStorage.setItem(
      'hourlyForecast',
      JSON.stringify(hourlyForecast)
    )
  }, [hourlyForecast])

  const [expanded, setExpanded] = useState('') //'panel0'

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude)
      setLon(position.coords.longitude)
    })
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude)
        setLon(position.coords.longitude)
        const urlGeo = `${apiUrl}/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`
        axios
          .get(urlGeo)
          .then((response) => {
            setData(response.data)
            // console.log('getLocation:', response.data)
            setDegree(response.data.wind.deg)
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

  useEffect(() => {
    const urlForecast = `${apiUrl}/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apiKey}`
    axios
      .get(urlForecast)
      .then((response) => {
        setForecast(response.data)
        // console.log('useEffect getForecast:', response.data)

        let sun = [
          {
            dt: response.data.daily[0].sunrise,
            temp: 995,
            weather: [{ id: 995 }],
          },
          {
            dt: response.data.daily[1].sunrise,
            temp: 995,
            weather: [{ id: 995 }],
          },
          {
            dt: response.data.daily[2].sunrise,
            temp: 995,
            weather: [{ id: 995 }],
          },
          {
            dt: response.data.daily[0].sunset,
            temp: 999,
            weather: [{ id: 999 }],
          },
          {
            dt: response.data.daily[1].sunset,
            temp: 999,
            weather: [{ id: 999 }],
          },
          {
            dt: response.data.daily[2].sunset,
            temp: 999,
            weather: [{ id: 999 }],
          },
        ]

        setHourlyForecast(
          [...response.data.hourly, ...sun]
            .sort((a, b) => a.dt - b.dt)
            .filter((i) => i.dt > response.data.current.dt)
        )

        // console.log(
        //   'hourlyForecast + sunrise&sunset + sort + filter > curr dt:',
        //   [...response.data.hourly, ...sun]
        //     .sort((a, b) => a.dt - b.dt)
        //     .filter((i) => i.dt > response.data.current.dt)
        // )
      })
      .catch((error) => {
        setError(true)
        setOpen(true)
        console.error('THIS IS ERROR --->', error)
      })
    setError(false)
    setLocation('')
  }, [data])

  const searchLocation = (event) => {
    const url = `${apiUrl}/weather?q=${location}&appid=${apiKey}`
    if (event.key === 'Enter') {
      axios
        .get(url)
        .then((response) => {
          setLat(response.data.coord.lat)
          setLon(response.data.coord.lon)
          // console.log(response.data.coord.lat)
          // console.log(response.data.coord.lon)
          setDegree(response.data.wind.deg)
          setData(response.data)
          // console.log('searchLocation:', response.data)
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

  // const refreshLocation = () => {
  //   const url = `${apiUrl}/weather?q=${data.name}&appid=${apiKey}`
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       setLat(response.data.coord.lat)
  //       setLon(response.data.coord.lon)
  //       // console.log(response.data.coord.lat)
  //       // console.log(response.data.coord.lon)
  //       setDegree(response.data.wind.deg)
  //       setData(response.data)
  //       console.log('searchLocation:', response.data)
  //       // setOpen(true)
  //     })
  //     .catch((error) => {
  //       setError(true)
  //       setOpen(true)
  //       console.error('THIS IS ERROR --->', error)
  //     })
  //   setError(false)
  //   setLocation('')
  // }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const clearData = () => {
    setData({})
  }

  let date = new Date()
  let options = { weekday: 'long', month: 'long', day: 'numeric' }
  let todayDate = new Intl.DateTimeFormat('en-GB', options).format(date)

  const getDateFromUnix = (i) => {
    let unixTimestamp = forecast.daily[i].dt
    let dateFromUnix = new Date(unixTimestamp * 1000)
    let options = { month: 'long', day: 'numeric' }
    return new Intl.DateTimeFormat('en-GB', options).format(dateFromUnix)
  }

  const getWeekdayFromUnix = (i) => {
    let unixTimestamp = forecast.daily[i].dt
    let dateFromUnix = new Date(unixTimestamp * 1000)
    let options = { weekday: 'long' }
    return new Intl.DateTimeFormat('en-GB', options).format(dateFromUnix)
  }

  const getTimeFromUnix = (i, timezone) => {
    let unixTimestamp = hourlyForecast[i].dt
    let dateFromUnix = new Date(unixTimestamp * 1000)
    let options = { timeStyle: 'short', timeZone: timezone }
    return new Intl.DateTimeFormat('en-GB', options).format(dateFromUnix)
  }

  const getTimeFromDailyUnix = (unix, timezone) => {
    let dateFromUnix = new Date(unix * 1000)
    let options = { timeStyle: 'short', timeZone: timezone }
    return new Intl.DateTimeFormat('en-GB', options).format(dateFromUnix)
  }

  const getDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']

    degrees = (degrees * 8) / 360
    degrees = Math.round(degrees, 0)
    degrees = (degrees + 8) % 8

    return directions[degrees]
  }

  function getCurrentIconUrl(id) {
    let dayOrNight = forecast?.current?.weather[0]?.icon // 13d / 02n ...
    let result = dayOrNight.slice(dayOrNight.length - 1) // 'd'= day / 'n'= night

    if (result === 'd') {
      switch (id) {
        case 200:
          return '/thunderstorms-day-rain.svg'
          break
        case 201:
        case 202:
          return '/thunderstorms-rain.svg'
          break
        case 210:
          return '/thunderstorms-day.svg'
          break
        case 211:
        case 212:
        case 221:
        case 230:
        case 231:
        case 232:
          return '/thunderstorms.svg'
          break
        case 300:
          return '/partly-cloudy-day-drizzle.svg'
          break
        case 301:
        case 302:
          return '/drizzle.svg'
          break
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
          return '/rain.svg'
          break
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
          return '/partly-cloudy-day-rain.svg'
          break
        case 511:
          return '/snow.svg'
          break
        case 520:
        case 521:
        case 522:
        case 531:
          return '/rain.svg'
          break
        case 600:
        case 601:
          return '/partly-cloudy-day-snow.svg'
          break
        case 602:
        case 611:
        case 612:
        case 613:
        case 615:
        case 616:
        case 620:
        case 621:
        case 622:
          return '/snow.svg'
          break
        case 701:
          return '/mist.svg'
          break
        case 711:
          return '/partly-cloudy-day-smoke.svg'
          break
        case 721:
          return '/haze-day.svg'
          break
        case 731:
          return '/dust-day.svg'
          break
        case 741:
          return '/fog-day.svg'
          break
        case 751:
        case 761:
        case 762:
          return '/dust-day.svg'
          break
        case 771:
          return '/wind.svg'
          break
        case 781:
          return '/tornado.svg'
          break
        case 800:
          return '/clear-day.svg'
          break
        case 801:
          return '/partly-cloudy-day.svg'
          break
        case 802:
          // return '/cloudy.svg'
          return '/partly-cloudy-day.svg'
          break
        case 803:
        case 804:
          return '/overcast-day.svg'
          break
        default:
          return '/not-available.svg'
      }
    } else {
      switch (id) {
        case 200:
          return '/thunderstorms-night-rain.svg'
          break
        case 201:
        case 202:
          return '/thunderstorms-rain.svg'
          break
        case 210:
          return '/thunderstorms-night.svg'
          break
        case 211:
        case 212:
        case 221:
        case 230:
        case 231:
        case 232:
          return '/thunderstorms.svg'
          break
        case 300:
          return '/partly-cloudy-night-drizzle.svg'
          break
        case 301:
        case 302:
          return '/drizzle.svg'
          break
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
          return '/rain.svg'
          break
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
          return '/partly-cloudy-night-rain.svg'
          break
        case 511:
          return '/snow.svg'
          break
        case 520:
        case 521:
        case 522:
        case 531:
          return '/rain.svg'
          break
        case 600:
        case 601:
          return '/partly-cloudy-night-snow.svg'
          break
        case 602:
        case 611:
        case 612:
        case 613:
        case 615:
        case 616:
        case 620:
        case 621:
        case 622:
          return '/snow.svg'
          break
        case 701:
          return '/mist.svg'
          break
        case 711:
          return '/partly-cloudy-night-smoke.svg'
          break
        case 721:
          return '/haze-night.svg'
          break
        case 731:
          return '/dust-night.svg'
          break
        case 741:
          return '/fog-night.svg'
          break
        case 751:
        case 761:
        case 762:
          return '/dust-night.svg'
          break
        case 771:
          return '/wind.svg'
          break
        case 781:
          return '/tornado.svg'
          break
        case 800:
          return '/clear-night.svg'
          // return '/starry-night.svg'
          break
        case 801:
          return '/partly-cloudy-night.svg'
          break
        case 802:
          // return '/cloudy.svg'
          return '/partly-cloudy-night.svg'
          break
        case 803:
        case 804:
          return '/overcast-night.svg'
          break
        default:
          return '/not-available.svg'
      }
    }
  }

  function getHourlyIconUrl(id, i) {
    let isDay =
      hourlyForecast[i]?.dt > forecast?.daily[0]?.sunrise &&
      hourlyForecast[i]?.dt < forecast?.daily[0]?.sunset

    let isDay2 =
      hourlyForecast[i]?.dt > forecast?.daily[1]?.sunrise &&
      hourlyForecast[i]?.dt < forecast?.daily[1]?.sunset

    let isSunrise = hourlyForecast[i]?.dt === forecast?.current?.sunrise
    let isSunset = hourlyForecast[i]?.dt === forecast?.current?.sunset

    if (isSunrise) {
      switch (id) {
        case 995:
          return '/sunrise.svg'
        default:
          return '/not-available.svg'
      }
    } else if (isSunset) {
      switch (id) {
        case 999:
          return '/sunset.svg'
        default:
          return '/not-available.svg'
      }
    } else if (isDay) {
      switch (id) {
        case 995:
          return '/sunrise.svg'
        case 999:
          return '/sunset.svg'
        case 200:
          return '/thunderstorms-day-rain.svg'
          break
        case 201:
        case 202:
          return '/thunderstorms-rain.svg'
          break
        case 210:
          return '/thunderstorms-day.svg'
          break
        case 211:
        case 212:
        case 221:
        case 230:
        case 231:
        case 232:
          return '/thunderstorms.svg'
          break
        case 300:
          return '/partly-cloudy-day-drizzle.svg'
          break
        case 301:
        case 302:
          return '/drizzle.svg'
          break
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
          return '/rain.svg'
          break
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
          return '/partly-cloudy-day-rain.svg'
          break
        case 511:
          return '/snow.svg'
          break
        case 520:
        case 521:
        case 522:
        case 531:
          return '/rain.svg'
          break
        case 600:
        case 601:
          return '/partly-cloudy-day-snow.svg'
          break
        case 602:
        case 611:
        case 612:
        case 613:
        case 615:
        case 616:
        case 620:
        case 621:
        case 622:
          return '/snow.svg'
          break
        case 701:
          return '/mist.svg'
          break
        case 711:
          return '/partly-cloudy-day-smoke.svg'
          break
        case 721:
          return '/haze-day.svg'
          break
        case 731:
          return '/dust-day.svg'
          break
        case 741:
          return '/fog-day.svg'
          break
        case 751:
        case 761:
        case 762:
          return '/dust-day.svg'
          break
        case 771:
          return '/wind.svg'
          break
        case 781:
          return '/tornado.svg'
          break
        case 800:
          return '/clear-day.svg'
          break
        case 801:
          return '/partly-cloudy-day.svg'
          break
        case 802:
          // return '/cloudy.svg'
          return '/partly-cloudy-day.svg'
          break
        case 803:
        case 804:
          return '/overcast-day.svg'
          break
        default:
          return '/not-available.svg'
      }
    } else if (isDay2) {
      switch (id) {
        case 995:
          return '/sunrise.svg'
        case 999:
          return '/sunset.svg'
        case 200:
          return '/thunderstorms-day-rain.svg'
          break
        case 201:
        case 202:
          return '/thunderstorms-rain.svg'
          break
        case 210:
          return '/thunderstorms-day.svg'
          break
        case 211:
        case 212:
        case 221:
        case 230:
        case 231:
        case 232:
          return '/thunderstorms.svg'
          break
        case 300:
          return '/partly-cloudy-day-drizzle.svg'
          break
        case 301:
        case 302:
          return '/drizzle.svg'
          break
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
          return '/rain.svg'
          break
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
          return '/partly-cloudy-day-rain.svg'
          break
        case 511:
          return '/snow.svg'
          break
        case 520:
        case 521:
        case 522:
        case 531:
          return '/rain.svg'
          break
        case 600:
        case 601:
          return '/partly-cloudy-day-snow.svg'
          break
        case 602:
        case 611:
        case 612:
        case 613:
        case 615:
        case 616:
        case 620:
        case 621:
        case 622:
          return '/snow.svg'
          break
        case 701:
          return '/mist.svg'
          break
        case 711:
          return '/partly-cloudy-day-smoke.svg'
          break
        case 721:
          return '/haze-day.svg'
          break
        case 731:
          return '/dust-day.svg'
          break
        case 741:
          return '/fog-day.svg'
          break
        case 751:
        case 761:
        case 762:
          return '/dust-day.svg'
          break
        case 771:
          return '/wind.svg'
          break
        case 781:
          return '/tornado.svg'
          break
        case 800:
          return '/clear-day.svg'
          break
        case 801:
          return '/partly-cloudy-day.svg'
          break
        case 802:
          // return '/cloudy.svg'
          return '/partly-cloudy-day.svg'
          break
        case 803:
        case 804:
          return '/overcast-day.svg'
          break
        default:
          return '/not-available.svg'
      }
    } else {
      switch (id) {
        case 995:
          return '/sunrise.svg'
        case 999:
          return '/sunset.svg'
        case 200:
          return '/thunderstorms-night-rain.svg'
          break
        case 201:
        case 202:
          return '/thunderstorms-rain.svg'
          break
        case 210:
          return '/thunderstorms-night.svg'
          break
        case 211:
        case 212:
        case 221:
        case 230:
        case 231:
        case 232:
          return '/thunderstorms.svg'
          break
        case 300:
          return '/partly-cloudy-night-drizzle.svg'
          break
        case 301:
        case 302:
          return '/drizzle.svg'
          break
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
          return '/rain.svg'
          break
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
          return '/partly-cloudy-night-rain.svg'
          break
        case 511:
          return '/snow.svg'
          break
        case 520:
        case 521:
        case 522:
        case 531:
          return '/rain.svg'
          break
        case 600:
        case 601:
          return '/partly-cloudy-night-snow.svg'
          break
        case 602:
        case 611:
        case 612:
        case 613:
        case 615:
        case 616:
        case 620:
        case 621:
        case 622:
          return '/snow.svg'
          break
        case 701:
          return '/mist.svg'
          break
        case 711:
          return '/partly-cloudy-night-smoke.svg'
          break
        case 721:
          return '/haze-night.svg'
          break
        case 731:
          return '/dust-night.svg'
          break
        case 741:
          return '/fog-night.svg'
          break
        case 751:
        case 761:
        case 762:
          return '/dust-night.svg'
          break
        case 771:
          return '/wind.svg'
          break
        case 781:
          return '/tornado.svg'
          break
        case 800:
          return '/clear-night.svg'
          // return '/starry-night.svg'
          break
        case 801:
          return '/partly-cloudy-night.svg'
          break
        case 802:
          // return '/cloudy.svg'
          return '/partly-cloudy-night.svg'
          break
        case 803:
        case 804:
          return '/overcast-night.svg'
          break
        default:
          return '/not-available.svg'
      }
    }
  }

  function getIconUrl(id) {
    switch (id) {
      case 200:
        return '/thunderstorms-day-rain.svg'
        break
      case 201:
      case 202:
        return '/thunderstorms-rain.svg'
        break
      case 210:
        return '/thunderstorms-day.svg'
        break
      case 211:
      case 212:
      case 221:
      case 230:
      case 231:
      case 232:
        return '/thunderstorms.svg'
        break
      case 300:
        return '/partly-cloudy-day-drizzle.svg'
        break
      case 301:
      case 302:
        return '/drizzle.svg'
        break
      case 310:
      case 311:
      case 312:
      case 313:
      case 314:
      case 321:
        return '/rain.svg'
        break
      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
        return '/partly-cloudy-day-rain.svg'
        break
      case 511:
        return '/snow.svg'
        break
      case 520:
      case 521:
      case 522:
      case 531:
        return '/rain.svg'
        break
      case 600:
      case 601:
        return '/partly-cloudy-day-snow.svg'
        break
      case 602:
      case 611:
      case 612:
      case 613:
      case 615:
      case 616:
      case 620:
      case 621:
      case 622:
        return '/snow.svg'
        break
      case 701:
        return '/mist.svg'
        break
      case 711:
        return '/partly-cloudy-day-smoke.svg'
        break
      case 721:
        return '/haze-day.svg'
        break
      case 731:
        return '/dust-day.svg'
        break
      case 741:
        return '/fog-day.svg'
        break
      case 751:
      case 761:
      case 762:
        return '/dust-day.svg'
        break
      case 771:
        return '/wind.svg'
        break
      case 781:
        return '/tornado.svg'
        break
      case 800:
        return '/clear-day.svg'
        break
      case 801:
        return '/partly-cloudy-day.svg'
        break
      case 802:
        // return '/cloudy.svg'
        return '/partly-cloudy-day.svg'
        break
      case 803:
      case 804:
        return '/overcast-day.svg'
        break
      default:
        return '/not-available.svg'
    }
  }

  function getMoonPhaseSvg(phase) {
    if (phase >= 0 && phase < 0.0625) {
      return 'moon-new.svg'
    } else if (phase >= 0.0625 && phase < 0.1875) {
      return 'moon-waxing-crescent.svg'
    } else if (phase >= 0.1875 && phase < 0.3125) {
      return 'moon-first-quarter.svg'
    } else if (phase >= 0.3125 && phase < 0.4375) {
      return 'moon-waxing-gibbous.svg'
    } else if (phase >= 0.4375 && phase < 0.5625) {
      return 'moon-full.svg'
    } else if (phase >= 0.5625 && phase < 0.6875) {
      return 'moon-waning-gibbous.svg'
    } else if (phase >= 0.6875 && phase < 0.8125) {
      return 'moon-last-quarter.svg'
    } else if (phase >= 0.8125 && phase < 0.9375) {
      return 'moon-waning-crescent.svg'
    } else if (phase >= 0.9375 && phase <= 1) {
      return 'moon-new.svg'
    } else return 'not-available.svg'
  }

  function getMoonPhase(phase) {
    if (phase >= 0 && phase < 0.0625) {
      return 'New Moon'
    } else if (phase >= 0.0625 && phase < 0.1875) {
      return 'Waxing Crescent'
    } else if (phase >= 0.1875 && phase < 0.3125) {
      return 'First Quarter'
    } else if (phase >= 0.3125 && phase < 0.4375) {
      return 'Waxing Gibbous'
    } else if (phase >= 0.4375 && phase < 0.5625) {
      return 'Full Moon'
    } else if (phase >= 0.5625 && phase < 0.6875) {
      return 'Waning Gibbous'
    } else if (phase >= 0.6875 && phase < 0.8125) {
      return 'Last Quarter'
    } else if (phase >= 0.8125 && phase < 0.9375) {
      return 'Waning Crescent'
    } else if (phase >= 0.9375 && phase <= 1) {
      return 'New Moon'
    } else return ''
  }

  function getUVindexSVG(index) {
    switch (index) {
      case 0:
      case 1:
        return 'uv-index-1.svg'
        break
      case 2:
        return 'uv-index-2.svg'
        break
      case 3:
        return 'uv-index-3.svg'
        break
      case 4:
        return 'uv-index-4.svg'
        break
      case 5:
        return 'uv-index-5.svg'
        break
      case 6:
        return 'uv-index-6.svg'
        break
      case 7:
        return 'uv-index-7.svg'
        break
      case 8:
        return 'uv-index-8.svg'
        break
      case 9:
        return 'uv-index-9.svg'
        break
      case 10:
        return 'uv-index-10.svg'
        break
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
        return 'uv-index-11.svg'
        break
      default:
        return 'not-available.svg'
    }
  }

  function getUVindex(index) {
    switch (index) {
      case 0:
      case 1:
        return '1 (low)'
        break
      case 2:
        return '2 (low)'
        break
      case 3:
        return '3 (moderate)'
        break
      case 4:
        return '4 (moderate)'
        break
      case 5:
        return '5 (moderate)'
        break
      case 6:
        return '6 (high)'
        break
      case 7:
        return '7 (high)'
        break
      case 8:
        return '8 (very high)'
        break
      case 9:
        return '9 (very high)'
        break
      case 10:
        return '10 (very high)'
        break
      case 11:
        return '11 (extreme)'
        break
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
        return '11+ (extreme)'
        break
      default:
        return 'not-available.svg'
    }
  }

  function getWindSpeedSvg(speed) {
    switch (speed) {
      case 0:
      case 1:
        return 'wind-beaufort-1.svg'
        break
      case 2:
        return 'wind-beaufort-2.svg'
        break
      case 3:
        return 'wind-beaufort-3.svg'
        break
      case 4:
        return 'wind-beaufort-4.svg'
        break
      case 5:
        return 'wind-beaufort-5.svg'
        break
      case 6:
        return 'wind-beaufort-6.svg'
        break
      case 7:
        return 'wind-beaufort-7.svg'
        break
      case 8:
        return 'wind-beaufort-8.svg'
        break
      case 9:
        return 'wind-beaufort-9.svg'
        break
      case 10:
        return 'wind-beaufort-10.svg'
        break
      case 11:
        return 'wind-beaufort-11.svg'
        break
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
        return 'wind-beaufort-12.svg'
        break
      default:
        return 'not-available.svg'
    }
  }

  useEffect(() => {
    data.name
      ? (document.title = `Weather - ${data.name}`)
      : (document.title = 'Weather')
  }, [data.name])

  return (
    <Box sx={{ mt: 14 }}>
      <Container maxwidth="sm">
        {!data.main ? (
          <Typography
            variant="h3"
            component="div"
            sx={({ flexGrow: 1 }, { textAlign: 'center' })}
          >
            <b>Enter the name of the city</b>
          </Typography>
        ) : null}
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
              <GpsFixedIcon style={{ fontSize: 30 }} />
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
            <Typography
              variant="h6"
              component="div"
              sx={
                ({ flexGrow: 1 }, { textAlign: 'center', fontWeight: 'light' })
              }
              color="textSecondary"
            >
              {todayDate}
            </Typography>
            <br />
            <br />
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
                    <Box>
                      {data.main ? (
                        <Grid
                          container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Box sx={{ width: '30px', height: '20px' }}>
                            <img
                              alt="flag"
                              src={`${flagsUrl}/${data.sys?.country}.svg`}
                              width="30px"
                              height="20px"
                              title={data.sys?.country}
                              draggable={false}
                              class="shadow"
                            />
                          </Box>
                        </Grid>
                      ) : null}
                    </Box>
                    <Typography
                      variant="h2"
                      component="div"
                      sx={{ flexGrow: 1, textAlign: 'center' }}
                    >
                      <Box sx={{ letterSpacing: 5 }}>
                        <b>{data.name.toUpperCase()}</b>
                      </Box>
                    </Typography>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        flexGrow: 1,
                        textAlign: 'center',
                        fontWeight: 'regular',
                      }}
                      color="textSecondary"
                    >
                      <Box sx={{ letterSpacing: 5 }}>
                        {data.weather[0].description.toUpperCase()}
                      </Box>
                      {/* <Box sx={{ letterSpacing: 5 }}>
                        {forecast.current.weather[0].description.toUpperCase()}
                      </Box> */}
                    </Typography>
                  </Box>
                  <br />
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography
                      variant="h1"
                      component="div"
                      sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                    >
                      {celsius ? (
                        <>{data.main.temp.toFixed() - 273}°</>
                      ) : (
                        <>
                          {(
                            ((data.main.temp.toFixed() - 273) * 9) / 5 +
                            32
                          ).toFixed()}
                          °
                        </>
                      )}
                    </Typography>
                    <Box sx={{ ml: -10, mr: -12 }}>
                      <img
                        src={`${weatherIconsUrl}${getCurrentIconUrl(
                          forecast?.current?.weather[0]?.id
                        )}`}
                        alt="weather"
                        height="40%"
                        width="40%"
                        draggable={false}
                        class="shadow"
                      />
                    </Box>
                  </Grid>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      flexGrow: 1,
                      textAlign: 'center',
                      fontWeight: 'regular',
                    }}
                    color="textSecondary"
                  >
                    <Box>
                      <>
                        Feels like{' '}
                        {celsius ? (
                          <>{data.main.feels_like.toFixed() - 273}°</>
                        ) : (
                          <>
                            {(
                              ((data.main.feels_like.toFixed() - 273) * 9) / 5 +
                              32
                            ).toFixed()}
                            °
                          </>
                        )}
                      </>
                    </Box>
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={3}
                sx={({ flexGrow: 1 }, { textAlign: 'center' })}
              >
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  {/* <IconButton onClick={clearData} color="inherit" title="Clear">
                    <CloseIcon style={{ fontSize: 40 }} />
                  </IconButton> */}
                  {/* <IconButton
                    // onClick={refreshLocation}
                    color="inherit"
                    title="Refresh"
                  >
                    <RefreshIcon style={{ fontSize: 40 }} />
                  </IconButton> */}
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
            <br />
            <br />
            <Divider sx={{ borderBottomWidth: 2, width: '100%' }} />
            <br />
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                columns={14}
              >
                <Grid item xs={2}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                  >
                    <Grid
                      container
                      direction="row"
                      justifyContent="left"
                      alignItems="center"
                      textAlign="center"
                    >
                      <img
                        src={`${weatherFillIconsUrl}/${getWindSpeedSvg(
                          +data.wind.speed.toFixed()
                        )}`}
                        alt="weather"
                        height="40px"
                        width="40px"
                        draggable={false}
                        class="shadow"
                      />
                      <Typography variant="p" color="textSecondary">
                        &nbsp;{data.wind.speed.toFixed()} m/s,{' '}
                        {getDirection(data.wind.deg)}
                      </Typography>{' '}
                      <img
                        src={`${weatherIconsUrl}/compass.svg`}
                        alt="weather"
                        height="40px"
                        width="40px"
                        draggable={false}
                        class="shadow"
                        style={{ transform: `rotate(${degree + 180}deg` }}
                      />
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      justifyContent="left"
                      alignItems="center"
                      textAlign="center"
                    >
                      <img
                        src={`${weatherIconsUrl}/barometer.svg`}
                        alt="weather"
                        height="40px"
                        width="40px"
                        draggable={false}
                        class="shadow"
                      />

                      <Typography variant="p" color="textSecondary">
                        {data.main ? <>&nbsp;{data.main.pressure} hPa</> : null}
                      </Typography>
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      justifyContent="left"
                      alignItems="center"
                      textAlign="center"
                    >
                      <img
                        src={`${weatherFillIconsUrl}/raindrops.svg`}
                        alt="weather"
                        height="40px"
                        width="40px"
                        draggable={false}
                        class="shadow"
                      />
                      <Typography variant="p" color="textSecondary">
                        {data.main ? <>&nbsp;{data.main.humidity} %</> : null}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Carousel
                    // easing="cubic-bezier(1,.15,.55,1.54)"
                    // tiltEasing="cubic-bezier(0.110, 1, 1.000, 0.210)"
                    // transitionMs={700}
                    initialActiveIndex={0}
                    itemsToScroll={2}
                    itemsToShow={8}
                  >
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography
                        variant="h6"
                        color="textSecondary"
                        sx={{ fontWeight: 'regular' }}
                      >
                        Now
                      </Typography>
                      <img
                        src={`${weatherIconsUrl}${getCurrentIconUrl(
                          forecast?.current?.weather[0]?.id
                        )}`}
                        alt="weather"
                        height="42%"
                        width="42%"
                        draggable={false}
                        class="shadow"
                      />
                      {/* <br /> */}
                      <Typography variant="h5">
                        {celsius ? (
                          <b>{forecast.hourly[0].temp.toFixed() - 273}°</b>
                        ) : (
                          <b>
                            {(
                              ((forecast.hourly[0].temp.toFixed() - 273) * 9) /
                                5 +
                              32
                            ).toFixed()}
                            °
                          </b>
                        )}
                      </Typography>
                    </Grid>
                    {[
                      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                      17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
                    ].map((i) => (
                      <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        key={hourlyForecast[i].dt}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'regular' }}
                        >
                          <>{getTimeFromUnix(i, forecast.timezone)}</>
                        </Typography>
                        <img
                          src={`${weatherIconsUrl}${getHourlyIconUrl(
                            hourlyForecast[i]?.weather[0]?.id,
                            i
                          )}`}
                          alt="weather"
                          height="42%"
                          width="42%"
                          draggable={false}
                          class="shadow"
                        />
                        {/* <br /> */}
                        <Stack
                          justifyContent="center"
                          direction="row"
                          spacing={2}
                        >
                          <Typography variant="h5">
                            {hourlyForecast[i]?.temp === 995 ? (
                              <Typography
                                variant="h6"
                                color="textSecondary"
                                sx={{ fontWeight: 'regular' }}
                              >
                                Sunrise
                              </Typography>
                            ) : null}
                            {hourlyForecast[i]?.temp === 999 ? (
                              <Typography
                                variant="h6"
                                color="textSecondary"
                                sx={{ fontWeight: 'regular' }}
                              >
                                Sunset
                              </Typography>
                            ) : null}
                            {hourlyForecast[i]?.temp < 990 ? (
                              <>
                                {celsius ? (
                                  <b>
                                    {hourlyForecast[i]?.temp?.toFixed() - 273}°
                                  </b>
                                ) : (
                                  <b>
                                    {(
                                      ((hourlyForecast[i]?.temp?.toFixed() -
                                        273) *
                                        9) /
                                        5 +
                                      32
                                    ).toFixed()}
                                    °
                                  </b>
                                )}
                              </>
                            ) : null}
                          </Typography>
                        </Stack>
                      </Grid>
                    ))}
                  </Carousel>
                </Grid>
              </Grid>
            </Box>
            <br />
            <Divider sx={{ borderBottomWidth: 2, width: '100%' }} />
            <Box>
              <Accordion
                expanded={expanded === 'panel0'}
                onChange={handleChange('panel0')}
              >
                <AccordionSummary
                  aria-controls="panel0d-content"
                  id="panel0d-header"
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    columns={9}
                  >
                    <Grid item xs={7}>
                      <Box sx={{ ml: 3 }}>
                        <Grid
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="left"
                        >
                          <Grid item>
                            <Typography variant="h5" color="textPrimary">
                              <b>Today</b>
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="h6"
                              color="textSecondary"
                              sx={{ fontWeight: 'light' }}
                            >
                              <>{getDateFromUnix(0)}</>
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <img
                          src={`${weatherIconsUrl}${getIconUrl(
                            forecast?.daily[0]?.weather[0]?.id
                          )}`}
                          alt="weather"
                          height="60px"
                          width="60px"
                          draggable={false}
                          class="shadow"
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography variant="h5">
                          {celsius ? (
                            <b>{forecast.daily[0].temp.day.toFixed() - 273}°</b>
                          ) : (
                            <b>
                              {(
                                ((forecast.daily[0].temp.day.toFixed() - 273) *
                                  9) /
                                  5 +
                                32
                              ).toFixed()}
                              °
                            </b>
                          )}
                        </Typography>
                        <Typography variant="h5" color="textSecondary">
                          {celsius ? (
                            <b>
                              {forecast.daily[0].temp.night.toFixed() - 273}°
                            </b>
                          ) : (
                            <b>
                              {(
                                ((forecast.daily[0].temp.night.toFixed() -
                                  273) *
                                  9) /
                                  5 +
                                32
                              ).toFixed()}
                              °
                            </b>
                          )}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    columns={9}
                    sx={{ pl: 4, height: '65px' }}
                  >
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          Wind speed
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                        spacing={0}
                      >
                        <img
                          src={`${weatherFillIconsUrl}/${getWindSpeedSvg(
                            +forecast.daily[0].wind_speed.toFixed()
                          )}`}
                          alt="weather"
                          height="50px"
                          width="50px"
                          draggable={false}
                          class="shadow"
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={2}>
                      <Stack
                        alignItems="center"
                        justifyContent="left"
                        direction="row"
                        spacing={1}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          {/* {forecast.daily[0].wind_speed.toFixed(1)} m/s
                           */}
                          {forecast.daily[0].wind_speed.toFixed()} m/s,{' '}
                          {getDirection(forecast.daily[0].wind_deg)}
                        </Typography>
                        <img
                          src={`${weatherIconsUrl}/compass.svg`}
                          alt="weather"
                          height="40px"
                          width="40px"
                          draggable={false}
                          class="shadow"
                          style={{
                            transform: `rotate(${
                              forecast.daily[0].wind_deg + 180
                            }deg`,
                          }}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          Morning
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography variant="h5">
                          {celsius ? (
                            <b>
                              {forecast.daily[0].temp.morn.toFixed() - 273}°
                            </b>
                          ) : (
                            <b>
                              {(
                                ((forecast.daily[0].temp.morn.toFixed() - 273) *
                                  9) /
                                  5 +
                                32
                              ).toFixed()}
                              °
                            </b>
                          )}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    columns={9}
                    sx={{ pl: 4, height: '65px' }}
                  >
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          Pressure
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                        spacing={0}
                      >
                        <img
                          src={`${weatherIconsUrl}/barometer.svg`}
                          alt="weather"
                          height="50px"
                          width="50px"
                          draggable={false}
                          class="shadow"
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={2}>
                      <Stack
                        alignItems="center"
                        justifyContent="left"
                        direction="row"
                        spacing={1}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          {forecast.daily[0].pressure} hPa
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          Day
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography variant="h5">
                          {celsius ? (
                            <b>{forecast.daily[0].temp.day.toFixed() - 273}°</b>
                          ) : (
                            <b>
                              {(
                                ((forecast.daily[0].temp.day.toFixed() - 273) *
                                  9) /
                                  5 +
                                32
                              ).toFixed()}
                              °
                            </b>
                          )}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    columns={9}
                    sx={{ pl: 4, height: '65px' }}
                  >
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          Humidity
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                        spacing={0}
                      >
                        <img
                          src={`${weatherFillIconsUrl}/raindrops.svg`}
                          alt="weather"
                          height="50px"
                          width="50px"
                          draggable={false}
                          class="shadow"
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={2}>
                      <Stack
                        alignItems="center"
                        justifyContent="left"
                        direction="row"
                        spacing={1}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          {forecast.daily[0].humidity} %
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          Evening
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography variant="h5">
                          {celsius ? (
                            <b>{forecast.daily[0].temp.eve.toFixed() - 273}°</b>
                          ) : (
                            <b>
                              {(
                                ((forecast.daily[0].temp.eve.toFixed() - 273) *
                                  9) /
                                  5 +
                                32
                              ).toFixed()}
                              °
                            </b>
                          )}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    columns={9}
                    sx={{ pl: 4, height: '65px' }}
                  >
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          UV index
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                        spacing={0}
                      >
                        <img
                          src={`${weatherIconsUrl}/${getUVindexSVG(
                            +forecast.daily[0].uvi.toFixed()
                          )}`}
                          alt="weather"
                          height="50px"
                          width="50px"
                          draggable={false}
                          class="shadow"
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={2}>
                      <Stack
                        alignItems="center"
                        justifyContent="left"
                        direction="row"
                        spacing={1}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          {getUVindex(+forecast.daily[0].uvi.toFixed())}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          Night
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography variant="h5">
                          {celsius ? (
                            <b>
                              {forecast.daily[0].temp.night.toFixed() - 273}°
                            </b>
                          ) : (
                            <b>
                              {(
                                ((forecast.daily[0].temp.night.toFixed() -
                                  273) *
                                  9) /
                                  5 +
                                32
                              ).toFixed()}
                              °
                            </b>
                          )}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    columns={9}
                    sx={{ pl: 4, height: '65px' }}
                  >
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          Moon Phase
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                        spacing={0}
                      >
                        <img
                          src={`${weatherFillIconsUrl}/${getMoonPhaseSvg(
                            forecast.daily[0].moon_phase
                          )}`}
                          alt="weather"
                          height="50px"
                          width="50px"
                          draggable={false}
                          class="shadow"
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={2}>
                      <Stack
                        alignItems="center"
                        justifyContent="left"
                        direction="row"
                        spacing={2}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          {getMoonPhase(forecast.daily[0].moon_phase)}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    columns={9}
                    sx={{ pl: 4 }}
                  >
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        // direction="row"
                        direction="column"
                        spacing={0}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          Sunrise
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                        spacing={0}
                      >
                        <Box sx={{ mb: -2 }}>
                          <img
                            src={`${weatherIconsUrl}/sunrise.svg`}
                            alt="weather"
                            height="50px"
                            width="50px"
                            draggable={false}
                            class="shadow"
                          />
                        </Box>
                        <Typography
                          variant="p"
                          color="textSecondary"
                          sx={{ fontWeight: 'medium' }}
                        >
                          {getTimeFromDailyUnix(
                            forecast.daily[0].sunrise,
                            forecast.timezone
                          )}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                        spacing={0}
                      >
                        <Box sx={{ mb: -2 }}>
                          <img
                            src={`${weatherIconsUrl}/sunset.svg`}
                            alt="weather"
                            height="50px"
                            width="50px"
                            draggable={false}
                            class="shadow"
                          />
                        </Box>
                        <Typography
                          variant="p"
                          color="textSecondary"
                          sx={{ fontWeight: 'medium' }}
                        >
                          {getTimeFromDailyUnix(
                            forecast.daily[0].sunset,
                            forecast.timezone
                          )}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        // direction="row"
                        direction="column"
                        spacing={0}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          Sunset
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    columns={9}
                    sx={{ pl: 4 }}
                  >
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          Moonrise
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                        spacing={0}
                      >
                        <Box sx={{ mb: -2 }}>
                          <img
                            src={`${weatherIconsUrl}/moonrise.svg`}
                            alt="weather"
                            height="50px"
                            width="50px"
                            draggable={false}
                            class="shadow"
                          />
                        </Box>
                        <Typography
                          variant="p"
                          color="textSecondary"
                          sx={{ fontWeight: 'medium' }}
                        >
                          {getTimeFromDailyUnix(
                            forecast.daily[0].moonrise,
                            forecast.timezone
                          )}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                        spacing={0}
                      >
                        <Box sx={{ mb: -2 }}>
                          <img
                            src={`${weatherIconsUrl}/moonset.svg`}
                            alt="weather"
                            height="50px"
                            width="50px"
                            draggable={false}
                            class="shadow"
                          />
                        </Box>
                        <Typography
                          variant="p"
                          color="textSecondary"
                          sx={{ fontWeight: 'medium' }}
                        >
                          {getTimeFromDailyUnix(
                            forecast.daily[0].moonset,
                            forecast.timezone
                          )}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        // direction="row"
                        direction="column"
                        spacing={0}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          Moonset
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    columns={9}
                  >
                    <Grid item xs={7}>
                      <Box sx={{ ml: 3 }}>
                        <Grid
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="left"
                        >
                          <Grid item>
                            <Typography variant="h5" color="textPrimary">
                              <b>Tomorrow</b>
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="h6"
                              color="textSecondary"
                              sx={{ fontWeight: 'light' }}
                            >
                              <>{getDateFromUnix(1)}</>
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <img
                          src={`${weatherIconsUrl}${getIconUrl(
                            forecast?.daily[1]?.weather[0]?.id
                          )}`}
                          alt="weather"
                          height="60px"
                          width="60px"
                          draggable={false}
                          class="shadow"
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography variant="h5">
                          {celsius ? (
                            <b>{forecast.daily[1].temp.day.toFixed() - 273}°</b>
                          ) : (
                            <b>
                              {(
                                ((forecast.daily[1].temp.day.toFixed() - 273) *
                                  9) /
                                  5 +
                                32
                              ).toFixed()}
                              °
                            </b>
                          )}
                        </Typography>
                        <Typography variant="h5" color="textSecondary">
                          {celsius ? (
                            <b>
                              {forecast.daily[1].temp.night.toFixed() - 273}°
                            </b>
                          ) : (
                            <b>
                              {(
                                ((forecast.daily[1].temp.night.toFixed() -
                                  273) *
                                  9) /
                                  5 +
                                32
                              ).toFixed()}
                              °
                            </b>
                          )}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    columns={9}
                    sx={{ pl: 4, height: '65px' }}
                  >
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          Wind speed
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                        spacing={0}
                      >
                        <img
                          src={`${weatherFillIconsUrl}/${getWindSpeedSvg(
                            +forecast.daily[1].wind_speed.toFixed()
                          )}`}
                          alt="weather"
                          height="50px"
                          width="50px"
                          draggable={false}
                          class="shadow"
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={2}>
                      <Stack
                        alignItems="center"
                        justifyContent="left"
                        direction="row"
                        spacing={1}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          {/* {forecast.daily[1].wind_speed.toFixed(1)} m/s
                           */}
                          {forecast.daily[1].wind_speed.toFixed()} m/s,{' '}
                          {getDirection(forecast.daily[1].wind_deg)}
                        </Typography>
                        <img
                          src={`${weatherIconsUrl}/compass.svg`}
                          alt="weather"
                          height="40px"
                          width="40px"
                          draggable={false}
                          class="shadow"
                          style={{
                            transform: `rotate(${
                              forecast.daily[1].wind_deg + 180
                            }deg`,
                          }}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          Morning
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography variant="h5">
                          {celsius ? (
                            <b>
                              {forecast.daily[1].temp.morn.toFixed() - 273}°
                            </b>
                          ) : (
                            <b>
                              {(
                                ((forecast.daily[1].temp.morn.toFixed() - 273) *
                                  9) /
                                  5 +
                                32
                              ).toFixed()}
                              °
                            </b>
                          )}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    columns={9}
                    sx={{ pl: 4, height: '65px' }}
                  >
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          Pressure
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                        spacing={0}
                      >
                        <img
                          src={`${weatherIconsUrl}/barometer.svg`}
                          alt="weather"
                          height="50px"
                          width="50px"
                          draggable={false}
                          class="shadow"
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={2}>
                      <Stack
                        alignItems="center"
                        justifyContent="left"
                        direction="row"
                        spacing={1}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          {forecast.daily[1].pressure} hPa
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          Day
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography variant="h5">
                          {celsius ? (
                            <b>{forecast.daily[1].temp.day.toFixed() - 273}°</b>
                          ) : (
                            <b>
                              {(
                                ((forecast.daily[1].temp.day.toFixed() - 273) *
                                  9) /
                                  5 +
                                32
                              ).toFixed()}
                              °
                            </b>
                          )}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    columns={9}
                    sx={{ pl: 4, height: '65px' }}
                  >
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          Humidity
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                        spacing={0}
                      >
                        <img
                          src={`${weatherFillIconsUrl}/raindrops.svg`}
                          alt="weather"
                          height="50px"
                          width="50px"
                          draggable={false}
                          class="shadow"
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={2}>
                      <Stack
                        alignItems="center"
                        justifyContent="left"
                        direction="row"
                        spacing={1}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          {forecast.daily[1].humidity} %
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          Evening
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography variant="h5">
                          {celsius ? (
                            <b>{forecast.daily[1].temp.eve.toFixed() - 273}°</b>
                          ) : (
                            <b>
                              {(
                                ((forecast.daily[1].temp.eve.toFixed() - 273) *
                                  9) /
                                  5 +
                                32
                              ).toFixed()}
                              °
                            </b>
                          )}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    columns={9}
                    sx={{ pl: 4, height: '65px' }}
                  >
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          UV index
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                        spacing={0}
                      >
                        <img
                          src={`${weatherIconsUrl}/${getUVindexSVG(
                            +forecast.daily[1].uvi.toFixed()
                          )}`}
                          alt="weather"
                          height="50px"
                          width="50px"
                          draggable={false}
                          class="shadow"
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={2}>
                      <Stack
                        alignItems="center"
                        justifyContent="left"
                        direction="row"
                        spacing={1}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          {getUVindex(+forecast.daily[1].uvi.toFixed())}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          Night
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography variant="h5">
                          {celsius ? (
                            <b>
                              {forecast.daily[1].temp.night.toFixed() - 273}°
                            </b>
                          ) : (
                            <b>
                              {(
                                ((forecast.daily[1].temp.night.toFixed() -
                                  273) *
                                  9) /
                                  5 +
                                32
                              ).toFixed()}
                              °
                            </b>
                          )}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    columns={9}
                    sx={{ pl: 4, height: '65px' }}
                  >
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          Moon Phase
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                        spacing={0}
                      >
                        <img
                          src={`${weatherFillIconsUrl}/${getMoonPhaseSvg(
                            forecast.daily[1].moon_phase
                          )}`}
                          alt="weather"
                          height="50px"
                          width="50px"
                          draggable={false}
                          class="shadow"
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={2}>
                      <Stack
                        alignItems="center"
                        justifyContent="left"
                        direction="row"
                        spacing={2}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          {getMoonPhase(forecast.daily[1].moon_phase)}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    columns={9}
                    sx={{ pl: 4 }}
                  >
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        // direction="row"
                        direction="column"
                        spacing={0}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          Sunrise
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                        spacing={0}
                      >
                        <Box sx={{ mb: -2 }}>
                          <img
                            src={`${weatherIconsUrl}/sunrise.svg`}
                            alt="weather"
                            height="50px"
                            width="50px"
                            draggable={false}
                            class="shadow"
                          />
                        </Box>
                        <Typography
                          variant="p"
                          color="textSecondary"
                          sx={{ fontWeight: 'medium' }}
                        >
                          {getTimeFromDailyUnix(
                            forecast.daily[1].sunrise,
                            forecast.timezone
                          )}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                        spacing={0}
                      >
                        <Box sx={{ mb: -2 }}>
                          <img
                            src={`${weatherIconsUrl}/sunset.svg`}
                            alt="weather"
                            height="50px"
                            width="50px"
                            draggable={false}
                            class="shadow"
                          />
                        </Box>
                        <Typography
                          variant="p"
                          color="textSecondary"
                          sx={{ fontWeight: 'medium' }}
                        >
                          {getTimeFromDailyUnix(
                            forecast.daily[1].sunset,
                            forecast.timezone
                          )}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        // direction="row"
                        direction="column"
                        spacing={0}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          Sunset
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    columns={9}
                    sx={{ pl: 4 }}
                  >
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          Moonrise
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                        spacing={0}
                      >
                        <Box sx={{ mb: -2 }}>
                          <img
                            src={`${weatherIconsUrl}/moonrise.svg`}
                            alt="weather"
                            height="50px"
                            width="50px"
                            draggable={false}
                            class="shadow"
                          />
                        </Box>
                        <Typography
                          variant="p"
                          color="textSecondary"
                          sx={{ fontWeight: 'medium' }}
                        >
                          {getTimeFromDailyUnix(
                            forecast.daily[1].moonrise,
                            forecast.timezone
                          )}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                        spacing={0}
                      >
                        <Box sx={{ mb: -2 }}>
                          <img
                            src={`${weatherIconsUrl}/moonset.svg`}
                            alt="weather"
                            height="50px"
                            width="50px"
                            draggable={false}
                            class="shadow"
                          />
                        </Box>
                        <Typography
                          variant="p"
                          color="textSecondary"
                          sx={{ fontWeight: 'medium' }}
                        >
                          {getTimeFromDailyUnix(
                            forecast.daily[1].moonset,
                            forecast.timezone
                          )}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        // direction="row"
                        direction="column"
                        spacing={0}
                      >
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontWeight: 'light' }}
                        >
                          Moonset
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              {[2, 3, 4, 5, 6, 7].map((i) => (
                <Accordion
                  expanded={expanded === `panel${i}`}
                  onChange={handleChange(`panel${i}`)}
                  key={forecast.daily[i].dt}
                >
                  <AccordionSummary
                    aria-controls={`panel${i}d-content`}
                    id={`panel${i}d-header`}
                  >
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      columns={9}
                    >
                      <Grid item xs={7}>
                        <Box sx={{ ml: 3 }}>
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="left"
                          >
                            <Grid item>
                              <Typography variant="h5" color="textPrimary">
                                <b>{getWeekdayFromUnix(i)}</b>
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography
                                variant="h6"
                                color="textSecondary"
                                sx={{ fontWeight: 'light' }}
                              >
                                <>{getDateFromUnix(i)}</>
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          direction="row"
                          spacing={2}
                        >
                          <img
                            src={`${weatherIconsUrl}${getIconUrl(
                              forecast?.daily[i]?.weather[0]?.id
                            )}`}
                            alt="weather"
                            height="60px"
                            width="60px"
                            draggable={false}
                            class="shadow"
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          direction="row"
                          spacing={2}
                        >
                          <Typography variant="h5">
                            {celsius ? (
                              <b>
                                {forecast.daily[i].temp.day.toFixed() - 273}°
                              </b>
                            ) : (
                              <b>
                                {(
                                  ((forecast.daily[i].temp.day.toFixed() -
                                    273) *
                                    9) /
                                    5 +
                                  32
                                ).toFixed()}
                                °
                              </b>
                            )}
                          </Typography>
                          <Typography variant="h5" color="textSecondary">
                            {celsius ? (
                              <b>
                                {forecast.daily[i].temp.night.toFixed() - 273}°
                              </b>
                            ) : (
                              <b>
                                {(
                                  ((forecast.daily[i].temp.night.toFixed() -
                                    273) *
                                    9) /
                                    5 +
                                  32
                                ).toFixed()}
                                °
                              </b>
                            )}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      columns={9}
                      sx={{ pl: 4, height: '65px' }}
                    >
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          direction="row"
                          spacing={2}
                        >
                          <Typography
                            variant="h6"
                            color="textSecondary"
                            sx={{ fontWeight: 'light' }}
                          >
                            Wind speed
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          direction="column"
                          spacing={0}
                        >
                          <img
                            src={`${weatherFillIconsUrl}/${getWindSpeedSvg(
                              +forecast.daily[i].wind_speed.toFixed()
                            )}`}
                            alt="weather"
                            height="50px"
                            width="50px"
                            draggable={false}
                            class="shadow"
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={2}>
                        <Stack
                          alignItems="center"
                          justifyContent="left"
                          direction="row"
                          spacing={1}
                        >
                          <Typography
                            variant="h6"
                            color="textSecondary"
                            sx={{ fontWeight: 'light' }}
                          >
                            {/* {forecast.daily[i].wind_speed.toFixed(1)} m/s
                             */}
                            {forecast.daily[i].wind_speed.toFixed()} m/s,{' '}
                            {getDirection(forecast.daily[i].wind_deg)}
                          </Typography>
                          <img
                            src={`${weatherIconsUrl}/compass.svg`}
                            alt="weather"
                            height="40px"
                            width="40px"
                            draggable={false}
                            class="shadow"
                            style={{
                              transform: `rotate(${
                                forecast.daily[i].wind_deg + 180
                              }deg`,
                            }}
                          />
                        </Stack>
                      </Grid>

                      <Grid item xs={1}></Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          direction="row"
                          spacing={2}
                        >
                          <Typography
                            variant="h6"
                            color="textSecondary"
                            sx={{ fontWeight: 'light' }}
                          >
                            Morning
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          direction="row"
                          spacing={2}
                        >
                          <Typography variant="h5">
                            {celsius ? (
                              <b>
                                {forecast.daily[i].temp.morn.toFixed() - 273}°
                              </b>
                            ) : (
                              <b>
                                {(
                                  ((forecast.daily[i].temp.morn.toFixed() -
                                    273) *
                                    9) /
                                    5 +
                                  32
                                ).toFixed()}
                                °
                              </b>
                            )}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      columns={9}
                      sx={{ pl: 4, height: '65px' }}
                    >
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          direction="row"
                          spacing={2}
                        >
                          <Typography
                            variant="h6"
                            color="textSecondary"
                            sx={{ fontWeight: 'light' }}
                          >
                            Pressure
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          direction="column"
                          spacing={0}
                        >
                          <img
                            src={`${weatherIconsUrl}/barometer.svg`}
                            alt="weather"
                            height="50px"
                            width="50px"
                            draggable={false}
                            class="shadow"
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={2}>
                        <Stack
                          alignItems="center"
                          justifyContent="left"
                          direction="row"
                          spacing={1}
                        >
                          <Typography
                            variant="h6"
                            color="textSecondary"
                            sx={{ fontWeight: 'light' }}
                          >
                            {forecast.daily[i].pressure} hPa
                          </Typography>
                        </Stack>
                      </Grid>

                      <Grid item xs={1}></Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          direction="row"
                          spacing={2}
                        >
                          <Typography
                            variant="h6"
                            color="textSecondary"
                            sx={{ fontWeight: 'light' }}
                          >
                            Day
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          direction="row"
                          spacing={2}
                        >
                          <Typography variant="h5">
                            {celsius ? (
                              <b>
                                {forecast.daily[i].temp.day.toFixed() - 273}°
                              </b>
                            ) : (
                              <b>
                                {(
                                  ((forecast.daily[i].temp.day.toFixed() -
                                    273) *
                                    9) /
                                    5 +
                                  32
                                ).toFixed()}
                                °
                              </b>
                            )}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      columns={9}
                      sx={{ pl: 4, height: '65px' }}
                    >
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          direction="row"
                          spacing={2}
                        >
                          <Typography
                            variant="h6"
                            color="textSecondary"
                            sx={{ fontWeight: 'light' }}
                          >
                            Humidity
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          direction="column"
                          spacing={0}
                        >
                          <img
                            src={`${weatherFillIconsUrl}/raindrops.svg`}
                            alt="weather"
                            height="50px"
                            width="50px"
                            draggable={false}
                            class="shadow"
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={2}>
                        <Stack
                          alignItems="center"
                          justifyContent="left"
                          direction="row"
                          spacing={1}
                        >
                          <Typography
                            variant="h6"
                            color="textSecondary"
                            sx={{ fontWeight: 'light' }}
                          >
                            {forecast.daily[i].humidity} %
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          direction="row"
                          spacing={2}
                        >
                          <Typography
                            variant="h6"
                            color="textSecondary"
                            sx={{ fontWeight: 'light' }}
                          >
                            Evening
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          direction="row"
                          spacing={2}
                        >
                          <Typography variant="h5">
                            {celsius ? (
                              <b>
                                {forecast.daily[i].temp.eve.toFixed() - 273}°
                              </b>
                            ) : (
                              <b>
                                {(
                                  ((forecast.daily[i].temp.eve.toFixed() -
                                    273) *
                                    9) /
                                    5 +
                                  32
                                ).toFixed()}
                                °
                              </b>
                            )}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      columns={9}
                      sx={{ pl: 4, height: '65px' }}
                    >
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          direction="row"
                          spacing={2}
                        >
                          <Typography
                            variant="h6"
                            color="textSecondary"
                            sx={{ fontWeight: 'light' }}
                          >
                            UV index
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          direction="column"
                          spacing={0}
                        >
                          <img
                            src={`${weatherIconsUrl}/${getUVindexSVG(
                              +forecast.daily[i].uvi.toFixed()
                            )}`}
                            alt="weather"
                            height="50px"
                            width="50px"
                            draggable={false}
                            class="shadow"
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={2}>
                        <Stack
                          alignItems="center"
                          justifyContent="left"
                          direction="row"
                          spacing={1}
                        >
                          <Typography
                            variant="h6"
                            color="textSecondary"
                            sx={{ fontWeight: 'light' }}
                          >
                            {getUVindex(+forecast.daily[i].uvi.toFixed())}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          direction="row"
                          spacing={2}
                        >
                          <Typography
                            variant="h6"
                            color="textSecondary"
                            sx={{ fontWeight: 'light' }}
                          >
                            Night
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          direction="row"
                          spacing={2}
                        >
                          <Typography variant="h5">
                            {celsius ? (
                              <b>
                                {forecast.daily[i].temp.night.toFixed() - 273}°
                              </b>
                            ) : (
                              <b>
                                {(
                                  ((forecast.daily[i].temp.night.toFixed() -
                                    273) *
                                    9) /
                                    5 +
                                  32
                                ).toFixed()}
                                °
                              </b>
                            )}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      columns={9}
                      sx={{ pl: 4, height: '65px' }}
                    >
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          direction="row"
                          spacing={2}
                        >
                          <Typography
                            variant="h6"
                            color="textSecondary"
                            sx={{ fontWeight: 'light' }}
                          >
                            Moon Phase
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          direction="column"
                          spacing={0}
                        >
                          <img
                            src={`${weatherFillIconsUrl}/${getMoonPhaseSvg(
                              forecast.daily[i].moon_phase
                            )}`}
                            alt="weather"
                            height="50px"
                            width="50px"
                            draggable={false}
                            class="shadow"
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={2}>
                        <Stack
                          alignItems="center"
                          justifyContent="left"
                          direction="row"
                          spacing={2}
                        >
                          <Typography
                            variant="h6"
                            color="textSecondary"
                            sx={{ fontWeight: 'light' }}
                          >
                            {getMoonPhase(forecast.daily[i].moon_phase)}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={1}></Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      columns={9}
                      sx={{ pl: 4 }}
                    >
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          // direction="row"
                          direction="column"
                          spacing={0}
                        >
                          <Typography
                            variant="h6"
                            color="textSecondary"
                            sx={{ fontWeight: 'light' }}
                          >
                            Sunrise
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          direction="column"
                          spacing={0}
                        >
                          <Box sx={{ mb: -2 }}>
                            <img
                              src={`${weatherIconsUrl}/sunrise.svg`}
                              alt="weather"
                              height="50px"
                              width="50px"
                              draggable={false}
                              class="shadow"
                            />
                          </Box>
                          <Typography
                            variant="p"
                            color="textSecondary"
                            sx={{ fontWeight: 'medium' }}
                          >
                            {getTimeFromDailyUnix(
                              forecast.daily[i].sunrise,
                              forecast.timezone
                            )}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          direction="column"
                          spacing={0}
                        >
                          <Box sx={{ mb: -2 }}>
                            <img
                              src={`${weatherIconsUrl}/sunset.svg`}
                              alt="weather"
                              height="50px"
                              width="50px"
                              draggable={false}
                              class="shadow"
                            />
                          </Box>
                          <Typography
                            variant="p"
                            color="textSecondary"
                            sx={{ fontWeight: 'medium' }}
                          >
                            {getTimeFromDailyUnix(
                              forecast.daily[i].sunset,
                              forecast.timezone
                            )}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          // direction="row"
                          direction="column"
                          spacing={0}
                        >
                          <Typography
                            variant="h6"
                            color="textSecondary"
                            sx={{ fontWeight: 'light' }}
                          >
                            Sunset
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={1}></Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      columns={9}
                      sx={{ pl: 4 }}
                    >
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          direction="row"
                          spacing={2}
                        >
                          <Typography
                            variant="h6"
                            color="textSecondary"
                            sx={{ fontWeight: 'light' }}
                          >
                            Moonrise
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          direction="column"
                          spacing={0}
                        >
                          <Box sx={{ mb: -2 }}>
                            <img
                              src={`${weatherIconsUrl}/moonrise.svg`}
                              alt="weather"
                              height="50px"
                              width="50px"
                              draggable={false}
                              class="shadow"
                            />
                          </Box>
                          <Typography
                            variant="p"
                            color="textSecondary"
                            sx={{ fontWeight: 'medium' }}
                          >
                            {getTimeFromDailyUnix(
                              forecast.daily[i].moonrise,
                              forecast.timezone
                            )}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          direction="column"
                          spacing={0}
                        >
                          <Box sx={{ mb: -2 }}>
                            <img
                              src={`${weatherIconsUrl}/moonset.svg`}
                              alt="weather"
                              height="50px"
                              width="50px"
                              draggable={false}
                              class="shadow"
                            />
                          </Box>
                          <Typography
                            variant="p"
                            color="textSecondary"
                            sx={{ fontWeight: 'medium' }}
                          >
                            {getTimeFromDailyUnix(
                              forecast.daily[i].moonset,
                              forecast.timezone
                            )}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={1}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          // direction="row"
                          direction="column"
                          spacing={0}
                        >
                          <Typography
                            variant="h6"
                            color="textSecondary"
                            sx={{ fontWeight: 'light' }}
                          >
                            Moonset
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={1}></Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>

            <Box sx={{ display: { xs: 'block', md: 'none' } }}></Box>

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
                  height="80%"
                  width="80%"
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
