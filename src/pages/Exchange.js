import React, { useState, useEffect } from 'react'
import {
  Typography,
  Container,
  Box,
  Grid,
  IconButton,
  Stack,
} from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import EuroIcon from '@mui/icons-material/Euro'
import CurrencyFrancIcon from '@mui/icons-material/CurrencyFranc'
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira'
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee'
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen'
import CurrencyYuanIcon from '@mui/icons-material/CurrencyYuan'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'

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
  padding: theme.spacing(0, 1.8),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const SearchIconWrapperEnd = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 45),
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
    padding: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
      width: '300px',
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
  }, [input, from, to])

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

  // Function to switch between two currency
  function flip() {
    let temp = from
    setFrom(to)
    setTo(temp)
    if (output === 0) {
      setInput('')
    } else setInput(output.toFixed(2))
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

  const clearInput = () => {
    setInput('')
  }

  ////////////////////////////////////// end //////////////////////////////////////

  const [error, setError] = useState(false) // catch errors
  const [open, setOpen] = useState(false) // no input notifications
  const [open2, setOpen2] = useState(false) // no audio notifications

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

  return (
    <Box sx={{ mt: 14 }}>
      <Container maxwidth="sm">
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
              <Typography variant="h4">
                <b>FROM</b>
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
                <SearchIconWrapperEnd>
                  {from === 'rub' ? (
                    <img
                      alt="flag"
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/RU.svg`}
                      width="20px"
                      height="20px"
                    />
                  ) : null}
                  {from === 'usd' ? (
                    <img
                      alt="flag"
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg`}
                      width="20px"
                      height="20px"
                    />
                  ) : null}
                  {from === 'eur' ? (
                    <img
                      alt="flag"
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/EU.svg`}
                      width="20px"
                      height="20px"
                    />
                  ) : null}
                  {from === 'chf' ? (
                    <img
                      alt="flag"
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/CH.svg`}
                      width="20px"
                      height="20px"
                    />
                  ) : null}
                  {from === 'try' ? (
                    <img
                      alt="flag"
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/TR.svg`}
                      width="20px"
                      height="20px"
                    />
                  ) : null}
                  {from === 'gbp' ? (
                    <img
                      alt="flag"
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg`}
                      width="20px"
                      height="20px"
                    />
                  ) : null}
                  {from === 'inr' ? (
                    <img
                      alt="flag"
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/IN.svg`}
                      width="20px"
                      height="20px"
                    />
                  ) : null}
                  {from === 'jpy' ? (
                    <img
                      alt="flag"
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/JP.svg`}
                      width="20px"
                      height="20px"
                    />
                  ) : null}
                  {from === 'cny' ? (
                    <img
                      alt="flag"
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/CN.svg`}
                      width="20px"
                      height="20px"
                    />
                  ) : null}
                </SearchIconWrapperEnd>
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
                <IconButton
                  onClick={() => {
                    setFrom('rub')
                  }}
                  color="inherit"
                  title="Russian Ruble"
                >
                  <CurrencyRubleIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setFrom('usd')
                  }}
                  color="inherit"
                  title="United States Dollar"
                >
                  <AttachMoneyIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setFrom('eur')
                  }}
                  color="inherit"
                  title="Euro"
                >
                  <EuroIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setFrom('gbp')
                  }}
                  color="inherit"
                  title="Pound Sterling"
                >
                  <CurrencyPoundIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setFrom('chf')
                  }}
                  color="inherit"
                  title="Swiss Franc"
                >
                  <CurrencyFrancIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setFrom('try')
                  }}
                  color="inherit"
                  title="Turkish Lira"
                >
                  <CurrencyLiraIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setFrom('inr')
                  }}
                  color="inherit"
                  title="Indian Rupee"
                >
                  <CurrencyRupeeIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setFrom('jpy')
                  }}
                  color="inherit"
                  title="Japanese Yen"
                >
                  <CurrencyYenIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setFrom('cny')
                  }}
                  color="inherit"
                  title="Chinese Yuan"
                >
                  <CurrencyYuanIcon />
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
              <br />
              <br />
              <IconButton
                onClick={flip}
                color="inherit"
                // size="large"
                title="Switch"
              >
                <SwapHorizIcon style={{ fontSize: 40 }} />
              </IconButton>
              <br />
              <IconButton onClick={clearInput} color="inherit" title="Clear">
                <CloseIcon style={{ fontSize: 40 }} />
              </IconButton>
            </Box>
          </Grid>
          <Grid
            item
            // xs={12}
            // md={6}
            sx={({ flexGrow: 1 }, { textAlign: 'center' })}
          >
            <Box>
              <Typography variant="h4">
                <b>TO</b>
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
                <SearchIconWrapperEnd>
                  {to === 'rub' ? (
                    <img
                      alt="flag"
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/RU.svg`}
                      width="20px"
                      height="20px"
                    />
                  ) : null}
                  {to === 'usd' ? (
                    <img
                      alt="flag"
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg`}
                      width="20px"
                      height="20px"
                    />
                  ) : null}
                  {to === 'eur' ? (
                    <img
                      alt="flag"
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/EU.svg`}
                      width="20px"
                      height="20px"
                    />
                  ) : null}
                  {to === 'chf' ? (
                    <img
                      alt="flag"
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/CH.svg`}
                      width="20px"
                      height="20px"
                    />
                  ) : null}
                  {to === 'try' ? (
                    <img
                      alt="flag"
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/TR.svg`}
                      width="20px"
                      height="20px"
                    />
                  ) : null}
                  {to === 'gbp' ? (
                    <img
                      alt="flag"
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg`}
                      width="20px"
                      height="20px"
                    />
                  ) : null}
                  {to === 'inr' ? (
                    <img
                      alt="flag"
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/IN.svg`}
                      width="20px"
                      height="20px"
                    />
                  ) : null}
                  {to === 'jpy' ? (
                    <img
                      alt="flag"
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/JP.svg`}
                      width="20px"
                      height="20px"
                    />
                  ) : null}
                  {to === 'cny' ? (
                    <img
                      alt="flag"
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/CN.svg`}
                      width="20px"
                      height="20px"
                    />
                  ) : null}
                </SearchIconWrapperEnd>
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
                <IconButton
                  onClick={() => {
                    setTo('rub')
                  }}
                  color="inherit"
                  title="Russian Ruble"
                >
                  <CurrencyRubleIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setTo('usd')
                  }}
                  color="inherit"
                  title="United States Dollar"
                >
                  <AttachMoneyIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setTo('eur')
                  }}
                  color="inherit"
                  title="Euro"
                >
                  <EuroIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setTo('gbp')
                  }}
                  color="inherit"
                  title="Pound Sterling"
                >
                  <CurrencyPoundIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setTo('chf')
                  }}
                  color="inherit"
                  title="Swiss Franc"
                >
                  <CurrencyFrancIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setTo('try')
                  }}
                  color="inherit"
                  title="Turkish Lira"
                >
                  <CurrencyLiraIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setTo('inr')
                  }}
                  color="inherit"
                  title="Indian Rupee"
                >
                  <CurrencyRupeeIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setTo('jpy')
                  }}
                  color="inherit"
                  title="Japanese Yen"
                >
                  <CurrencyYenIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setTo('cny')
                  }}
                  color="inherit"
                  title="Chinese Yuan"
                >
                  <CurrencyYuanIcon />
                </IconButton>
              </Stack>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box
            sx={{ mt: -1 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/exchange-bg.png`}
              alt="exchange"
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
            src={`${process.env.PUBLIC_URL}/assets/images/exchange-bg.png`}
            alt="exchange"
            height="100%"
            width="100%"
          />
        </Box>
      </Container>
    </Box>
  )
}
