import React, { useState, useEffect } from 'react'
import {
  Container,
  Box,
  Typography,
  Chip,
  FormControlLabel,
  FormGroup,
  Slider,
  IconButton,
  Stack,
} from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import MoodBadIcon from '@mui/icons-material/MoodBad'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'
import RefreshIcon from '@mui/icons-material/Refresh'
import CopyAllIcon from '@mui/icons-material/CopyAll'
import { green, orange, red, yellow } from '@mui/material/colors'
import Checkbox from '@mui/material/Checkbox'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

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
    width: '750px',
  },
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  fontSize: '36px',
  fontWeight: 'bold',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 3, 1, 1),
    transition: theme.transitions.create('width'),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(7),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '470px',
    },
  },
  '& .MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor: theme.palette.primary.contrastText,
  },
}))

const SearchIconWrapperGenerate = styled('div')(({ theme }) => ({
  right: '8px',
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const SearchIconWrapperCopy = styled('div')(({ theme }) => ({
  right: '57px',
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const SearchIconWrapperChip = styled('div')(({ theme }) => ({
  right: '122px',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

export default function Password() {
  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(6)
  const [uppercaseChecked, setUppercaseChecked] = useState(true)
  const [lowercaseChecked, setLowercaseChecked] = useState(true)
  const [numbersChecked, setNumbersChecked] = useState(false)
  const [symbolsChecked, setSymbolsChecked] = useState(false)

  const [complexity, setComplexity] = useState(4) // password complexity

  const [openSuccess, setOpenSuccess] = useState(false) // successfull copy notifications
  const [openError, setOpenError] = useState(false) // no password notifications
  const [openErrorOptions, setOpenErrorOptions] = useState(false) // no checkboxes notifications

  useEffect(() => {
    setGeneratedPassword()
  }, [
    passwordLength,
    uppercaseChecked,
    lowercaseChecked,
    numbersChecked,
    symbolsChecked,
  ])

  const setGeneratedPassword = () => {
    let uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let lowercase = 'abcdefghijklmnopqrstuvwxyz'
    let numbers = '0123456789'
    let symbols = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~'"

    let charList = ''

    if (uppercaseChecked) {
      charList += uppercase
    }
    if (lowercaseChecked) {
      charList += lowercase
    }
    if (numbersChecked) {
      charList += numbers
    }
    if (symbolsChecked) {
      charList += symbols
    }
    if (
      !uppercaseChecked &&
      !lowercaseChecked &&
      !numbersChecked &&
      !symbolsChecked
    ) {
      setOpenSuccess(false)
      setOpenError(false)
      setOpenErrorOptions(true)
    }

    // let result = charList //unique chars
    //   .split('')
    //   .sort(() => {
    //     return 0.5 - Math.random()
    //   })
    //   .join('')
    //   .slice(-passwordLength)

    let result = ''

    if (charList) {
      let x = passwordLength
      while (x > 0) {
        let index = Math.floor(Math.random() * charList.length) // pick random index from charList
        result += charList[index]
        x--
      }
    }

    setPassword(result)
  }

  const handleClipboard = async () => {
    if (password) {
      await navigator.clipboard.writeText(password)
      setOpenError(false)
      setOpenErrorOptions(false)
      setOpenSuccess(true)
    } else {
      setOpenSuccess(false)
      setOpenErrorOptions(false)
      setOpenError(true)
    }
  }

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSuccess(false)
  }

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenError(false)
  }

  const handleCloseErrorOptions = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenErrorOptions(false)
  }

  const handleChangeUppercaseChecked = () => {
    setUppercaseChecked(!uppercaseChecked)
    if (uppercaseChecked) {
      setComplexity(complexity - 1)
    } else if (!uppercaseChecked) {
      setComplexity(complexity + 1)
    }
  }

  const handleChangeLowercaseChecked = () => {
    setLowercaseChecked(!lowercaseChecked)
    if (lowercaseChecked) {
      setComplexity(complexity - 1)
    } else if (!lowercaseChecked) {
      setComplexity(complexity + 1)
    }
  }

  const handleChangeNumbersChecked = () => {
    setNumbersChecked(!numbersChecked)
    if (numbersChecked) {
      setComplexity(complexity - 2)
    } else if (!numbersChecked) {
      setComplexity(complexity + 2)
    }
  }

  const handleChangeSymbolsChecked = () => {
    setSymbolsChecked(!symbolsChecked)
    if (symbolsChecked) {
      setComplexity(complexity - 2)
    } else if (!symbolsChecked) {
      setComplexity(complexity + 2)
    }
  }

  return (
    <Box sx={{ mt: 14 }}>
      <Container maxwidth="xs">
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box>
            <Snackbar
              open={openSuccess}
              autoHideDuration={5000}
              onClose={handleCloseSuccess}
            >
              <Alert
                onClose={handleCloseSuccess}
                severity="success"
                sx={{ width: '100%' }}
              >
                Copied to your clipboard!
              </Alert>
            </Snackbar>
            <Snackbar
              open={openError}
              autoHideDuration={4000}
              onClose={handleCloseError}
            >
              <Alert
                onClose={handleCloseError}
                severity="error"
                sx={{ width: '100%' }}
              >
                No password to copy!
              </Alert>
            </Snackbar>
            <Snackbar
              open={openError}
              autoHideDuration={4000}
              onClose={handleCloseError}
            >
              <Alert
                onClose={handleCloseError}
                severity="error"
                sx={{ width: '100%' }}
              >
                No password to copy!
              </Alert>
            </Snackbar>
            <Snackbar
              open={openErrorOptions}
              autoHideDuration={4000}
              onClose={handleCloseErrorOptions}
            >
              <Alert
                onClose={handleCloseErrorOptions}
                severity="error"
                sx={{ width: '100%' }}
              >
                Please select at least one option!
              </Alert>
            </Snackbar>
          </Box>
          <Box>
            <Typography variant="h4" align="center" color="textSecondary">
              <b>PASSWORD GENERATOR</b>
            </Typography>
            <br />
            <br />
            <Search>
              <SearchIconWrapperGenerate>
                <IconButton
                  onClick={setGeneratedPassword}
                  color="inherit"
                  title="Generate"
                >
                  <RefreshIcon style={{ fontSize: 40 }} />
                </IconButton>
              </SearchIconWrapperGenerate>
              <SearchIconWrapperCopy>
                <IconButton
                  onClick={handleClipboard}
                  color="inherit"
                  title="Copy"
                >
                  <CopyAllIcon style={{ fontSize: 40 }} />
                </IconButton>
              </SearchIconWrapperCopy>
              <SearchIconWrapperChip>
                {password &&
                  passwordLength + complexity < 12 && ( //4 = 12 (+8 to old)
                    <Chip
                      color="success"
                      icon={<MoodBadIcon />}
                      label="Very Weak"
                      sx={{
                        backgroundColor: red[800],
                      }}
                    />
                  )}
                {password &&
                  passwordLength + complexity > 11 &&
                  passwordLength + complexity < 16 && ( // 3, 7 = 11, 15 (+8 to old)
                    <Chip
                      color="success"
                      icon={<SentimentVeryDissatisfiedIcon />}
                      label="Weak"
                      sx={{
                        backgroundColor: orange[700],
                      }}
                    />
                  )}
                {password &&
                  passwordLength + complexity > 15 &&
                  passwordLength + complexity < 20 && ( // 6, 11 = 14, 19 (+8 to old)
                    <Chip
                      color="success"
                      icon={<SentimentSatisfiedIcon />}
                      label="Good"
                      sx={{
                        backgroundColor: yellow[700],
                      }}
                    />
                  )}
                {password &&
                  passwordLength + complexity > 19 &&
                  passwordLength + complexity < 24 && ( // 10, 15 = 18, 22  (+8 to old)
                    <Chip
                      color="success"
                      icon={<SentimentSatisfiedAltIcon />}
                      label="Strong"
                      sx={{
                        backgroundColor: green[600],
                      }}
                    />
                  )}
                {password &&
                  passwordLength + complexity > 23 && ( // 14 = 22(+8 to old)
                    <Chip
                      color="success"
                      icon={<SentimentVerySatisfiedIcon />}
                      label="Very Strong"
                      sx={{
                        backgroundColor: green[900],
                      }}
                    />
                  )}
              </SearchIconWrapperChip>
              <StyledInputBase
                disabled
                inputProps={{
                  'aria-label': 'search',
                }}
                value={password}
              />
            </Search>
            <br />
            <br />
            <Box display="flex" justifyContent="center" alignItems="center">
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="Uppercase"
                      checked={uppercaseChecked}
                      onChange={handleChangeUppercaseChecked}
                      sx={{
                        '&.Mui-checked': {
                          color: red[500],
                        },
                      }}
                    />
                  }
                  label="ABC"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="Lowercase"
                      checked={lowercaseChecked}
                      onChange={handleChangeLowercaseChecked}
                      sx={{
                        '&.Mui-checked': {
                          color: red[500],
                        },
                      }}
                    />
                  }
                  label="abc"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="Numbers"
                      checked={numbersChecked}
                      onChange={handleChangeNumbersChecked}
                      sx={{
                        '&.Mui-checked': {
                          color: red[500],
                        },
                      }}
                    />
                  }
                  label="123"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="Symbols"
                      checked={symbolsChecked}
                      onChange={handleChangeSymbolsChecked}
                      sx={{
                        '&.Mui-checked': {
                          color: red[500],
                        },
                      }}
                    />
                  }
                  label="#$&"
                />
              </FormGroup>
            </Box>
            <br />
            <Stack direction="row" spacing={7}>
              <Slider
                value={passwordLength}
                onChange={(event, newValue) => setPasswordLength(newValue)}
                min={1}
                step={1}
                max={30}
                color="secondary"
                valueLabelDisplay="on"
                marks
              />
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
