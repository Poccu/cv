import React, { useState, useEffect, Suspense, lazy } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Loading from './components/Loading'
import Weather from './pages/Weather'
import Home from './pages/Home'
import Dictionary from './pages/Dictionary'
import Exchange from './pages/Exchange'
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

// const Home = lazy(() => import('./pages/Home'))

// const Home = lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(import('./pages/Home')), 500)
//   })
// })

// const Dictionary = lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(import('./pages/Dictionary')), 500)
//   })
// })

// const Weather = lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(import('./pages/Weather')), 500)
//   })
// })

// const Exchange = lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(import('./pages/Exchange')), 500)
//   })
// })

// const NotFound = lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(import('./pages/NotFound')), 500)
//   })
// })

let themeLight = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#d32f2f',
    },
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: '#000000',
      // secondary: '#595959',
      secondary: '#858585',
    },
    search: {
      primary: '#000000',
    },
    button: {
      primary: '#000000',
    },
    // divider: '#393939',
  },
})
themeLight = responsiveFontSizes(themeLight)

let themeDark = createTheme({
  palette: {
    primary: {
      main: '#191919',
    },
    secondary: {
      main: '#f44336',
    },
    background: {
      default: '#121212',
    },
    text: {
      primary: '#ffffff',
      // secondary: '#c1c1c1',
      secondary: '#858585',
    },
    search: {
      primary: '#ffffff',
    },
    button: {
      primary: '#ffffff',
    },
    divider: '#393939',
  },
})
themeDark = responsiveFontSizes(themeDark)

const style = {
  position: 'fixed',
  // paddingTop: '15px',
  bottom: '47%',
  left: 0,
}

export default function App() {
  const [light, setLight] = useState(false) // set light/dark theme

  // localStorage
  useEffect(() => {
    setLight(JSON.parse(window.localStorage.getItem('light')))
  }, [])

  useEffect(() => {
    window.localStorage.setItem('light', JSON.stringify(light))
  }, [light])

  return (
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <CssBaseline />
      <Router>
        <Suspense fallback={<Loading />}>
          {/* {window.location.pathname === '/404' ? null : <Header />} */}

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
                    <Weather />
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
              path="*"
              element={
                <main>
                  <NotFound />
                </main>
              }
            />
            {/* <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate replace to="/404" />} /> */}
          </Routes>
          <Box
            style={style}
            // sx={{
            //   display: { xs: 'none', md: 'none', lg: 'block' },
            // }}
          >
            {light ? (
              <IconButton
                onClick={() => setLight((prev) => !prev)}
                color="inherit"
                size="large"
                title="Dark Mode"
              >
                <DarkModeOutlinedIcon fontSize="inherit" />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => setLight((prev) => !prev)}
                color="inherit"
                size="large"
                title="Light Mode"
              >
                <LightModeOutlinedIcon fontSize="inherit" />
              </IconButton>
            )}
          </Box>
          <Footer />
        </Suspense>
      </Router>
    </ThemeProvider>
  )
}
