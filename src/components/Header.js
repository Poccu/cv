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

const style = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 5,
  border: 0,
  color: 'white',
  height: 38,
  padding: '0 24px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
}

export default function Header() {
  return (
    <header>
      <AppBar
        style={{ backgroundColor: 'white' }}
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{ boxShadow: 9 }}
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
                  <Button style={style}>Home</Button>
                </NavLink>
                <NavLink to="/about" style={{ textDecoration: 'none' }}>
                  <Button style={style}>About</Button>
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
