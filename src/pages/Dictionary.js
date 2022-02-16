import React, { useState } from 'react'
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

export default function Dictionary() {
  const [error, setError] = useState(false) // catch errors
  const [open, setOpen] = useState(false) // no input notifications
  const [open2, setOpen2] = useState(false) // no audio notifications

  const [favs, setFavs] = useState([]) // array of favourite words
  const [phonetics, setPhonetics] = useState([]) // array of phonetics of favourite words
  const [audios, setAudios] = useState([]) // array of audio of favourite words

  const setFavourite = () => {
    if (favs.indexOf(data.word) === -1) {
      setFavs((prevFavs) => [...prevFavs, data.word])
      setPhonetics((prevPhonetics) => [...prevPhonetics, data.phonetic])
      setAudios((prevAudios) => [...prevAudios, data.phonetics[0].audio])
      // console.log(favs)
      // console.log(phonetics)
      // console.log(audios)
    }
  }

  const setNotFavourite = () => {
    setFavs((prevFavs) => prevFavs.filter((item) => item !== data.word))
    setPhonetics((prevPhonetics) =>
      prevPhonetics.filter((item) => item !== data.phonetic)
    )
    setAudios((prevAudios) =>
      prevAudios.filter((item) => item !== data.phonetics[0].audio)
    )
    // console.log(favs)
    // console.log(phonetics)
    // console.log(audios)
  }

  const [value, setValue] = useState(0) // tabs state

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [data, setData] = useState({}) // response data object
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
          // console.log(response.data[0])
          // setOpen(true)
          let audio = new Audio(response.data[0].phonetics[0].audio)
          audio.play()
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

  const getRandom = () => {
    const random = randomWords()
    // console.log(random)
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${random}`)
      .then((response) => {
        setValue(0)
        setData(response.data[0])
        // console.log(response.data[0])
        // setOpen(true)
        let audio = new Audio(response.data[0].phonetics[0].audio)
        audio.play()
      })
      .catch((error) => {
        setError(true)
        setOpen(true)
        console.error('THIS IS ERROR --->', error)
      })
    setError(false)
    setSearchWord('')
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

  let length = [...Array(favs.length).keys()]

  const clearAllFavs = () => {
    setFavs([])
    setPhonetics([])
    setAudios([])
  }

  return (
    <Box sx={{ mt: 14 }}>
      <Container maxwidth="sm">
        {!data.word ? (
          <Typography
            variant="h3"
            component="div"
            sx={({ flexGrow: 1 }, { textAlign: 'center' })}
          >
            <b>Enter the word</b>
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
              onClick={getRandom}
              color="inherit"
              size="large"
              title="Random"
            >
              <ShuffleIcon style={{ fontSize: 30 }} />
            </IconButton>
          </Box>
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
              <Grid
                item
                xs={12}
                md={3}
                sx={({ flexGrow: 1 }, { textAlign: 'center' })}
              >
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  {data.phonetics[0].audio ? (
                    <IconButton
                      onClick={playAudio}
                      color="inherit"
                      title="Audio"
                    >
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
                          Sorry, no audio 😞
                        </Alert>
                      </Snackbar>
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
                  <br />
                  <Box display="flex" justifyContent="center" width="100%">
                    <Typography
                      variant="h1"
                      component="div"
                      sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                    >
                      {data.word.length > 16 ? (
                        <b>{data.word.substr(-150, 13) + '…'}</b>
                      ) : (
                        <b>{data.word}</b>
                      )}
                      {data.phonetic ? (
                        <Box>
                          <Typography variant="h5" color="textSecondary">
                            [ {data.phonetic} ]
                          </Typography>
                        </Box>
                      ) : (
                        <Typography variant="h5">
                          {/* <br /> */}
                          <Typography variant="h5" color="textSecondary">
                            [ - ]
                          </Typography>
                        </Typography>
                      )}
                    </Typography>
                  </Box>
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

                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  {favs.includes(data.word) ? (
                    <IconButton
                      onClick={setNotFavourite}
                      color="error"
                      title="Delete from Favourites"
                    >
                      <FavoriteIcon style={{ fontSize: 40 }} />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={setFavourite}
                      color="inherit"
                      title="Add to Favourites"
                    >
                      <FavoriteBorderIcon style={{ fontSize: 40 }} />
                    </IconButton>
                  )}
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <Stack justifyContent="center" direction="row" spacing={5}>
                {data.phonetics[0].audio ? (
                  <IconButton onClick={playAudio} color="inherit" title="Audio">
                    <HearingIcon style={{ fontSize: 50 }} />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={handleClick2}
                    color="inherit"
                    title="No Audio"
                  >
                    <HearingDisabledIcon style={{ fontSize: 50 }} />
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
                        Sorry, no audio 😞
                      </Alert>
                    </Snackbar>
                  </IconButton>
                )}

                {favs.includes(data.word) ? (
                  <IconButton
                    onClick={setNotFavourite}
                    color="error"
                    title="Delete from Favourites"
                  >
                    <FavoriteIcon style={{ fontSize: 80 }} />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={setFavourite}
                    color="inherit"
                    title="Add to Favourites"
                  >
                    <FavoriteBorderIcon style={{ fontSize: 80 }} />
                  </IconButton>
                )}
                <IconButton onClick={clearData} color="inherit" title="Clear">
                  <CloseIcon style={{ fontSize: 50 }} />
                </IconButton>
              </Stack>
              <br />
            </Box>
            <Box>
              <Box display="flex" justifyContent="center" width="100%">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="tabs"
                  textColor="inherit"
                  indicatorColor="secondary"
                  centered
                  variant="scrollable"
                  scrollButtons="auto"
                  allowScrollButtonsMobile
                >
                  {data.meanings[0] ? (
                    <Tab
                      label={
                        <Typography variant="h6">
                          <b>{data.meanings[0]?.partOfSpeech}</b>
                        </Typography>
                      }
                      {...a11yProps(0)}
                    />
                  ) : null}
                  {data.meanings[1] ? (
                    <Tab
                      label={
                        <Typography variant="h6">
                          <b>{data.meanings[1]?.partOfSpeech}</b>
                        </Typography>
                      }
                      {...a11yProps(0)}
                    />
                  ) : null}
                  {data.meanings[2] ? (
                    <Tab
                      label={
                        <Typography variant="h6">
                          <b>{data.meanings[2]?.partOfSpeech}</b>
                        </Typography>
                      }
                      {...a11yProps(0)}
                    />
                  ) : null}
                  {data.meanings[3] ? (
                    <Tab
                      label={
                        <Typography variant="h6">
                          <b>{data.meanings[3]?.partOfSpeech}</b>
                        </Typography>
                      }
                      {...a11yProps(0)}
                    />
                  ) : null}
                  {data.meanings[4] ? (
                    <Tab
                      label={
                        <Typography variant="h6">
                          <b>{data.meanings[4]?.partOfSpeech}</b>
                        </Typography>
                      }
                      {...a11yProps(0)}
                    />
                  ) : null}
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                {data.meanings[0] ? (
                  <Box>
                    <Typography variant="h3" color="textSecondary">
                      <b>{data.meanings[0]?.partOfSpeech}</b>
                    </Typography>
                    <br />
                    <Typography variant="h5">
                      <b>Definition</b>
                    </Typography>
                    <Typography color="textSecondary">
                      {data.meanings[0].definitions[0].definition[0].toUpperCase() +
                        data.meanings[0].definitions[0].definition.slice(1)}
                    </Typography>
                    {data.meanings[0].definitions[0].example ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Example</b>
                        </Typography>
                        <Typography color="textSecondary">
                          <i>'{data.meanings[0].definitions[0].example}'</i>
                        </Typography>
                      </Box>
                    ) : null}
                    {data.meanings[0].definitions[0].synonyms.length > 0 ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Synonyms</b>
                        </Typography>
                        <Typography color="textSecondary">
                          {data.meanings[0].definitions[0].synonyms.join(', ')}
                        </Typography>
                      </Box>
                    ) : null}
                    {data.meanings[0].definitions[0].antonyms.length > 0 ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Antonyms</b>
                        </Typography>
                        <Typography color="textSecondary">
                          {data.meanings[0].definitions[0].antonyms.join(', ')}
                        </Typography>
                      </Box>
                    ) : null}
                    {/* {data.origin ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Origin</b>
                        </Typography>
                        <Typography>
                          {data.origin[0].toUpperCase() + data.origin.slice(1)}
                        </Typography>
                      </Box>
                    ) : null} */}
                  </Box>
                ) : null}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {data.meanings[1] ? (
                  <Box>
                    <Typography variant="h3" color="textSecondary">
                      <b>{data.meanings[1]?.partOfSpeech}</b>
                    </Typography>
                    <br />
                    <Typography variant="h5">
                      <b>Definition</b>
                    </Typography>
                    <Typography color="textSecondary">
                      {data.meanings[1].definitions[0].definition[0].toUpperCase() +
                        data.meanings[1].definitions[0].definition.slice(1)}
                    </Typography>
                    {data.meanings[1].definitions[0].example ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Example</b>
                        </Typography>
                        <Typography color="textSecondary">
                          <i>'{data.meanings[1].definitions[0].example}'</i>
                        </Typography>
                      </Box>
                    ) : null}
                    {data.meanings[1].definitions[0].synonyms.length > 0 ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Synonyms</b>
                        </Typography>
                        <Typography color="textSecondary">
                          {data.meanings[1].definitions[0].synonyms.join(', ')}
                        </Typography>
                      </Box>
                    ) : null}
                    {data.meanings[1].definitions[0].antonyms.length > 0 ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Antonyms</b>
                        </Typography>
                        <Typography color="textSecondary">
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
                    <Typography variant="h3" color="textSecondary">
                      <b>{data.meanings[2]?.partOfSpeech}</b>
                    </Typography>
                    <br />
                    <Typography variant="h5">
                      <b>Definition</b>
                    </Typography>
                    <Typography color="textSecondary">
                      {data.meanings[2].definitions[0].definition[0].toUpperCase() +
                        data.meanings[2].definitions[0].definition.slice(1)}
                    </Typography>
                    {data.meanings[2].definitions[0].example ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Example</b>
                        </Typography>
                        <Typography color="textSecondary">
                          <i>'{data.meanings[2].definitions[0].example}'</i>
                        </Typography>
                      </Box>
                    ) : null}
                    {data.meanings[2].definitions[0].synonyms.length > 0 ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Synonyms</b>
                        </Typography>
                        <Typography color="textSecondary">
                          {data.meanings[2].definitions[0].synonyms.join(', ')}
                        </Typography>
                      </Box>
                    ) : null}
                    {data.meanings[2].definitions[0].antonyms.length > 0 ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Antonyms</b>
                        </Typography>
                        <Typography color="textSecondary">
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
                    <Typography variant="h3" color="textSecondary">
                      <b>{data.meanings[3]?.partOfSpeech}</b>
                    </Typography>
                    <br />
                    <Typography variant="h5">
                      <b>Definition</b>
                    </Typography>
                    <Typography color="textSecondary">
                      {data.meanings[3].definitions[0].definition[0].toUpperCase() +
                        data.meanings[3].definitions[0].definition.slice(1)}
                    </Typography>
                    {data.meanings[3].definitions[0].example ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Example</b>
                        </Typography>
                        <Typography color="textSecondary">
                          <i>'{data.meanings[3].definitions[0].example}'</i>
                        </Typography>
                      </Box>
                    ) : null}
                    {data.meanings[3].definitions[0].synonyms.length > 0 ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Synonyms</b>
                        </Typography>
                        <Typography color="textSecondary">
                          {data.meanings[3].definitions[0].synonyms.join(', ')}
                        </Typography>
                      </Box>
                    ) : null}
                    {data.meanings[3].definitions[0].antonyms.length > 0 ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Antonyms</b>
                        </Typography>
                        <Typography color="textSecondary">
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
                    <Typography variant="h3" color="textSecondary">
                      <b>{data.meanings[4]?.partOfSpeech}</b>
                    </Typography>
                    <br />
                    <Typography variant="h5">
                      <b>Definition</b>
                    </Typography>
                    <Typography color="textSecondary">
                      {data.meanings[4].definitions[0].definition[0].toUpperCase() +
                        data.meanings[4].definitions[0].definition.slice(1)}
                    </Typography>
                    {data.meanings[4].definitions[0].example ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Example</b>
                        </Typography>
                        <Typography color="textSecondary">
                          <i>'{data.meanings[4].definitions[0].example}'</i>
                        </Typography>
                      </Box>
                    ) : null}
                    {data.meanings[4].definitions[0].synonyms.length > 0 ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Synonyms</b>
                        </Typography>
                        <Typography color="textSecondary">
                          {data.meanings[4].definitions[0].synonyms.join(', ')}
                        </Typography>
                      </Box>
                    ) : null}
                    {data.meanings[4].definitions[0].antonyms.length > 0 ? (
                      <Box>
                        <br />
                        <Typography variant="h5">
                          <b>Antonyms</b>
                        </Typography>
                        <Typography color="textSecondary">
                          {data.meanings[4].definitions[0].antonyms.join(', ')}
                        </Typography>
                      </Box>
                    ) : null}
                  </Box>
                ) : null}
              </TabPanel>
            </Box>
            <>
              <br />
              <Divider>
                <Typography
                  variant="h3"
                  component="div"
                  sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                >
                  <Badge badgeContent={favs.length} color="secondary" max={99}>
                    <b>Favourites</b>
                  </Badge>
                </Typography>
              </Divider>
              <br />
            </>
            {favs.length > 0 ? (
              <Grid
                container
                // direction="row"
                // justifyContent="center"
                // alignItems="center"
              >
                <Grid item xs={12} md={3}></Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                >
                  <Box>
                    <List>
                      {length.map((index) => (
                        <div key={index}>
                          <ListItem
                            secondaryAction={
                              <IconButton
                                onClick={() => {
                                  setFavs((prevFavs) =>
                                    prevFavs.filter(
                                      (item) => item !== favs[index]
                                    )
                                  )
                                  setPhonetics((prevPhonetics) =>
                                    prevPhonetics.filter(
                                      (item) => item !== phonetics[index]
                                    )
                                  )
                                  setAudios((prevAudios) =>
                                    prevAudios.filter(
                                      (item) => item !== audios[index]
                                    )
                                  )
                                  // console.log(favs)
                                  // console.log(phonetics)
                                  // console.log(audios)
                                }}
                                edge="end"
                                aria-label="delete"
                                color="inherit"
                                title="Delete"
                              >
                                <CloseIcon style={{ fontSize: 30 }} />
                              </IconButton>
                            }
                          >
                            <ListItemButton
                              onClick={
                                audios[index]
                                  ? () => {
                                      let audio = new Audio(audios[index])
                                      audio.play()
                                    }
                                  : handleClick2
                              }
                            >
                              <ListItemAvatar>
                                <IconButton
                                  onClick={() => {
                                    window.scrollTo(0, 0)
                                    axios
                                      .get(
                                        `https://api.dictionaryapi.dev/api/v2/entries/en_US/${favs[index]}`
                                      )
                                      .then((response) => {
                                        setValue(0)
                                        setData(response.data[0])
                                        // setOpen(true)
                                        // let audio = new Audio(
                                        //   response.data[0].phonetics[0].audio
                                        // )
                                        // audio.play()
                                      })
                                      .catch((error) => {
                                        setError(true)
                                        setOpen(true)
                                        console.error(
                                          'THIS IS ERROR --->',
                                          error
                                        )
                                      })
                                    setError(false)
                                    setSearchWord('')
                                  }}
                                  color="inherit"
                                  title="Search"
                                >
                                  <SearchIcon style={{ fontSize: 30 }} />
                                </IconButton>
                              </ListItemAvatar>

                              <ListItemText
                                disableTypography
                                primary={
                                  <Typography variant="h4" color="textPrimary">
                                    {favs[index].length > 16 ? (
                                      <b>
                                        {favs[index].substr(-150, 13) + '…'}
                                      </b>
                                    ) : (
                                      <b>{favs[index]}</b>
                                    )}
                                  </Typography>
                                }
                                secondary={
                                  <Typography variant="p" color="textSecondary">
                                    {/* {phonetics[index].length < 20
                                      ? '[ ' + phonetics[index] + ' ]'
                                      : '[ ' +
                                        phonetics[index].substr(-150, 29) +
                                        '…' +
                                        ' ]'} */}

                                    {phonetics[index]
                                      ? '[ ' + phonetics[index] + ' ]'
                                      : '[ - ]'}
                                  </Typography>
                                }
                              />
                            </ListItemButton>
                          </ListItem>
                        </div>
                      ))}
                    </List>
                  </Box>
                  <Box sx={({ flexGrow: 1 }, { textAlign: 'right' })}>
                    <br />
                    <ThemeButton
                      variant="outlined"
                      endIcon={<ClearAllIcon style={{ fontSize: 30 }} />}
                      onClick={clearAllFavs}
                      title="Clear All"
                    >
                      Clear All
                    </ThemeButton>
                  </Box>
                </Grid>
                <Grid xs={12} md={3}></Grid>
              </Grid>
            ) : (
              <>
                <Typography
                  variant="h4"
                  component="div"
                  sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                  color="textSecondary"
                >
                  <br />
                  <b>No favourite words yet 😞</b>
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  sx={({ flexGrow: 1 }, { textAlign: 'center' })}
                  color="textSecondary"
                >
                  <b>Please, add some!</b>
                </Typography>
                <br />
              </>
            )}
          </Box>
        ) : (
          <>
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
          </>
        )}
      </Container>
    </Box>
  )
}
