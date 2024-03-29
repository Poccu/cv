import { useState, useEffect, forwardRef } from 'react'
import {
  Typography,
  Container,
  Box,
  Grid,
  IconButton,
  Button,
  Stack,
  Chip,
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
import { TransitionGroup } from 'react-transition-group'
import Collapse from '@mui/material/Collapse'
import { blue, red } from '@mui/material/colors'

/* eslint-disable no-useless-escape */

let randomWords = require('random-words')

const urlAudio = process.env.REACT_APP_AUDIO_URL
const urlDictionary = process.env.REACT_APP_DICTIONARY_URL

const ThemeButton = styled(Button)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.button.primary,
  borderRadius: 50,
  height: 44,
  padding: '0 16px',
  border: '2px solid',
  borderColor: alpha(theme.palette.search.primary, 0.1),
  '&:hover': {
    border: '2px solid',
    borderColor: alpha(theme.palette.search.primary, 0),
    backgroundColor: alpha(theme.palette.search.primary, 0.1),
  },
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
          <Box>{children}</Box>
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

const Alert = forwardRef(function Alert(props, ref) {
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
  const [openNoData, setOpenNoData] = useState(false) // no input notifications
  const [openNoAudio, setOpenNoAudio] = useState(false) // no audio notifications
  const [openAddFav, setOpenAddFav] = useState(false) // add fav notifications

  const [favs, setFavs] = useState(
    JSON.parse(localStorage.getItem('favs')) || {
      words: [],
      phonetics: [],
      audios: [],
    }
  )

  // localStorage
  useEffect(() => {
    if (favs !== null) {
      localStorage.setItem('favs', JSON.stringify(favs))
    }
  }, [favs])

  const setFavourite = () => {
    if (!favs.words?.includes(data.word)) {
      setFavs({
        words: [...favs?.words, data.word],
        phonetics: [
          ...favs?.phonetics,
          data?.phonetic?.replace(/[\/\]\[]/g, '') ||
            data?.phonetics[0]?.text?.replace(/[\/\]\[]/g, '') ||
            data?.phonetics[1]?.text?.replace(/[\/\]\[]/g, '') ||
            data?.phonetics[2]?.text?.replace(/[\/\]\[]/g, '') ||
            data?.phonetics[3]?.text?.replace(/[\/\]\[]/g, '') ||
            data.word,
        ],
        audios: [...favs?.audios, `${urlAudio}/${data.word}--_gb_1.mp3`],
      })
      setOpenAddFav(true)
    }
  }

  const setNotFavourite = () => {
    setFavs({
      words: favs.words.filter((item) => item !== data.word),
      phonetics: favs.phonetics.filter(
        (item) =>
          item !== data?.phonetic?.replace(/[\/\]\[]/g, '') &&
          item !== data?.phonetics[0]?.text?.replace(/[\/\]\[]/g, '') &&
          item !== data?.phonetics[1]?.text?.replace(/[\/\]\[]/g, '') &&
          item !== data?.phonetics[2]?.text?.replace(/[\/\]\[]/g, '') &&
          item !== data?.phonetics[3]?.text?.replace(/[\/\]\[]/g, '') &&
          item !== data.word
      ),
      audios: favs.audios.filter(
        (item) => item !== `${urlAudio}/${data.word}--_gb_1.mp3`
      ),
    })
  }

  const [tab, setTab] = useState(0) // tabs state

  const handleChangeTabs = (event, newValue) => {
    setTab(newValue)
  }

  const [data, setData] = useState({}) // response data object
  const [searchWord, setSearchWord] = useState('')
  const [audioWord, setAudioWord] = useState('')

  // localStorage
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('dataDictionary')))
    setAudioWord(JSON.parse(localStorage.getItem('audioWord')))
    setFavs(JSON.parse(localStorage.getItem('favs')))
  }, [])

  useEffect(() => {
    if (data !== null) {
      localStorage.setItem('dataDictionary', JSON.stringify(data))
    }
  }, [data])

  useEffect(() => {
    if (audioWord !== null) {
      localStorage.setItem('audioWord', JSON.stringify(audioWord))
    }
  }, [audioWord])

  const playAudio = () => {
    let audio = new Audio(audioWord)
    audio.volume = 0.3
    audio.play()
  }

  const getMeaning = (event) => {
    const urlSearchWord = `${urlDictionary}/${searchWord}`

    if (event.key === 'Enter') {
      axios
        .get(urlSearchWord)
        .then((response) => {
          setTab(0)
          setData(response.data[0])
          let url = `${urlAudio}/${searchWord.toLowerCase()}--_gb_1.mp3`
          let audio = new Audio(url)
          audio.volume = 0.3
          audio.play()
          setAudioWord(url)
        })
        .catch((error) => {
          setOpenNoData(true)
        })
      setSearchWord('')
      event.target.blur()
    }
  }

  const getRandom = () => {
    const random = randomWords()
    axios
      .get(`${urlDictionary}/${random}`)
      .then((response) => {
        setTab(0)
        setData(response.data[0])
        let url = `${urlAudio}/${random}--_gb_1.mp3`
        let audio = new Audio(url)
        audio.volume = 0.3
        audio.play()
        setAudioWord(url)
      })
      .catch((error) => {
        setOpenNoData(true)
      })
    setSearchWord('')
  }

  const handleClickNoAudio = () => {
    setOpenNoAudio(true)
  }

  const handleCloseNoAudio = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenNoAudio(false)
  }

  const handleCloseNoData = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenNoData(false)
  }

  const handleCloseAddFav = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenAddFav(false)
  }

  const clearData = () => {
    setData({})
    setAudioWord('')
  }

  let favsLength = [...Array(favs?.words?.length).keys()]

  const clearAllFavs = () => {
    setFavs({
      words: [],
      phonetics: [],
      audios: [],
    })
  }

  useEffect(() => {
    data?.word
      ? (document.title = `Dictionary - ${data?.word}`)
      : (document.title = 'Dictionary')
  }, [data?.word])

  return (
    <Box sx={{ mt: 14 }}>
      <Container maxwidth="sm">
        {!data?.word && (
          <Typography variant="h3" sx={{ textAlign: 'center' }}>
            <b>DICTIONARY</b>
          </Typography>
        )}
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
            <Snackbar
              open={openNoData}
              autoHideDuration={3000}
              onClose={handleCloseNoData}
            >
              <Alert
                onClose={handleCloseNoData}
                severity="error"
                sx={{ width: '100%' }}
              >
                Enter the correct word!
              </Alert>
            </Snackbar>
          </Box>
        </Box>
        <br />
        {data?.word ? (
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
                  {true ? (
                    <IconButton
                      onClick={playAudio}
                      color="inherit"
                      title="Audio"
                    >
                      <HearingIcon style={{ fontSize: 40 }} />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={handleClickNoAudio}
                      color="inherit"
                      title="No Audio"
                    >
                      <HearingDisabledIcon style={{ fontSize: 40 }} />
                      <Snackbar
                        open={openNoAudio}
                        autoHideDuration={3000}
                        onClose={handleCloseNoAudio}
                      >
                        <Alert
                          onClose={handleCloseNoAudio}
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
                    <Typography variant="h1" sx={{ textAlign: 'center' }}>
                      {data?.word.length > 16 ? (
                        <b>{data?.word.substr(-150, 13) + '…'}</b>
                      ) : (
                        <b>{data?.word}</b>
                      )}
                      <Box>
                        <Typography variant="h5" color="textSecondary">
                          [{' '}
                          {data?.phonetic?.replace(/[\/\]\[]/g, '') ||
                            data?.phonetics[0]?.text?.replace(
                              /[\/\]\[]/g,
                              ''
                            ) ||
                            data?.phonetics[1]?.text?.replace(
                              /[\/\]\[]/g,
                              ''
                            ) ||
                            data?.phonetics[2]?.text?.replace(
                              /[\/\]\[]/g,
                              ''
                            ) ||
                            data?.phonetics[3]?.text?.replace(
                              /[\/\]\[]/g,
                              ''
                            ) ||
                            data.word}{' '}
                          ]
                        </Typography>
                      </Box>
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
                  {favs?.words?.includes(data.word) ? (
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
                {true ? (
                  <IconButton onClick={playAudio} color="inherit" title="Audio">
                    <HearingIcon style={{ fontSize: 50 }} />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={handleClickNoAudio}
                    color="inherit"
                    title="No Audio"
                  >
                    <HearingDisabledIcon style={{ fontSize: 50 }} />
                    <Snackbar
                      open={openNoAudio}
                      autoHideDuration={3000}
                      onClose={handleCloseNoAudio}
                    >
                      <Alert
                        onClose={handleCloseNoAudio}
                        severity="error"
                        sx={{ width: '100%' }}
                      >
                        Sorry, no audio 😞
                      </Alert>
                    </Snackbar>
                  </IconButton>
                )}

                {favs?.words?.includes(data.word) ? (
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
                  value={tab}
                  onChange={handleChangeTabs}
                  aria-label="tabs"
                  textColor="inherit"
                  indicatorColor="secondary"
                  // centered
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                >
                  {[...Array(10).keys()].map(
                    (i) =>
                      data.meanings[i] && (
                        <Tab
                          label={
                            <Typography variant="h6">
                              <b>{data.meanings[i]?.partOfSpeech}</b>
                            </Typography>
                          }
                          {...a11yProps(0)}
                          key={i}
                        />
                      )
                  )}
                </Tabs>
              </Box>
              {[...Array(10).keys()].map((i) => (
                <TabPanel value={tab} index={i} key={i}>
                  {data.meanings[i] && (
                    <Box>
                      <Typography variant="h3" color="textSecondary">
                        <b>{data.meanings[i]?.partOfSpeech}</b>
                      </Typography>
                      <br />
                      <Typography variant="h5">
                        <b>Definition</b>
                      </Typography>
                      {data.meanings[i].definitions.map((i, index) => (
                        <Box key={index}>
                          {i.definition.length > 1 &&
                            !i.definition.includes('http') && (
                              <>
                                <br />
                                <Typography color="textSecondary">
                                  {i.definition}
                                </Typography>
                                {i.example && !i.example.includes('http') && (
                                  <Typography
                                    color="textSecondary"
                                    sx={{ ml: 1 }}
                                  >
                                    <i>
                                      <span
                                        dangerouslySetInnerHTML={{
                                          __html: i.example
                                            .split(/ |\s\s\s/g)
                                            .map(
                                              (str) =>
                                                `<li> ${str.trim()} </li>`
                                            )
                                            .join(' ')
                                            .split(' ')
                                            .map((word) =>
                                              word
                                                .toLowerCase()
                                                .startsWith(
                                                  data?.sourceUrls[0]?.replace(
                                                    'https://en.wiktionary.org/wiki/',
                                                    ''
                                                  )
                                                )
                                                ? `<b>${word}</b>`
                                                : word
                                                    .toLowerCase()
                                                    .startsWith(
                                                      data?.sourceUrls[1]?.replace(
                                                        'https://en.wiktionary.org/wiki/',
                                                        ''
                                                      )
                                                    )
                                                ? `<b>${word}</b>`
                                                : word
                                                    .toLowerCase()
                                                    .startsWith(
                                                      data?.sourceUrls[2]?.replace(
                                                        'https://en.wiktionary.org/wiki/',
                                                        ''
                                                      )
                                                    )
                                                ? `<b>${word}</b>`
                                                : word
                                                    .toLowerCase()
                                                    .startsWith(
                                                      data?.sourceUrls[3]?.replace(
                                                        'https://en.wiktionary.org/wiki/',
                                                        ''
                                                      )
                                                    )
                                                ? `<b>${word}</b>`
                                                : word
                                            )
                                            .join(' '),
                                        }}
                                      />
                                    </i>
                                  </Typography>
                                )}
                              </>
                            )}
                        </Box>
                      ))}
                      {data.meanings[i].synonyms.length > 0 && (
                        <>
                          <Box>
                            <br />
                            <Typography variant="h5">
                              <b>Synonyms</b>
                            </Typography>
                            <br />
                            <Stack
                              direction="row"
                              sx={{ flexWrap: 'wrap', gap: 1 }}
                            >
                              {[...new Set(data.meanings[i].synonyms)]
                                .filter((i) => i.constructor.name === 'String')
                                .map((i, index) => (
                                  <Box key={index}>
                                    <Chip
                                      // variant="outlined"
                                      color="info"
                                      label={i}
                                      sx={{
                                        backgroundColor: blue[700],
                                      }}
                                      onClick={() => {
                                        axios
                                          .get(`${urlDictionary}/${i}`)
                                          .then((response) => {
                                            window.scrollTo({
                                              top: 0,
                                              behavior: 'smooth',
                                            })
                                            setTab(0)
                                            setData(response.data[0])

                                            let url = `${urlAudio}/${i}--_gb_1.mp3`
                                            let audio = new Audio(url)
                                            audio.volume = 0.3
                                            audio.play()
                                            setAudioWord(url)
                                          })
                                          .catch((error) => {
                                            setOpenNoData(true)
                                          })
                                        setSearchWord('')
                                      }}
                                    />
                                  </Box>
                                ))}
                            </Stack>
                          </Box>
                        </>
                      )}
                      {data.meanings[i].antonyms.length > 0 && (
                        <Box>
                          <br />
                          <Typography variant="h5">
                            <b>Antonyms</b>
                          </Typography>
                          <br />
                          <Stack
                            direction="row"
                            sx={{ flexWrap: 'wrap', gap: 1 }}
                          >
                            {[...new Set(data.meanings[i].antonyms)].map(
                              (i, index) => (
                                <Box key={index}>
                                  <Chip
                                    // variant="outlined"
                                    color="error"
                                    label={i}
                                    sx={{
                                      backgroundColor: red[700],
                                    }}
                                    onClick={() => {
                                      axios
                                        .get(`${urlDictionary}/${i}`)
                                        .then((response) => {
                                          window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth',
                                          })
                                          setTab(0)
                                          setData(response.data[0])

                                          let url = `${urlAudio}/${i}--_gb_1.mp3`
                                          let audio = new Audio(url)
                                          audio.volume = 0.3
                                          audio.play()
                                          setAudioWord(url)
                                        })
                                        .catch((error) => {
                                          setOpenNoData(true)
                                        })
                                      setSearchWord('')
                                    }}
                                  />
                                </Box>
                              )
                            )}
                          </Stack>
                        </Box>
                      )}
                    </Box>
                  )}
                </TabPanel>
              ))}
            </Box>
            <>
              <br />
              <Divider>
                <Typography variant="h3" sx={{ textAlign: 'center' }}>
                  <Badge
                    badgeContent={favs?.words?.length}
                    color="secondary"
                    max={99}
                  >
                    <b>Favourites</b>
                  </Badge>
                </Typography>
              </Divider>
              <br />
            </>
            {favs?.words?.length > 0 ? (
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
                      <TransitionGroup>
                        {favsLength.map((index) => (
                          <Collapse key={index}>
                            <ListItem
                              secondaryAction={
                                <IconButton
                                  onClick={() => {
                                    setFavs({
                                      words: favs.words.filter(
                                        (item) => item !== favs.words[index]
                                      ),
                                      phonetics: favs.phonetics.filter(
                                        (item) => item !== favs.phonetics[index]
                                      ),
                                      audios: favs.audios.filter(
                                        (item) => item !== favs.audios[index]
                                      ),
                                    })
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
                                  favs.audios[index]
                                    ? () => {
                                        let audio = new Audio(
                                          favs.audios[index]
                                        )
                                        audio.volume = 0.3
                                        audio.play()
                                      }
                                    : handleClickNoAudio
                                }
                              >
                                <ListItemAvatar>
                                  <IconButton
                                    onClick={() => {
                                      window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth',
                                      })
                                      axios
                                        .get(
                                          `${urlDictionary}/${favs.words[index]}`
                                        )
                                        .then((response) => {
                                          setTab(0)
                                          setData(response.data[0])

                                          let url = `${urlAudio}/${favs.words[index]}--_gb_1.mp3`
                                          setAudioWord(url)
                                        })
                                        .catch((error) => {
                                          setOpenNoData(true)
                                        })
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
                                    <Typography
                                      variant="h4"
                                      color="textPrimary"
                                    >
                                      {favs.words[index].length > 16 ? (
                                        <b>
                                          {favs.words[index].substr(-150, 13) +
                                            '…'}
                                        </b>
                                      ) : (
                                        <b>{favs.words[index]}</b>
                                      )}
                                    </Typography>
                                  }
                                  secondary={
                                    <Typography
                                      variant="p"
                                      color="textSecondary"
                                    >
                                      {favs.phonetics[index]
                                        ? '[ ' + favs.phonetics[index] + ' ]'
                                        : '[ - ]'}
                                    </Typography>
                                  }
                                />
                              </ListItemButton>
                            </ListItem>
                          </Collapse>
                        ))}
                      </TransitionGroup>
                    </List>
                  </Box>
                  <Box sx={({ flexGrow: 1 }, { textAlign: 'right' })}>
                    <br />
                    <ThemeButton
                      variant="outlined"
                      endIcon={<ClearAllIcon style={{ fontSize: 30 }} />}
                      onClick={clearAllFavs}
                    >
                      Clear All
                    </ThemeButton>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}></Grid>
              </Grid>
            ) : (
              <>
                <Typography
                  variant="h4"
                  sx={{ textAlign: 'center' }}
                  color="textSecondary"
                >
                  <br />
                  <b>No favourite words yet 😞</b>
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ textAlign: 'center' }}
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
                  draggable={false}
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
                draggable={false}
              />
            </Box>
          </>
        )}
        <Snackbar
          open={openAddFav}
          autoHideDuration={3000}
          onClose={handleCloseAddFav}
        >
          <Alert
            onClose={handleCloseAddFav}
            severity="success"
            sx={{ width: '100%' }}
          >
            Added to Favourites!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  )
}
