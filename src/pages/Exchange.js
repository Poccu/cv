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
import NumberFormat from 'react-number-format'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import Divider from '@mui/material/Divider'

const apiUrl = process.env.REACT_APP_EXCHANGE_URL
const flagsUrl = process.env.REACT_APP_COUNTRY_FLAG_ICONS_URL

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        })
      }}
      thousandSeparator=" "
      isNumericString
      // prefix="$"
    />
  )
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const Search = styled('div')(({ theme }) => ({
  margin: 'auto',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.search.primary, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.search.primary, 0.14),
  },
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
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

const SearchIconWrapperEnd = styled('div')(({ theme }) => ({
  paddingLeft: `calc(100% - ${theme.spacing(8)})`,
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  fontSize: '36px',
  fontWeight: 'bold',
  // color: theme.palette.text.secondary,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 3, 1, 1),
    transition: theme.transitions.create('width'),
    marginLeft: theme.spacing(7),
    marginRight: theme.spacing(7),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '295px',
    },
  },
}))

export default function Exchange() {
  // Initializing all the state variables
  const [info, setInfo] = useState([])
  const [yesterday, setYesterday] = useState([])
  const [input, setInput] = useState('')
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('rub')
  const [options, setOptions] = useState([])
  const [output, setOutput] = useState(0)

  const getYesterdayDate = () => {
    let date = new Date()
    date.setDate(date.getDate() - 3)
    return date.toISOString().split('T')[0]
  }

  // const todayDate = new Date().toISOString().split('T')[0] // 2022-mm-dd today date

  const rndInt = Math.floor(Math.random() * 9999) + 1000 // random number from 1000 to 9999

  // Calling the api whenever the dependency changes
  useEffect(() => {
    axios
      .get(`${apiUrl}/latest/currencies/${from}.json?rand=${rndInt}`)
      .then((response) => {
        setInfo(response.data[from])
        // console.log('today :', response.data)
      })
  }, [input, from, to])

  useEffect(() => {
    axios
      .get(
        `${apiUrl}/${getYesterdayDate()}/currencies/${from}.json?rand=${rndInt}`
      )
      .then((response) => {
        setYesterday(response.data[from])
        // console.log('yesterday :', response.data)
      })
  }, [input, from, to])

  // Calling the convert function whenever a user switches the currency
  useEffect(() => {
    setOptions(Object.keys(info))
    convert()
  }, [info])

  // Function to convert the currency
  let exchangeRate = info[to]
  let yesterdayRate = yesterday[to]

  function convert() {
    setOutput(input * exchangeRate)
  }

  // Function to switch between two currency
  function flip() {
    let temp = from
    setFrom(to)
    setTo(temp)
    if (output === 0) {
      setInput('')
    } else setInput(output.toFixed(2))
  }

  function countryFrom(from) {
    switch (from) {
      case 'rub':
        return 'Russian Ruble'
      case 'usd':
        return 'US Dollar'
      case 'cny':
        return 'Chinese Yuan'
      case 'eur':
        return 'Euro'
      case 'chf':
        return 'Swiss Franc'
      case 'try':
        return 'Turkish Lira'
      case 'gbp':
        return 'Pound Sterling'
      case 'inr':
        return 'Indian Rupee'
      case 'jpy':
        return 'Japanese Yen'
      default:
        return ''
    }
  }

  function countryTo(to) {
    switch (to) {
      case 'rub':
        return 'Russian Ruble'
      case 'usd':
        return 'US Dollar'
      case 'cny':
        return 'Chinese Yuan'
      case 'eur':
        return 'Euro'
      case 'chf':
        return 'Swiss Franc'
      case 'try':
        return 'Turkish Lira'
      case 'gbp':
        return 'Pound Sterling'
      case 'inr':
        return 'Indian Rupee'
      case 'jpy':
        return 'Japanese Yen'
      default:
        return ''
    }
  }

  const clearInput = () => {
    setInput('')
  }

  useEffect(() => {
    document.title = 'Exchange'
  }, [])

  return (
    <Box sx={{ mt: 12 }}>
      <Container maxwidth="sm">
        <Grid
          container
          direction="row"
          justifyContent="center"
          // alignItems="center"
        >
          <Grid
            item
            xs={12}
            md={12}
            lg={5}
            sx={({ flexGrow: 1 }, { textAlign: 'center' })}
          >
            <Box>
              <Typography variant="h4" color="textSecondary">
                <b>FROM</b>
              </Typography>
              <br />
              <Search>
                <SearchIconWrapper>
                  {from === 'rub' ? (
                    <CurrencyRubleIcon style={{ fontSize: 40 }} />
                  ) : null}
                  {from === 'usd' ? (
                    <AttachMoneyIcon style={{ fontSize: 40 }} />
                  ) : null}
                  {from === 'eur' ? (
                    <EuroIcon style={{ fontSize: 40 }} />
                  ) : null}
                  {from === 'chf' ? (
                    <CurrencyFrancIcon style={{ fontSize: 40 }} />
                  ) : null}
                  {from === 'try' ? (
                    <CurrencyLiraIcon style={{ fontSize: 40 }} />
                  ) : null}
                  {from === 'gbp' ? (
                    <CurrencyPoundIcon style={{ fontSize: 40 }} />
                  ) : null}
                  {from === 'inr' ? (
                    <CurrencyRupeeIcon style={{ fontSize: 40 }} />
                  ) : null}
                  {from === 'jpy' ? (
                    <CurrencyYenIcon style={{ fontSize: 40 }} />
                  ) : null}
                  {from === 'cny' ? (
                    <CurrencyYuanIcon style={{ fontSize: 40 }} />
                  ) : null}
                </SearchIconWrapper>
                <SearchIconWrapperEnd>
                  {from === 'rub' ? (
                    <img
                      alt="flag"
                      src={`${flagsUrl}/RU.svg`}
                      width="40px"
                      height="40px"
                    />
                  ) : null}
                  {from === 'usd' ? (
                    <img
                      alt="flag"
                      src={`${flagsUrl}/US.svg`}
                      width="40px"
                      height="40px"
                    />
                  ) : null}
                  {from === 'eur' ? (
                    <img
                      alt="flag"
                      src={`${flagsUrl}/EU.svg`}
                      width="40px"
                      height="40px"
                    />
                  ) : null}
                  {from === 'chf' ? (
                    <img
                      alt="flag"
                      src={`${flagsUrl}/CH.svg`}
                      width="40px"
                      height="40px"
                    />
                  ) : null}
                  {from === 'try' ? (
                    <img
                      alt="flag"
                      src={`${flagsUrl}/TR.svg`}
                      width="40px"
                      height="40px"
                    />
                  ) : null}
                  {from === 'gbp' ? (
                    <img
                      alt="flag"
                      src={`${flagsUrl}/GB.svg`}
                      width="40px"
                      height="40px"
                    />
                  ) : null}
                  {from === 'inr' ? (
                    <img
                      alt="flag"
                      src={`${flagsUrl}/IN.svg`}
                      width="40px"
                      height="40px"
                    />
                  ) : null}
                  {from === 'jpy' ? (
                    <img
                      alt="flag"
                      src={`${flagsUrl}/JP.svg`}
                      width="40px"
                      height="40px"
                    />
                  ) : null}
                  {from === 'cny' ? (
                    <img
                      alt="flag"
                      src={`${flagsUrl}/CN.svg`}
                      width="40px"
                      height="40px"
                    />
                  ) : null}
                </SearchIconWrapperEnd>
                <StyledInputBase
                  // type="number"
                  placeholder={countryFrom(from)}
                  inputProps={{ 'aria-label': 'search' }}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  // onKeyPress={() => {
                  //   convert()
                  // }}
                  inputComponent={NumberFormatCustom} // todo error
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
                  title="US Dollar"
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
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <br />
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Divider sx={{ borderBottomWidth: 2, width: '450px' }} />
                </Grid>
              </Box>
              <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <br />
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Divider sx={{ borderBottomWidth: 2, width: '100%' }} />
                </Grid>
              </Box>
              <Box
                sx={{
                  display: { xs: 'none', sm: 'none', nd: 'none', lg: 'block' },
                }}
              >
                <br />
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography variant="h4">
                    <b>
                      {from === 'rub' ? (
                        <img
                          alt="flag"
                          src={`${flagsUrl}/RU.svg`}
                          width="20px"
                          height="20px"
                        />
                      ) : null}
                      {from === 'usd' ? (
                        <img
                          alt="flag"
                          src={`${flagsUrl}/US.svg`}
                          width="20px"
                          height="20px"
                        />
                      ) : null}
                      {from === 'eur' ? (
                        <img
                          alt="flag"
                          src={`${flagsUrl}/EU.svg`}
                          width="20px"
                          height="20px"
                        />
                      ) : null}
                      {from === 'chf' ? (
                        <img
                          alt="flag"
                          src={`${flagsUrl}/CH.svg`}
                          width="20px"
                          height="20px"
                        />
                      ) : null}
                      {from === 'try' ? (
                        <img
                          alt="flag"
                          src={`${flagsUrl}/TR.svg`}
                          width="20px"
                          height="20px"
                        />
                      ) : null}
                      {from === 'gbp' ? (
                        <img
                          alt="flag"
                          src={`${flagsUrl}/GB.svg`}
                          width="20px"
                          height="20px"
                        />
                      ) : null}
                      {from === 'inr' ? (
                        <img
                          alt="flag"
                          src={`${flagsUrl}/IN.svg`}
                          width="20px"
                          height="20px"
                        />
                      ) : null}
                      {from === 'jpy' ? (
                        <img
                          alt="flag"
                          src={`${flagsUrl}/JP.svg`}
                          width="20px"
                          height="20px"
                        />
                      ) : null}
                      {from === 'cny' ? (
                        <img
                          alt="flag"
                          src={`${flagsUrl}/CN.svg`}
                          width="20px"
                          height="20px"
                        />
                      ) : null}{' '}
                      1 {from.toUpperCase()}
                    </b>
                  </Typography>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={2}
            sx={({ flexGrow: 1 }, { textAlign: 'center' })}
          >
            <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
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

            <Box sx={{ display: { md: 'block', lg: 'none' } }}>
              <br />
              <Grid
                container
                direction="row"
                justifyContent="center"
                // alignItems="center"
              >
                <IconButton
                  onClick={flip}
                  color="inherit"
                  // size="large"
                  title="Switch"
                >
                  <SwapHorizIcon style={{ fontSize: 70 }} />
                </IconButton>
                <br />
                <IconButton onClick={clearInput} color="inherit" title="Clear">
                  <CloseIcon style={{ fontSize: 70 }} />
                </IconButton>
              </Grid>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <br />
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Divider sx={{ borderBottomWidth: 2, width: '450px' }} />
                </Grid>
              </Box>
              <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <br />
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Divider sx={{ borderBottomWidth: 2, width: '100%' }} />
                </Grid>
              </Box>
              <br />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={5}
            sx={({ flexGrow: 1 }, { textAlign: 'center' })}
          >
            <Box>
              <Typography variant="h4" color="textSecondary">
                <b>TO</b>
              </Typography>
              <br />
              <Search>
                {/* {to} */}
                <SearchIconWrapper>
                  {/* <SearchIcon /> */}
                  {to === 'rub' ? (
                    <CurrencyRubleIcon style={{ fontSize: 40 }} />
                  ) : null}
                  {to === 'usd' ? (
                    <AttachMoneyIcon style={{ fontSize: 40 }} />
                  ) : null}
                  {to === 'eur' ? <EuroIcon style={{ fontSize: 40 }} /> : null}
                  {to === 'chf' ? (
                    <CurrencyFrancIcon style={{ fontSize: 40 }} />
                  ) : null}
                  {to === 'try' ? (
                    <CurrencyLiraIcon style={{ fontSize: 40 }} />
                  ) : null}
                  {to === 'gbp' ? (
                    <CurrencyPoundIcon style={{ fontSize: 40 }} />
                  ) : null}
                  {to === 'inr' ? (
                    <CurrencyRupeeIcon style={{ fontSize: 40 }} />
                  ) : null}
                  {to === 'jpy' ? (
                    <CurrencyYenIcon style={{ fontSize: 40 }} />
                  ) : null}
                  {to === 'cny' ? (
                    <CurrencyYuanIcon style={{ fontSize: 40 }} />
                  ) : null}
                </SearchIconWrapper>
                <SearchIconWrapperEnd>
                  {to === 'rub' ? (
                    <img
                      alt="flag"
                      src={`${flagsUrl}/RU.svg`}
                      width="40px"
                      height="40px"
                    />
                  ) : null}
                  {to === 'usd' ? (
                    <img
                      alt="flag"
                      src={`${flagsUrl}/US.svg`}
                      width="40px"
                      height="40px"
                    />
                  ) : null}
                  {to === 'eur' ? (
                    <img
                      alt="flag"
                      src={`${flagsUrl}/EU.svg`}
                      width="40px"
                      height="40px"
                    />
                  ) : null}
                  {to === 'chf' ? (
                    <img
                      alt="flag"
                      src={`${flagsUrl}/CH.svg`}
                      width="40px"
                      height="40px"
                    />
                  ) : null}
                  {to === 'try' ? (
                    <img
                      alt="flag"
                      src={`${flagsUrl}/TR.svg`}
                      width="40px"
                      height="40px"
                    />
                  ) : null}
                  {to === 'gbp' ? (
                    <img
                      alt="flag"
                      src={`${flagsUrl}/GB.svg`}
                      width="40px"
                      height="40px"
                    />
                  ) : null}
                  {to === 'inr' ? (
                    <img
                      alt="flag"
                      src={`${flagsUrl}/IN.svg`}
                      width="40px"
                      height="40px"
                    />
                  ) : null}
                  {to === 'jpy' ? (
                    <img
                      alt="flag"
                      src={`${flagsUrl}/JP.svg`}
                      width="40px"
                      height="40px"
                    />
                  ) : null}
                  {to === 'cny' ? (
                    <img
                      alt="flag"
                      src={`${flagsUrl}/CN.svg`}
                      width="40px"
                      height="40px"
                    />
                  ) : null}
                </SearchIconWrapperEnd>
                <StyledInputBase
                  // color="secondary"
                  // disabled
                  // type="number"
                  placeholder={countryTo(to)}
                  inputProps={{ 'aria-label': 'search' }}
                  value={input > 0 ? output.toFixed(2) : ''}
                  // onChange={(event) => setInput(event.target.value)}
                  // onChange={() => {
                  //   convert2()
                  // }}
                  // onKeyPress={() => {
                  //   convert()
                  // }}
                  inputComponent={NumberFormatCustom} // todo error
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
                  title="US Dollar"
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
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <br />
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Divider sx={{ borderBottomWidth: 2, width: '450px' }} />
                </Grid>
              </Box>
              <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <br />
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Divider sx={{ borderBottomWidth: 2, width: '100%' }} />
                </Grid>
              </Box>
              <Box
                sx={{
                  display: { xs: 'none', sm: 'none', nd: 'none', lg: 'block' },
                }}
              >
                <br />
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography variant="h4">
                    <b>
                      {to === 'rub' ? (
                        <img
                          alt="flag"
                          src={`${flagsUrl}/RU.svg`}
                          width="20px"
                          height="20px"
                        />
                      ) : null}
                      {to === 'usd' ? (
                        <img
                          alt="flag"
                          src={`${flagsUrl}/US.svg`}
                          width="20px"
                          height="20px"
                        />
                      ) : null}
                      {to === 'eur' ? (
                        <img
                          alt="flag"
                          src={`${flagsUrl}/EU.svg`}
                          width="20px"
                          height="20px"
                        />
                      ) : null}
                      {to === 'chf' ? (
                        <img
                          alt="flag"
                          src={`${flagsUrl}/CH.svg`}
                          width="20px"
                          height="20px"
                        />
                      ) : null}
                      {to === 'try' ? (
                        <img
                          alt="flag"
                          src={`${flagsUrl}/TR.svg`}
                          width="20px"
                          height="20px"
                        />
                      ) : null}
                      {to === 'gbp' ? (
                        <img
                          alt="flag"
                          src={`${flagsUrl}/GB.svg`}
                          width="20px"
                          height="20px"
                        />
                      ) : null}
                      {to === 'inr' ? (
                        <img
                          alt="flag"
                          src={`${flagsUrl}/IN.svg`}
                          width="20px"
                          height="20px"
                        />
                      ) : null}
                      {to === 'jpy' ? (
                        <img
                          alt="flag"
                          src={`${flagsUrl}/JP.svg`}
                          width="20px"
                          height="20px"
                        />
                      ) : null}
                      {to === 'cny' ? (
                        <img
                          alt="flag"
                          src={`${flagsUrl}/CN.svg`}
                          width="20px"
                          height="20px"
                        />
                      ) : null}{' '}
                      {exchangeRate}{' '}
                      {/* {exchangeRate != 1 ? exchangeRate.toFixed(2) : exchangeRate}{' '} */}
                      {/* {exchangeRate > 1.1 ? exchangeRate.toFixed(2) : exchangeRate}{' '} */}
                      {to.toUpperCase()}
                      {exchangeRate > yesterdayRate ? (
                        <KeyboardDoubleArrowUpIcon color="success" />
                      ) : null}
                      {exchangeRate < yesterdayRate ? (
                        <KeyboardDoubleArrowDownIcon color="error" />
                      ) : null}
                    </b>
                  </Typography>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ display: 'none' }}>
          <br />
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h4">
              <b>
                {from === 'rub' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/RU.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {from === 'usd' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/US.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {from === 'eur' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/EU.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {from === 'chf' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/CH.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {from === 'try' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/TR.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {from === 'gbp' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/GB.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {from === 'inr' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/IN.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {from === 'jpy' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/JP.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {from === 'cny' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/CN.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}{' '}
                1 {from.toUpperCase()} ={' '}
                {to === 'rub' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/RU.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {to === 'usd' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/US.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {to === 'eur' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/EU.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {to === 'chf' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/CH.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {to === 'try' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/TR.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {to === 'gbp' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/GB.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {to === 'inr' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/IN.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {to === 'jpy' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/JP.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {to === 'cny' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/CN.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}{' '}
                {exchangeRate}{' '}
                {/* {exchangeRate != 1 ? exchangeRate.toFixed(2) : exchangeRate}{' '} */}
                {/* {exchangeRate > 1.1 ? exchangeRate.toFixed(2) : exchangeRate}{' '} */}
                {to.toUpperCase()}
                {exchangeRate > yesterdayRate ? (
                  <KeyboardDoubleArrowUpIcon color="success" />
                ) : null}
                {exchangeRate < yesterdayRate ? (
                  <KeyboardDoubleArrowDownIcon color="error" />
                ) : null}
              </b>
            </Typography>
          </Grid>
        </Box>
        <Box sx={{ display: { lg: 'none' } }}>
          <br />
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h4">
              <b>
                {from === 'rub' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/RU.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {from === 'usd' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/US.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {from === 'eur' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/EU.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {from === 'chf' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/CH.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {from === 'try' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/TR.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {from === 'gbp' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/GB.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {from === 'inr' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/IN.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {from === 'jpy' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/JP.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {from === 'cny' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/CN.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}{' '}
                1 {from.toUpperCase()} ={' '}
                {to === 'rub' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/RU.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {to === 'usd' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/US.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {to === 'eur' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/EU.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {to === 'chf' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/CH.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {to === 'try' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/TR.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {to === 'gbp' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/GB.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {to === 'inr' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/IN.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {to === 'jpy' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/JP.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}
                {to === 'cny' ? (
                  <img
                    alt="flag"
                    src={`${flagsUrl}/CN.svg`}
                    width="20px"
                    height="20px"
                  />
                ) : null}{' '}
                {exchangeRate}{' '}
                {/* {exchangeRate != 1 ? exchangeRate.toFixed(2) : exchangeRate}{' '} */}
                {/* {exchangeRate > 1.1 ? exchangeRate.toFixed(2) : exchangeRate}{' '} */}
                {to.toUpperCase()}
                {exchangeRate > yesterdayRate ? (
                  <KeyboardDoubleArrowUpIcon color="success" />
                ) : null}
                {exchangeRate < yesterdayRate ? (
                  <KeyboardDoubleArrowDownIcon color="error" />
                ) : null}
              </b>
            </Typography>
          </Grid>
        </Box>
        <Box
          sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }}
        >
          <Box
            sx={{ mt: -1, mb: -3 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/exchange-bg.png`}
              alt="exchange"
              draggable={false}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
