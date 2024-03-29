import { useState, useEffect, Suspense } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Loading from './components/Loading'
import Weather from './pages/Weather'
import Home from './pages/Home'
import Dictionary from './pages/Dictionary'
import Exchange from './pages/Exchange'
import Password from './pages/Password'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import CssBaseline from '@mui/material/CssBaseline'
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import { IconButton, Box } from '@mui/material'
import { grey, red } from '@mui/material/colors'

let themeLight = createTheme({
  palette: {
    primary: {
      main: grey[50],
    },
    secondary: {
      main: red[700],
    },
    background: {
      default: grey[100],
    },
    text: {
      primary: '#000000',
      secondary: grey[600],
    },
    search: {
      primary: '#000000',
    },
    button: {
      primary: '#000000',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: '0.9rem',
            // backgroundColor: grey[600],
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#333333',
            minHeight: 24,
            border: '3px solid #f5f5f5',
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus':
            {
              backgroundColor: grey[600],
            },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
            {
              backgroundColor: grey[600],
            },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
            {
              backgroundColor: grey[600],
            },
        },
      },
    },
  },
})
themeLight = responsiveFontSizes(themeLight)

let themeDark = createTheme({
  palette: {
    primary: {
      main: '#191919',
    },
    secondary: {
      main: red[500],
    },
    background: {
      default: '#121212',
    },
    text: {
      primary: grey[50],
      secondary: grey[500],
    },
    search: {
      primary: grey[50],
    },
    button: {
      primary: grey[50],
    },
    divider: grey[800],
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: '0.9rem',
            // backgroundColor: '#921212',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#cccccc',
            minHeight: 24,
            border: '3px solid #121212',
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus':
            {
              backgroundColor: grey[600],
            },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
            {
              backgroundColor: grey[600],
            },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
            {
              backgroundColor: grey[600],
            },
        },
      },
    },
  },
})
themeDark = responsiveFontSizes(themeDark)

const style = {
  position: 'fixed',
  bottom: '47%',
  left: 0,
}

export default function App() {
  const [celsius, setCelsius] = useState(true) // set celsius/fahrenheit temperature
  const [light, setLight] = useState(false) // set light/dark theme

  // localStorage
  useEffect(() => {
    setLight(JSON.parse(localStorage.getItem('light')))
    setCelsius(JSON.parse(localStorage.getItem('celsius')))
  }, [])

  useEffect(() => {
    if (celsius !== null) {
      localStorage.setItem('celsius', JSON.stringify(celsius))
    }
  }, [celsius])

  useEffect(() => {
    if (light !== null) {
      localStorage.setItem('light', JSON.stringify(light))
    }
  }, [light])

  return (
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <CssBaseline />
      <Router>
        <Suspense fallback={<Loading />}>
          <ScrollToTop />
          <Routes>
            <Route
              path="/cv"
              element={
                <>
                  <Header />
                  <main>
                    <Home />
                  </main>
                </>
              }
            />
            <Route
              path="/weather"
              element={
                <>
                  <Header />
                  <main>
                    <Weather celsius={celsius} />
                  </main>
                </>
              }
            />
            <Route
              path="/dictionary"
              element={
                <>
                  <Header />
                  <main>
                    <Dictionary />
                  </main>
                </>
              }
            />
            <Route
              path="/exchange"
              element={
                <>
                  <Header />
                  <main>
                    <Exchange />
                  </main>
                </>
              }
            />
            <Route
              path="/password"
              element={
                <>
                  <Header />
                  <main>
                    <Password />
                  </main>
                </>
              }
            />
            <Route
              path="/settings"
              element={
                <>
                  <Header />
                  <main>
                    <Settings
                      light={light}
                      setLight={setLight}
                      celsius={celsius}
                      setCelsius={setCelsius}
                    />
                  </main>
                </>
              }
            />
            <Route
              path="*"
              element={
                <main>
                  <NotFound />
                </main>
              }
            />
          </Routes>
          <Box style={style} sx={{ display: { xs: 'none', md: 'block' } }}>
            {!light ? (
              <IconButton
                onClick={() => setLight((prev) => !prev)}
                color="inherit"
                size="large"
                title="Change to Light Mode"
              >
                <LightModeOutlinedIcon fontSize="inherit" />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => setLight((prev) => !prev)}
                color="inherit"
                size="large"
                title="Change to Dark Mode"
              >
                <DarkModeOutlinedIcon fontSize="inherit" />
              </IconButton>
            )}
          </Box>
          <Footer />
        </Suspense>
      </Router>
    </ThemeProvider>
  )
}
