import React, { useState } from 'react'
import { Typography, Container, Box, Grid, IconButton } from '@mui/material'
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

export default function Dictionary() {
  const [error, setError] = useState(false)
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)

  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [data, setData] = useState({})
  const [searchWord, setSearchWord] = useState('')

  const playAudio = () => {
    let audio = new Audio(data.phonetics[0].audio)
    audio.play()
  }

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`

  const getMeaning = (event) => {
    if (event.key === 'Enter') {
      axios
        .get(url)
        .then((response) => {
          setValue(0)
          setData(response.data[0])
          console.log(response.data[0])
          // setOpen(true)
        })
        .catch((error) => {
          setError(true)
          setOpen(true)
          console.error('THIS IS ERROR --->', error)
        })
      setError(false)
      setSearchWord('')
    }
  }

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
        <Typography
          variant="h3"
          component="div"
          sx={({ flexGrow: 1 }, { textAlign: 'center' })}
        >
          <b>Enter the word</b>
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
              value={searchWord}
              onChange={(event) => setSearchWord(event.target.value)}
              onKeyPress={getMeaning}
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
                  Enter the correct word!
                </Alert>
              </Snackbar>
            ) : null}
          </Box>
        </Box>
        <br />

        {data.word ? (
          <Box>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs sx={({ flexGrow: 1 }, { textAlign: 'center' })}>
                {data.phonetics[0].audio ? (
                  <IconButton onClick={playAudio} color="inherit" title="Audio">
                    <HearingIcon style={{ fontSize: 40 }} />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={handleClick2}
                    color="inherit"
                    title="No Audio"
                  >
                    <HearingDisabledIcon style={{ fontSize: 40 }} />
                    <Snackbar
                      open={open2}
                      autoHideDuration={3000}
                      onClose={handleClose2}
                    >
                      <Alert
                        onClose={handleClose2}
                        severity="error"
                        sx={{ width: '100%' }}
                      >
                        Sorry, no audio :(
                      </Alert>
                    </Snackbar>
                  </IconButton>
                )}
              </Grid>
              <Grid item xs={6} sx={({ flexGrow: 1 }, { textAlign: 'center' })}>
                <Box>
                  <br />
                  <Box>
                    <Typography
                      variant="h1"
                      component="div"
                      sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                    >
                      <b>{data.word}</b>
                      {/* <b>{data.word[0].toUpperCase() + data.word.slice(1)}</b> */}
                      {data.phonetic ? (
                        <Box>
                          <Typography variant="h5">
                            [{data.phonetic}]
                          </Typography>
                        </Box>
                      ) : (
                        <Typography variant="h5">
                          <br />
                        </Typography>
                      )}
                    </Typography>
                  </Box>
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

            <Box>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs"
                textColor="inherit"
                // indicatorColor="primary"
                centered
              >
                {data.meanings[0] ? (
                  <Tab
                    label={data.meanings[0]?.partOfSpeech}
                    {...a11yProps(0)}
                  />
                ) : null}
                {data.meanings[1] ? (
                  <Tab
                    label={data.meanings[1]?.partOfSpeech}
                    {...a11yProps(1)}
                  />
                ) : null}
                {data.meanings[2] ? (
                  <Tab
                    label={data.meanings[2]?.partOfSpeech}
                    {...a11yProps(2)}
                  />
                ) : null}
                {data.meanings[3] ? (
                  <Tab
                    label={data.meanings[3]?.partOfSpeech}
                    {...a11yProps(3)}
                  />
                ) : null}
                {data.meanings[4] ? (
                  <Tab
                    label={data.meanings[4]?.partOfSpeech}
                    {...a11yProps(4)}
                  />
                ) : null}
              </Tabs>
              <TabPanel value={value} index={0}>
                {data.meanings[0] ? (
                  <Box>
                    <Typography variant="h4">
                      <b>{data.meanings[0]?.partOfSpeech}</b>
                    </Typography>
                    <br />
                    <Typography variant="h5">
                      <b>Definition:</b>
                    </Typography>
                    <Typography>
                      {data.meanings[0].definitions[0].definition[0].toUpperCase() +
                        data.meanings[0].definitions[0].definition.slice(1)}
                    </Typography>
                    {data.meanings[0].definitions[0].example ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Example:</b>
                        </Typography>
                        <Typography>
                          <i>'{data.meanings[0].definitions[0].example}'</i>
                        </Typography>
                      </Box>
                    ) : null}
                    {data.meanings[0].definitions[0].synonyms.length > 0 ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Synonyms:</b>
                        </Typography>
                        <Typography>
                          {data.meanings[0].definitions[0].synonyms.join(', ')}
                        </Typography>
                      </Box>
                    ) : null}
                    {data.meanings[0].definitions[0].antonyms.length > 0 ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Antonyms:</b>
                        </Typography>
                        <Typography>
                          {data.meanings[0].definitions[0].antonyms.join(', ')}
                        </Typography>
                      </Box>
                    ) : null}
                  </Box>
                ) : null}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {data.meanings[1] ? (
                  <Box>
                    <Typography variant="h4">
                      <b>{data.meanings[1]?.partOfSpeech}</b>
                    </Typography>
                    <br />
                    <Typography variant="h5">
                      <b>Definition:</b>
                    </Typography>
                    <Typography>
                      {data.meanings[1].definitions[0].definition[0].toUpperCase() +
                        data.meanings[1].definitions[0].definition.slice(1)}
                    </Typography>
                    {data.meanings[1].definitions[0].example ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Example:</b>
                        </Typography>
                        <Typography>
                          <i>'{data.meanings[1].definitions[0].example}'</i>
                        </Typography>
                      </Box>
                    ) : null}
                    {data.meanings[1].definitions[0].synonyms.length > 0 ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Synonyms:</b>
                        </Typography>
                        <Typography>
                          {data.meanings[1].definitions[0].synonyms.join(', ')}
                        </Typography>
                      </Box>
                    ) : null}
                    {data.meanings[1].definitions[0].antonyms.length > 0 ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Antonyms:</b>
                        </Typography>
                        <Typography>
                          {data.meanings[1].definitions[0].antonyms.join(', ')}
                        </Typography>
                      </Box>
                    ) : null}
                  </Box>
                ) : null}
              </TabPanel>
              <TabPanel value={value} index={2}>
                {data.meanings[2] ? (
                  <Box>
                    <Typography variant="h4">
                      <b>{data.meanings[2]?.partOfSpeech}</b>
                    </Typography>
                    <br />
                    <Typography variant="h5">
                      <b>Definition:</b>
                    </Typography>
                    <Typography>
                      {data.meanings[2].definitions[0].definition[0].toUpperCase() +
                        data.meanings[2].definitions[0].definition.slice(1)}
                    </Typography>
                    {data.meanings[2].definitions[0].example ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Example:</b>
                        </Typography>
                        <Typography>
                          <i>'{data.meanings[2].definitions[0].example}'</i>
                        </Typography>
                      </Box>
                    ) : null}
                    {data.meanings[2].definitions[0].synonyms.length > 0 ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Synonyms:</b>
                        </Typography>
                        <Typography>
                          {data.meanings[2].definitions[0].synonyms.join(', ')}
                        </Typography>
                      </Box>
                    ) : null}
                    {data.meanings[2].definitions[0].antonyms.length > 0 ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Antonyms:</b>
                        </Typography>
                        <Typography>
                          {data.meanings[2].definitions[0].antonyms.join(', ')}
                        </Typography>
                      </Box>
                    ) : null}
                  </Box>
                ) : null}
              </TabPanel>
              <TabPanel value={value} index={3}>
                {data.meanings[3] ? (
                  <Box>
                    <Typography variant="h4">
                      <b>{data.meanings[3]?.partOfSpeech}</b>
                    </Typography>
                    <br />
                    <Typography variant="h5">
                      <b>Definition:</b>
                    </Typography>
                    <Typography>
                      {data.meanings[3].definitions[0].definition[0].toUpperCase() +
                        data.meanings[3].definitions[0].definition.slice(1)}
                    </Typography>
                    {data.meanings[3].definitions[0].example ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Example:</b>
                        </Typography>
                        <Typography>
                          <i>'{data.meanings[3].definitions[0].example}'</i>
                        </Typography>
                      </Box>
                    ) : null}
                    {data.meanings[3].definitions[0].synonyms.length > 0 ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Synonyms:</b>
                        </Typography>
                        <Typography>
                          {data.meanings[3].definitions[0].synonyms.join(', ')}
                        </Typography>
                      </Box>
                    ) : null}
                    {data.meanings[3].definitions[0].antonyms.length > 0 ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Antonyms:</b>
                        </Typography>
                        <Typography>
                          {data.meanings[3].definitions[0].antonyms.join(', ')}
                        </Typography>
                      </Box>
                    ) : null}
                  </Box>
                ) : null}
              </TabPanel>
              <TabPanel value={value} index={4}>
                {data.meanings[4] ? (
                  <Box>
                    <Typography variant="h4">
                      <b>{data.meanings[4]?.partOfSpeech}</b>
                    </Typography>
                    <br />
                    <Typography variant="h5">
                      <b>Definition:</b>
                    </Typography>
                    <Typography>
                      {data.meanings[4].definitions[0].definition[0].toUpperCase() +
                        data.meanings[4].definitions[0].definition.slice(1)}
                    </Typography>
                    {data.meanings[4].definitions[0].example ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Example:</b>
                        </Typography>
                        <Typography>
                          <i>'{data.meanings[4].definitions[0].example}'</i>
                        </Typography>
                      </Box>
                    ) : null}
                    {data.meanings[4].definitions[0].synonyms.length > 0 ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Synonyms:</b>
                        </Typography>
                        <Typography>
                          {data.meanings[4].definitions[0].synonyms.join(', ')}
                        </Typography>
                      </Box>
                    ) : null}
                    {data.meanings[4].definitions[0].antonyms.length > 0 ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Antonyms:</b>
                        </Typography>
                        <Typography>
                          {data.meanings[4].definitions[0].antonyms.join(', ')}
                        </Typography>
                      </Box>
                    ) : null}
                  </Box>
                ) : null}
              </TabPanel>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{ mt: -4 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/dictionary-bg.png`}
              alt="dictionary"
            />
          </Box>
        )}
      </Container>
    </Box>
  )
}
