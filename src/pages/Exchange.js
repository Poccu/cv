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
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import HearingIcon from '@mui/icons-material/Hearing'
import HearingDisabledIcon from '@mui/icons-material/HearingDisabled'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import Divider from '@mui/material/Divider'
import Badge from '@mui/material/Badge'
import ClearAllIcon from '@mui/icons-material/ClearAll'
///
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import EuroIcon from '@mui/icons-material/Euro'
import CurrencyFrancIcon from '@mui/icons-material/CurrencyFranc'
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira'
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee'
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen'
import CurrencyYuanIcon from '@mui/icons-material/CurrencyYuan'
import CachedIcon from '@mui/icons-material/Cached'

// import Dropdown from 'react-dropdown'
import { HiSwitchHorizontal } from 'react-icons/hi'
// import 'react-dropdown/style.css'
// import './App.css'

let randomWords = require('random-words')

const ThemeButton = styled(Button)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.button.primary,
  borderRadius: 25,
  height: 44,
  padding: '0 16px',
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

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

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

export default function Exchange() {
  ////////////////////////////////////// start //////////////////////////////////////

  // Initializing all the state variables
  const [info, setInfo] = useState([])
  const [input, setInput] = useState('')
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('rub')
  const [options, setOptions] = useState([])
  const [output, setOutput] = useState(0)
  const [searchCurrency, setSearchCurrency] = useState('')

  // Calling the api whenever the dependency changes
  useEffect(() => {
    axios
      .get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
      )
      .then((response) => {
        setInfo(response.data[from])
        // console.log(response.data[from])
      })
  }, [input, from])

  // Calling the convert function whenever
  // a user switches the currency
  useEffect(() => {
    setOptions(Object.keys(info))
    convert()
  }, [info])

  // Function to convert the currency
  function convert() {
    let rate = info[to]
    setOutput(input * rate)
  }

  // function convert2() {
  //   // setFrom(to)
  //   let rate = info[to]
  //   setOutput(output * rate)
  // }

  // const convert = (event) => {
  //   // if (event.key === 'Enter') {
  //   //   axios
  //   //     .get(url)
  //   //     .then((response) => {
  //   //       setValue(0)
  //   //       setData(response.data[0])
  //   //       // console.log(response.data[0])
  //   //       // setOpen(true)
  //   //       let audio = new Audio(response.data[0].phonetics[0].audio)
  //   //       audio.play()
  //   //     })
  //   //     .catch((error) => {
  //   //       setError(true)
  //   //       setOpen(true)
  //   //       console.error('THIS IS ERROR --->', error)
  //   //     })
  //   //   setError(false)
  //   //   setSearchWord('test')
  //   // }
  //   var rate = info[to]
  //   setOutput(input * rate)
  //   // setInput('')
  // }

  // Function to switch between two currency
  function flip() {
    let temp = from
    setFrom(to)
    setTo(temp)
    setInput(output.toFixed(2))
  }

  function country(from) {
    switch (from) {
      case 'rub':
        return 'Russian Ruble'
        break
      case 'usd':
        return 'United States Dollar'
        break
      case 'cny':
        return 'Chinese Yuan'
        break
      case 'eur':
        return 'Euro'
        break
      case 'chf':
        return 'Swiss Franc'
        break
      case 'try':
        return 'Turkish Lira'
        break
      case 'gbp':
        return 'Pound Sterling'
        break
      case 'inr':
        return 'Indian Rupee'
        break
      case 'jpy':
        return 'Japanese Yen'
        break
      default:
        return ''
    }
  }

  function country(to) {
    switch (to) {
      case 'rub':
        return 'Russian Ruble'
        break
      case 'usd':
        return 'United States Dollar'
        break
      case 'cny':
        return 'Chinese Yuan'
        break
      case 'eur':
        return 'Euro'
        break
      case 'chf':
        return 'Swiss Franc'
        break
      case 'try':
        return 'Turkish Lira'
        break
      case 'gbp':
        return 'Pound Sterling'
        break
      case 'inr':
        return 'Indian Rupee'
        break
      case 'jpy':
        return 'Japanese Yen'
        break
      default:
        return ''
    }
  }

  ////////////////////////////////////// end //////////////////////////////////////

  const [error, setError] = useState(false) // catch errors
  const [open, setOpen] = useState(false) // no input notifications
  const [open2, setOpen2] = useState(false) // no audio notifications

  const [favs, setFavs] = useState([]) // array of favourite words
  const [phonetics, setPhonetics] = useState([]) // array of phonetics of favourite words
  const [audios, setAudios] = useState([]) // array of audio of favourite words

  const [value, setValue] = useState(0) // tabs state

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [data, setData] = useState({}) // response data object
  const [searchWord, setSearchWord] = useState('')

  const handleClick2 = () => {
    setOpen2(true)
  }

  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen2(false)
  }

  // const handleClick = () => {
  //   setOpen(true)
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

  return (
    <Box sx={{ mt: 14 }}>
      <Container maxwidth="sm">
        {/* {!data.word ? ( */}
        <Typography
          variant="h3"
          component="div"
          sx={({ flexGrow: 1 }, { textAlign: 'center' })}
        >
          {/* <b>Currency converter</b> */}
        </Typography>
        <Box
          sx={{ mt: 5 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
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
                  Enter the correct word!
                </Alert>
              </Snackbar>
            ) : null}
          </Box>
          {/* <br /> */}
        </Box>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            // xs={12}
            // md={6}
            sx={({ flexGrow: 1 }, { textAlign: 'center' })}
          >
            <Box>
              <Typography variant="h5">
                <b>{'From: '}</b>
              </Typography>
              <br />
              <Search>
                <SearchIconWrapper>
                  {from === 'rub' ? <CurrencyRubleIcon /> : null}
                  {from === 'usd' ? <AttachMoneyIcon /> : null}
                  {from === 'eur' ? <EuroIcon /> : null}
                  {from === 'chf' ? <CurrencyFrancIcon /> : null}
                  {from === 'try' ? <CurrencyLiraIcon /> : null}
                  {from === 'gbp' ? <CurrencyPoundIcon /> : null}
                  {from === 'inr' ? <CurrencyRupeeIcon /> : null}
                  {from === 'jpy' ? <CurrencyYenIcon /> : null}
                  {from === 'cny' ? <CurrencyYuanIcon /> : null}
                </SearchIconWrapper>
                <StyledInputBase
                  type="number"
                  placeholder={country(from)}
                  inputProps={{ 'aria-label': 'search' }}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  // onKeyPress={() => {
                  //   convert()
                  // }}
                />
              </Search>
              <br />
              <Stack justifyContent="center" direction="row" spacing={0}>
                <IconButton color="inherit" title="Russian Ruble">
                  <CurrencyRubleIcon style={{ fontSize: 30 }} />
                </IconButton>
                <IconButton color="inherit" title="Audio">
                  <AttachMoneyIcon style={{ fontSize: 30 }} />
                </IconButton>
                <IconButton color="inherit" title="Audio">
                  <EuroIcon style={{ fontSize: 30 }} />
                </IconButton>
                <IconButton color="inherit" title="Audio">
                  <CurrencyFrancIcon style={{ fontSize: 30 }} />
                </IconButton>
                <IconButton color="inherit" title="Audio">
                  <CurrencyLiraIcon style={{ fontSize: 30 }} />
                </IconButton>
                <IconButton color="inherit" title="Audio">
                  <CurrencyPoundIcon style={{ fontSize: 30 }} />
                </IconButton>
                <IconButton color="inherit" title="Audio">
                  <CurrencyRupeeIcon style={{ fontSize: 30 }} />
                </IconButton>
                <IconButton color="inherit" title="Audio">
                  <CurrencyYenIcon style={{ fontSize: 30 }} />
                </IconButton>
                <IconButton color="inherit" title="Audio">
                  <CurrencyYuanIcon style={{ fontSize: 30 }} />
                </IconButton>
              </Stack>
            </Box>
          </Grid>
          <Grid
            item
            // xs={12}
            // md={6}
            sx={({ flexGrow: 1 }, { textAlign: 'center' })}
          >
            <Box>
              <IconButton
                onClick={flip}
                color="inherit"
                // size="large"
                title="Switch"
              >
                <CachedIcon style={{ fontSize: 60 }} />
              </IconButton>
              {/* <br /> */}
            </Box>
          </Grid>
          <Grid
            item
            // xs={12}
            // md={6}
            sx={({ flexGrow: 1 }, { textAlign: 'center' })}
          >
            <Box>
              <Typography variant="h5">
                <b>{'To: '}</b>
              </Typography>
              <br />
              <Search>
                {/* {to} */}
                <SearchIconWrapper>
                  {/* <SearchIcon /> */}
                  {to === 'rub' ? <CurrencyRubleIcon /> : null}
                  {to === 'usd' ? <AttachMoneyIcon /> : null}
                  {to === 'eur' ? <EuroIcon /> : null}
                  {to === 'chf' ? <CurrencyFrancIcon /> : null}
                  {to === 'try' ? <CurrencyLiraIcon /> : null}
                  {to === 'gbp' ? <CurrencyPoundIcon /> : null}
                  {to === 'inr' ? <CurrencyRupeeIcon /> : null}
                  {to === 'jpy' ? <CurrencyYenIcon /> : null}
                  {to === 'cny' ? <CurrencyYuanIcon /> : null}
                </SearchIconWrapper>
                <StyledInputBase
                  // color="secondary"
                  // disabled
                  type="number"
                  placeholder={country(to)}
                  inputProps={{ 'aria-label': 'search' }}
                  value={input > 0 ? output.toFixed(2) : ''}
                  // onChange={(event) => setInput(event.target.value)}
                  // onChange={() => {
                  //   convert2()
                  // }}
                  // onKeyPress={() => {
                  //   convert()
                  // }}
                />
              </Search>
              <br />
              <Stack justifyContent="center" direction="row" spacing={0}>
                <IconButton color="inherit" title="Russian Ruble">
                  <CurrencyRubleIcon style={{ fontSize: 30 }} />
                </IconButton>
                <IconButton color="inherit" title="Audio">
                  <AttachMoneyIcon style={{ fontSize: 30 }} />
                </IconButton>
                <IconButton color="inherit" title="Audio">
                  <EuroIcon style={{ fontSize: 30 }} />
                </IconButton>
                <IconButton color="inherit" title="Audio">
                  <CurrencyFrancIcon style={{ fontSize: 30 }} />
                </IconButton>
                <IconButton color="inherit" title="Audio">
                  <CurrencyLiraIcon style={{ fontSize: 30 }} />
                </IconButton>
                <IconButton color="inherit" title="Audio">
                  <CurrencyPoundIcon style={{ fontSize: 30 }} />
                </IconButton>
                <IconButton color="inherit" title="Audio">
                  <CurrencyRupeeIcon style={{ fontSize: 30 }} />
                </IconButton>
                <IconButton color="inherit" title="Audio">
                  <CurrencyYenIcon style={{ fontSize: 30 }} />
                </IconButton>
                <IconButton color="inherit" title="Audio">
                  <CurrencyYuanIcon style={{ fontSize: 30 }} />
                </IconButton>
              </Stack>
            </Box>
          </Grid>
        </Grid>

        {/* ///////////////////////////////////////// */}

        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box
            sx={{ mt: -1 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/dictionary-bg.png`}
              alt="dictionary"
            />
          </Box>
        </Box>

        <Box
          sx={{ mt: -1, display: { md: 'none' } }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/dictionary-bg.png`}
            alt="dictionary"
            height="100%"
            width="100%"
          />
        </Box>
      </Container>
    </Box>
  )
}
