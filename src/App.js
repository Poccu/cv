import React, { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Weather from './pages/Weather'
import Home from './pages/Home'
import Dictionary from './pages/Dictionary'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import { IconButton, Box } from '@mui/material'

const themeLight = createTheme({
  palette: {
    background: {
      default: '#eeeeee',
    },
  },
})

const themeDark = createTheme({
  palette: {
    background: {
      default: '#191919',
    },
    text: {
      primary: '#ffffff',
    },
  },
})

const style = {
  position: 'absolute',
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
        <Header />
        <main>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/dictionary" element={<Dictionary />} />
          </Routes>
        </main>
        <Footer />
      </Router>
      <Box style={style}>
        <IconButton
          onClick={() => setLight((prev) => !prev)}
          color="inherit"
          size="large"
        >
          {light ? (
            <DarkModeOutlinedIcon fontSize="inherit" />
          ) : (
            <LightModeOutlinedIcon fontSize="inherit" />
          )}
        </IconButton>
      </Box>
    </ThemeProvider>
  )
}
