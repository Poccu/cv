import React from 'react'
import {
  AppBar,
  Container,
  Toolbar,
  IconButton,
  Button,
  Box,
} from '@mui/material'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import { NavLink } from 'react-router-dom'
import Socials from './Socials'
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined'
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined'
import TranslateIcon from '@mui/icons-material/Translate'

const style = {
  background: 'linear-gradient(45deg, #FE6B8B 10%, #FF8E53 90%)',
  borderRadius: 25,
  border: 0,
  color: 'white',
  height: 34,
  padding: '0 16px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
}

export default function Header() {
  return (
    <header>
      <AppBar
        // style={{ backgroundColor: '#212121' }}
        position="fixed"
        // color="transparent"
        color="primary"
        elevation={0}
        sx={{ boxShadow: 7 }}
        // enableColorOnDark
      >
        <Container fixed>
          <Toolbar>
            <NavLink to="/">
              <IconButton edge="start" color="inherit" to="/">
                <Avatar
                  alt="Avatar"
                  src="/logo7.png"
                  sx={{ width: 50, height: 50 }}
                />
              </IconButton>
            </NavLink>
            <Box sx={{ flexGrow: 1 }}>
              <Stack direction="row" spacing={3}>
                <NavLink to="/" style={{ textDecoration: 'none' }}>
                  <Button style={style} startIcon={<CottageOutlinedIcon />}>
                    Home
                  </Button>
                </NavLink>
                <NavLink to="/weather" style={{ textDecoration: 'none' }}>
                  <Button style={style} startIcon={<WbSunnyOutlinedIcon />}>
                    Weather
                  </Button>
                </NavLink>
                <NavLink to="/dictionary" style={{ textDecoration: 'none' }}>
                  <Button style={style} startIcon={<TranslateIcon />}>
                    Dictionary
                  </Button>
                </NavLink>
              </Stack>
            </Box>
            <Socials />
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  )
}
