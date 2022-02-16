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
import { styled, alpha } from '@mui/material/styles'

const ThemeButton = styled(Button)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.button.primary,
  borderRadius: 25,
  height: 44,
  padding: '0 16px',
  // border: '2px solid',
  // borderColor: alpha(theme.palette.search.primary, 0.1),
  // backgroundColor: alpha(theme.palette.search.primary, 0.1),
  // '&:hover': {
  //   backgroundColor: alpha(theme.palette.search.primary, 0.1),
  // },
  // '&:active': {
  //   backgroundColor: '#0062cc',
  // },
}))

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
              <IconButton edge="start" to="/">
                <Avatar
                  alt="Avatar"
                  src="/logo7.png"
                  sx={{ width: 50, height: 50 }}
                />
              </IconButton>
            </NavLink>
            <Box sx={{ flexGrow: 1 }}>
              <Stack direction="row" spacing={1}>
                <NavLink
                  to="/"
                  style={{ textDecoration: 'none', color: '#fff' }}
                >
                  <ThemeButton
                    startIcon={<CottageOutlinedIcon style={{ fontSize: 24 }} />}
                  >
                    Home
                  </ThemeButton>
                </NavLink>
                <NavLink to="/weather" style={{ textDecoration: 'none' }}>
                  <ThemeButton
                    startIcon={<WbSunnyOutlinedIcon style={{ fontSize: 24 }} />}
                  >
                    Weather
                  </ThemeButton>
                </NavLink>
                <NavLink to="/dictionary" style={{ textDecoration: 'none' }}>
                  <ThemeButton
                    startIcon={<TranslateIcon style={{ fontSize: 24 }} />}
                  >
                    Dictionary
                  </ThemeButton>
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
