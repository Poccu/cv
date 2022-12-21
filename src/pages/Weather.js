import React, { useState, useEffect } from 'react'
import {
  Typography,
  Container,
  Box,
  Grid,
  IconButton,
  Stack,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import GpsFixedIcon from '@mui/icons-material/GpsFixed'
import Carousel from 'react-elastic-carousel'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Skeleton from '@mui/material/Skeleton'

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

const breakPoints = [
  { width: 1, itemsToShow: 1, itemsToScroll: 1 },
  { width: 214, itemsToShow: 2, itemsToScroll: 1 },
  { width: 300, itemsToShow: 3, itemsToScroll: 1 },
  { width: 427, itemsToShow: 4 },
  { width: 590, itemsToShow: 5 },
  { width: 690, itemsToShow: 6 },
  { width: 810, itemsToShow: 7 },
  { width: 930, itemsToShow: 8 },
]

export default function Weather({ celsius }) {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [open, setOpen] = useState(false)

  const [lat, setLat] = useState(
    JSON.parse(window.localStorage.getItem('lat')) || 0
  )
  const [lon, setLon] = useState(
    JSON.parse(window.localStorage.getItem('lon')) || 0
  )

  const [forecast, setForecast] = useState({})

  const [hourlyForecast, setHourlyForecast] = useState([])

  // localStorage
  useEffect(() => {
    setData(JSON.parse(window.localStorage.getItem('dataWeather')))
    setLat(JSON.parse(window.localStorage.getItem('lat')))
    setLon(JSON.parse(window.localStorage.getItem('lon')))
    setForecast(JSON.parse(window.localStorage.getItem('forecast')))
    setHourlyForecast(JSON.parse(window.localStorage.getItem('hourlyForecast')))
  }, [])

  useEffect(() => {
    if (data !== null) {
      window.localStorage.setItem('dataWeather', JSON.stringify(data))
    }
  }, [data])

  useEffect(() => {
    if (lat !== null) {
      window.localStorage.setItem('lat', JSON.stringify(lat))
    }
  }, [lat])

  useEffect(() => {
    if (lon !== null) {
      window.localStorage.setItem('lon', JSON.stringify(lon))
    }
  }, [lon])

  useEffect(() => {
    window.localStorage.setItem('forecast', JSON.stringify(forecast))
  }, [forecast])

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
    setIsLoading(true)
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
            // setOpen(true)
            setIsLoading(false)
          })
          .catch((error) => {
            setError(true)
            setOpen(true)
            console.error('THIS IS ERROR --->', error)
            setIsLoading(false)
          })
        setError(false)
        setLocation('')
      })
    }
  }

  useEffect(() => {
    // setIsLoading(true)
    const urlForecast = `${apiUrl}/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apiKey}`
    if (lat !== null || lon !== null) {
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
          setIsLoading(false)
        })
        .catch((error) => {
          setError(true)
          setOpen(true)
          console.error('THIS IS ERROR --->', error)
          setIsLoading(false)
        })
    } else return
    setError(false)
    setLocation('')
  }, [data])

  const searchLocation = (event) => {
    const url = `${apiUrl}/weather?q=${location}&appid=${apiKey}`
    if (event.key === 'Enter') {
      setIsLoading(true)
      axios
        .get(url)
        .then((response) => {
          setLat(response.data.coord.lat)
          setLon(response.data.coord.lon)
          // console.log(response.data.coord.lat)
          // console.log(response.data.coord.lon)
          setData(response.data)
          // console.log('searchLocation:', response.data)
          // setOpen(true)
          // setIsLoading(false)
        })
        .catch((error) => {
          setError(true)
          setOpen(true)
          console.error('THIS IS ERROR --->', error)
          setIsLoading(false)
        })
      setError(false)
      setLocation('')
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
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
        case 201:
        case 202:
          return '/thunderstorms-rain.svg'
        case 210:
          return '/thunderstorms-day.svg'
        case 211:
        case 212:
        case 221:
        case 230:
        case 231:
        case 232:
          return '/thunderstorms.svg'
        case 300:
          return '/partly-cloudy-day-drizzle.svg'
        case 301:
        case 302:
          return '/drizzle.svg'
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
          return '/rain.svg'
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
          return '/partly-cloudy-day-rain.svg'
        case 511:
          return '/snow.svg'
        case 520:
        case 521:
        case 522:
        case 531:
          return '/rain.svg'
        case 600:
        case 601:
          return '/partly-cloudy-day-snow.svg'
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
        case 701:
          return '/mist.svg'
        case 711:
          return '/partly-cloudy-day-smoke.svg'
        case 721:
          return '/haze-day.svg'
        case 731:
          return '/dust-day.svg'
        case 741:
          return '/fog-day.svg'
        case 751:
        case 761:
        case 762:
          return '/dust-day.svg'
        case 771:
          return '/wind.svg'
        case 781:
          return '/tornado.svg'
        case 800:
          return '/clear-day.svg'
        case 801:
          return '/partly-cloudy-day.svg'
        case 802:
          // return '/cloudy.svg'
          return '/partly-cloudy-day.svg'
        case 803:
        case 804:
          return '/overcast-day.svg'
        default:
          return '/not-available.svg'
      }
    } else {
      switch (id) {
        case 200:
          return '/thunderstorms-night-rain.svg'
        case 201:
        case 202:
          return '/thunderstorms-rain.svg'
        case 210:
          return '/thunderstorms-night.svg'
        case 211:
        case 212:
        case 221:
        case 230:
        case 231:
        case 232:
          return '/thunderstorms.svg'
        case 300:
          return '/partly-cloudy-night-drizzle.svg'
        case 301:
        case 302:
          return '/drizzle.svg'
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
          return '/rain.svg'
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
          return '/partly-cloudy-night-rain.svg'
        case 511:
          return '/snow.svg'
        case 520:
        case 521:
        case 522:
        case 531:
          return '/rain.svg'
        case 600:
        case 601:
          return '/partly-cloudy-night-snow.svg'
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
        case 701:
          return '/mist.svg'
        case 711:
          return '/partly-cloudy-night-smoke.svg'
        case 721:
          return '/haze-night.svg'
        case 731:
          return '/dust-night.svg'
        case 741:
          return '/fog-night.svg'
        case 751:
        case 761:
        case 762:
          return '/dust-night.svg'
        case 771:
          return '/wind.svg'
        case 781:
          return '/tornado.svg'
        case 800:
          return '/clear-night.svg'
        // return '/starry-night.svg'
        case 801:
          return '/partly-cloudy-night.svg'
        case 802:
          // return '/cloudy.svg'
          return '/partly-cloudy-night.svg'
        case 803:
        case 804:
          return '/overcast-night.svg'
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
        case 201:
        case 202:
          return '/thunderstorms-rain.svg'
        case 210:
          return '/thunderstorms-day.svg'
        case 211:
        case 212:
        case 221:
        case 230:
        case 231:
        case 232:
          return '/thunderstorms.svg'
        case 300:
          return '/partly-cloudy-day-drizzle.svg'
        case 301:
        case 302:
          return '/drizzle.svg'
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
          return '/rain.svg'
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
          return '/partly-cloudy-day-rain.svg'
        case 511:
          return '/snow.svg'
        case 520:
        case 521:
        case 522:
        case 531:
          return '/rain.svg'
        case 600:
        case 601:
          return '/partly-cloudy-day-snow.svg'
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
        case 701:
          return '/mist.svg'
        case 711:
          return '/partly-cloudy-day-smoke.svg'
        case 721:
          return '/haze-day.svg'
        case 731:
          return '/dust-day.svg'
        case 741:
          return '/fog-day.svg'
        case 751:
        case 761:
        case 762:
          return '/dust-day.svg'
        case 771:
          return '/wind.svg'
        case 781:
          return '/tornado.svg'
        case 800:
          return '/clear-day.svg'
        case 801:
          return '/partly-cloudy-day.svg'
        case 802:
          // return '/cloudy.svg'
          return '/partly-cloudy-day.svg'
        case 803:
        case 804:
          return '/overcast-day.svg'
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
        case 201:
        case 202:
          return '/thunderstorms-rain.svg'
        case 210:
          return '/thunderstorms-day.svg'
        case 211:
        case 212:
        case 221:
        case 230:
        case 231:
        case 232:
          return '/thunderstorms.svg'
        case 300:
          return '/partly-cloudy-day-drizzle.svg'
        case 301:
        case 302:
          return '/drizzle.svg'
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
          return '/rain.svg'
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
          return '/partly-cloudy-day-rain.svg'
        case 511:
          return '/snow.svg'
        case 520:
        case 521:
        case 522:
        case 531:
          return '/rain.svg'
        case 600:
        case 601:
          return '/partly-cloudy-day-snow.svg'
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
        case 701:
          return '/mist.svg'
        case 711:
          return '/partly-cloudy-day-smoke.svg'
        case 721:
          return '/haze-day.svg'
        case 731:
          return '/dust-day.svg'
        case 741:
          return '/fog-day.svg'
        case 751:
        case 761:
        case 762:
          return '/dust-day.svg'
        case 771:
          return '/wind.svg'
        case 781:
          return '/tornado.svg'
        case 800:
          return '/clear-day.svg'
        case 801:
          return '/partly-cloudy-day.svg'
        case 802:
          // return '/cloudy.svg'
          return '/partly-cloudy-day.svg'
        case 803:
        case 804:
          return '/overcast-day.svg'
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
        case 201:
        case 202:
          return '/thunderstorms-rain.svg'
        case 210:
          return '/thunderstorms-night.svg'
        case 211:
        case 212:
        case 221:
        case 230:
        case 231:
        case 232:
          return '/thunderstorms.svg'
        case 300:
          return '/partly-cloudy-night-drizzle.svg'
        case 301:
        case 302:
          return '/drizzle.svg'
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
          return '/rain.svg'
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
          return '/partly-cloudy-night-rain.svg'
        case 511:
          return '/snow.svg'
        case 520:
        case 521:
        case 522:
        case 531:
          return '/rain.svg'
        case 600:
        case 601:
          return '/partly-cloudy-night-snow.svg'
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
        case 701:
          return '/mist.svg'
        case 711:
          return '/partly-cloudy-night-smoke.svg'
        case 721:
          return '/haze-night.svg'
        case 731:
          return '/dust-night.svg'
        case 741:
          return '/fog-night.svg'
        case 751:
        case 761:
        case 762:
          return '/dust-night.svg'
        case 771:
          return '/wind.svg'
        case 781:
          return '/tornado.svg'
        case 800:
          return '/clear-night.svg'
        // return '/starry-night.svg'
        case 801:
          return '/partly-cloudy-night.svg'
        case 802:
          // return '/cloudy.svg'
          return '/partly-cloudy-night.svg'
        case 803:
        case 804:
          return '/overcast-night.svg'
        default:
          return '/not-available.svg'
      }
    }
  }

  function getIconUrl(id) {
    switch (id) {
      case 200:
        return '/thunderstorms-day-rain.svg'
      case 201:
      case 202:
        return '/thunderstorms-rain.svg'
      case 210:
        return '/thunderstorms-day.svg'
      case 211:
      case 212:
      case 221:
      case 230:
      case 231:
      case 232:
        return '/thunderstorms.svg'
      case 300:
        return '/partly-cloudy-day-drizzle.svg'
      case 301:
      case 302:
        return '/drizzle.svg'
      case 310:
      case 311:
      case 312:
      case 313:
      case 314:
      case 321:
        return '/rain.svg'
      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
        return '/partly-cloudy-day-rain.svg'
      case 511:
        return '/snow.svg'
      case 520:
      case 521:
      case 522:
      case 531:
        return '/rain.svg'
      case 600:
      case 601:
        return '/partly-cloudy-day-snow.svg'
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
      case 701:
        return '/mist.svg'
      case 711:
        return '/partly-cloudy-day-smoke.svg'
      case 721:
        return '/haze-day.svg'
      case 731:
        return '/dust-day.svg'
      case 741:
        return '/fog-day.svg'
      case 751:
      case 761:
      case 762:
        return '/dust-day.svg'
      case 771:
        return '/wind.svg'
      case 781:
        return '/tornado.svg'
      case 800:
        return '/clear-day.svg'
      case 801:
        return '/partly-cloudy-day.svg'
      case 802:
        // return '/cloudy.svg'
        return '/partly-cloudy-day.svg'
      case 803:
      case 804:
        return '/overcast-day.svg'
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
      case 2:
        return 'uv-index-2.svg'
      case 3:
        return 'uv-index-3.svg'
      case 4:
        return 'uv-index-4.svg'
      case 5:
        return 'uv-index-5.svg'
      case 6:
        return 'uv-index-6.svg'
      case 7:
        return 'uv-index-7.svg'
      case 8:
        return 'uv-index-8.svg'
      case 9:
        return 'uv-index-9.svg'
      case 10:
        return 'uv-index-10.svg'
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
      default:
        return 'not-available.svg'
    }
  }

  function getUVindex(index) {
    switch (index) {
      case 0:
      case 1:
        return '1 (low)'
      case 2:
        return '2 (low)'
      case 3:
        return '3 (moderate)'
      case 4:
        return '4 (moderate)'
      case 5:
        return '5 (moderate)'
      case 6:
        return '6 (high)'
      case 7:
        return '7 (high)'
      case 8:
        return '8 (very high)'
      case 9:
        return '9 (very high)'
      case 10:
        return '10 (very high)'
      case 11:
        return '11 (extreme)'
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
      default:
        return 'not-available.svg'
    }
  }

  function getWindSpeedSvg(speed) {
    switch (speed) {
      case 0:
      case 1:
        return 'wind-beaufort-1.svg'
      case 2:
        return 'wind-beaufort-2.svg'
      case 3:
        return 'wind-beaufort-3.svg'
      case 4:
        return 'wind-beaufort-4.svg'
      case 5:
        return 'wind-beaufort-5.svg'
      case 6:
        return 'wind-beaufort-6.svg'
      case 7:
        return 'wind-beaufort-7.svg'
      case 8:
        return 'wind-beaufort-8.svg'
      case 9:
        return 'wind-beaufort-9.svg'
      case 10:
        return 'wind-beaufort-10.svg'
      case 11:
        return 'wind-beaufort-11.svg'
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
      default:
        return 'not-available.svg'
    }
  }

  useEffect(() => {
    data?.name
      ? (document.title = `Weather - ${data?.name}`)
      : (document.title = 'Weather')
  }, [data?.name])

  return (
    <Box sx={{ mt: 14 }}>
      <Container maxwidth="sm">
        {!data?.main ? (
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

        {data?.main ? (
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
                <Box sx={{ display: { xs: 'none', md: 'block' } }}></Box>
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
                      {data?.main ? (
                        <Grid
                          container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                        >
                          {!isLoading ? (
                            <Box sx={{ width: '30px', height: '20px' }}>
                              <img
                                alt="flag"
                                src={`${flagsUrl}/${data.sys?.country}.svg`}
                                width="30px"
                                height="20px"
                                title={data.sys?.country}
                                draggable={false}
                                className="shadow"
                              />
                            </Box>
                          ) : (
                            <Skeleton
                              variant="rectangular"
                              width={30}
                              height={20}
                            />
                          )}
                        </Grid>
                      ) : null}
                    </Box>
                    <Typography
                      variant="h2"
                      component="div"
                      sx={{ flexGrow: 1, textAlign: 'center' }}
                    >
                      <Box sx={{ letterSpacing: 5 }}>
                        {!isLoading ? (
                          <b>{data.name.toUpperCase()}</b>
                        ) : (
                          <Skeleton />
                        )}
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
                        {!isLoading ? (
                          forecast.current.weather[0].description.toUpperCase()
                        ) : (
                          <Skeleton />
                        )}
                      </Box>
                    </Typography>
                  </Box>
                  <br />
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {!isLoading ? (
                      <>
                        <Typography
                          variant="h1"
                          component="div"
                          sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                        >
                          {celsius === true || celsius === null ? (
                            <>{forecast.current.temp.toFixed() - 273}°</>
                          ) : (
                            <>
                              {(
                                ((forecast.current.temp.toFixed() - 273) * 9) /
                                  5 +
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
                            className="shadow"
                          />
                        </Box>
                      </>
                    ) : (
                      <Skeleton width={250} height={127} />
                    )}
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
                      {!isLoading ? (
                        <>
                          Feels like{' '}
                          {celsius === true || celsius === null ? (
                            <>{forecast.current.feels_like.toFixed() - 273}°</>
                          ) : (
                            <>
                              {(
                                ((forecast.current.feels_like.toFixed() - 273) *
                                  9) /
                                  5 +
                                32
                              ).toFixed()}
                              °
                            </>
                          )}
                        </>
                      ) : (
                        <Skeleton />
                      )}
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
                <Box sx={{ display: { xs: 'none', md: 'block' } }}></Box>
              </Grid>
            </Grid>
            <br />
            <Divider sx={{ borderBottomWidth: 2, width: '100%' }} />
            <br />
            <Box
              sx={{
                display: {
                  xs: 'none',
                  sm: 'none',
                  md: 'none',
                  lg: 'block',
                  xl: 'block',
                },
              }}
            >
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
                          +forecast.current.wind_speed.toFixed()
                        )}`}
                        alt="weather"
                        height="40px"
                        width="40px"
                        draggable={false}
                        className="shadow"
                      />
                      <Typography variant="p" color="textSecondary">
                        &nbsp;{forecast.current.wind_speed.toFixed()} m/s,{' '}
                        {getDirection(forecast.current.wind_deg)}
                      </Typography>{' '}
                      <img
                        src={`${weatherIconsUrl}/compass.svg`}
                        alt="weather"
                        height="35px"
                        width="35px"
                        draggable={false}
                        className="shadow"
                        style={{
                          transform: `rotate(${
                            forecast.current.wind_deg + 180
                          }deg`,
                        }}
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
                        className="shadow"
                      />

                      <Typography variant="p" color="textSecondary">
                        {data?.main ? (
                          <>&nbsp;{forecast.current.pressure} hPa</>
                        ) : null}
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
                        className="shadow"
                      />
                      <Typography variant="p" color="textSecondary">
                        {data?.main ? (
                          <>&nbsp;{forecast.current.humidity} %</>
                        ) : null}
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
                    // itemsToShow={8}
                    breakPoints={breakPoints}
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
                        className="shadow"
                      />
                      <Typography variant="h5">
                        {celsius === true || celsius === null ? (
                          <b>{forecast.current.temp.toFixed() - 273}°</b>
                        ) : (
                          <b>
                            {(
                              ((forecast.current.temp.toFixed() - 273) * 9) /
                                5 +
                              32
                            ).toFixed()}
                            °
                          </b>
                        )}
                      </Typography>
                    </Grid>
                    {[...Array(28).keys()].map((i) => (
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
                          className="shadow"
                        />
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
                        <Typography variant="h5">
                          {hourlyForecast[i]?.temp < 990 ? (
                            <>
                              {celsius === true || celsius === null ? (
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
                      </Grid>
                    ))}
                  </Carousel>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                display: {
                  xs: 'block',
                  sm: 'block',
                  md: 'block',
                  lg: 'none',
                  xl: 'none',
                },
              }}
            >
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                columns={14}
              >
                <Grid item xs={14}>
                  <Carousel
                    // easing="cubic-bezier(1,.15,.55,1.54)"
                    // tiltEasing="cubic-bezier(0.110, 1, 1.000, 0.210)"
                    // transitionMs={700}
                    initialActiveIndex={0}
                    itemsToScroll={2}
                    // itemsToShow={8}
                    breakPoints={breakPoints}
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
                        className="shadow"
                      />
                      <Typography variant="h5">
                        {celsius === true || celsius === null ? (
                          <b>{forecast.current.temp.toFixed() - 273}°</b>
                        ) : (
                          <b>
                            {(
                              ((forecast.current.temp.toFixed() - 273) * 9) /
                                5 +
                              32
                            ).toFixed()}
                            °
                          </b>
                        )}
                      </Typography>
                    </Grid>
                    {[...Array(28).keys()].map((i) => (
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
                          className="shadow"
                        />
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
                        <Typography variant="h5">
                          {hourlyForecast[i]?.temp < 990 ? (
                            <>
                              {celsius === true || celsius === null ? (
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
                      </Grid>
                    ))}
                  </Carousel>
                </Grid>
              </Grid>
            </Box>
            <br />
            <Divider sx={{ borderBottomWidth: 2, width: '100%' }} />
            <Box>
              {[...Array(8).keys()].map((i) => (
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
                                {i === 0 ? <b>Today</b> : null}
                                {i === 1 ? <b>Tomorrow</b> : null}
                                {i !== 0 && i !== 1 ? (
                                  <b>{getWeekdayFromUnix(i)}</b>
                                ) : null}
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
                            className="shadow"
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
                            {celsius === true || celsius === null ? (
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
                            {celsius === true || celsius === null ? (
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
                            className="shadow"
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
                            {forecast.daily[i].wind_speed.toFixed()} m/s,{' '}
                            {getDirection(forecast.daily[i].wind_deg)}
                          </Typography>
                          <img
                            src={`${weatherIconsUrl}/compass.svg`}
                            alt="weather"
                            height="40px"
                            width="40px"
                            draggable={false}
                            className="shadow"
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
                            {celsius === true || celsius === null ? (
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
                            className="shadow"
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
                            {celsius === true || celsius === null ? (
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
                            className="shadow"
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
                            {celsius === true || celsius === null ? (
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
                            className="shadow"
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
                            {celsius === true || celsius === null ? (
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
                            className="shadow"
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
                              className="shadow"
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
                              className="shadow"
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
                              className="shadow"
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
                              className="shadow"
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
