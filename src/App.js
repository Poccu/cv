import React, { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
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
      secondary: '#595959',
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
      secondary: '#c1c1c1',
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
  const [light, setLight] = useState(false)

  return (
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <CssBaseline />
      <Router>
        {/* {window.location.pathname === '/404' ? null : <Header />} */}
        <main>
          <ScrollToTop />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Home />
                </>
              }
            />
            <Route
              path="/weather"
              element={
                <>
                  <Header />
                  <Weather />
                </>
              }
            />
            <Route
              path="/dictionary"
              element={
                <>
                  <Header />
                  <Dictionary />
                </>
              }
            />
            <Route
              path="/exchange"
              element={
                <>
                  <Header />
                  <Exchange />
                </>
              }
            />
            <Route path="*" element={<NotFound />} />
            {/* <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate replace to="/404" />} /> */}
          </Routes>
        </main>
        <Footer />
      </Router>
      <Box style={style}>
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
    </ThemeProvider>
  )
}
