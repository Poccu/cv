import { React, useState } from 'react'
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
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined'
import TranslateIcon from '@mui/icons-material/Translate'
import { styled, alpha } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import { Link as RouterLink } from 'react-router-dom'
import Divider from '@mui/material/Divider'

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 6,
    // border: '1px solid',
    // borderColor: theme.palette.divider,
    marginTop: theme.spacing(3),
    minWidth: 180,
    color: theme.palette.text.primary,
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.35) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 24,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}))

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
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <header>
      <AppBar
        position="fixed"
        color="primary"
        elevation={0}
        sx={{ boxShadow: 7, display: { xs: 'block', md: 'none' } }}
      >
        <Container maxwidth="sm">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <MenuIcon style={{ fontSize: 30 }} />
              </IconButton>
              <StyledMenu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem component={RouterLink} to="/cv" onClick={handleClose}>
                  <CottageOutlinedIcon />
                  <ListItemText>Home</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem
                  component={RouterLink}
                  to="/weather"
                  onClick={handleClose}
                >
                  <NightsStayOutlinedIcon />
                  <ListItemText>Weather</ListItemText>
                </MenuItem>
                <MenuItem
                  component={RouterLink}
                  to="/dictionary"
                  onClick={handleClose}
                >
                  <TranslateIcon />
                  <ListItemText>Dictionary</ListItemText>
                </MenuItem>
                <MenuItem
                  component={RouterLink}
                  to="/exchange"
                  onClick={handleClose}
                >
                  <CurrencyExchangeIcon />
                  <ListItemText>Exchange</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem
                  component={RouterLink}
                  to="/404"
                  onClick={handleClose}
                >
                  <WarningAmberIcon />
                  <ListItemText>404</ListItemText>
                </MenuItem>
                {/* <MenuItem
                  component={RouterLink}
                  to="/cut"
                  onClick={handleClose}
                >
                  <CurrencyExchangeIcon />
                  <ListItemText>Cut</ListItemText>
                  <Typography variant="inherit" color="text.secondary">
                    ???X
                  </Typography>
                </MenuItem> */}
              </StyledMenu>
            </Box>
            <Box sx={{ mr: -1 }}>
              <Socials />
              {/* <NavLink to="/cv">
                <IconButton edge="start" to="/cv">
                  <Avatar
                    alt="Avatar"
                    src="/assets/images/logo7.png"
                    src={`${process.env.PUBLIC_URL}/assets/images/logo7.png`}
                    sx={{ width: 50, height: 50 }}
                  />
                </IconButton>
              </NavLink> */}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <AppBar
        position="fixed"
        color="primary"
        elevation={0}
        sx={{ boxShadow: 7, display: { xs: 'none', md: 'block' } }}
      >
        <Container maxwidth="sm">
          <Toolbar>
            <NavLink to="/cv">
              <IconButton edge="start">
                <Avatar
                  alt="Avatar"
                  src={`${process.env.PUBLIC_URL}/assets/images/logo7.png`}
                  sx={{ width: 50, height: 50 }}
                />
              </IconButton>
            </NavLink>
            <Box sx={{ flexGrow: 1 }}>
              <Stack direction="row" spacing={1}>
                <NavLink
                  to="/cv"
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
                    startIcon={
                      <NightsStayOutlinedIcon style={{ fontSize: 24 }} />
                    }
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
                <NavLink to="/exchange" style={{ textDecoration: 'none' }}>
                  <ThemeButton
                    startIcon={
                      <CurrencyExchangeIcon style={{ fontSize: 24 }} />
                    }
                  >
                    Exchange
                  </ThemeButton>
                </NavLink>
                <NavLink to="/404" style={{ textDecoration: 'none' }}>
                  <ThemeButton
                    startIcon={<WarningAmberIcon style={{ fontSize: 24 }} />}
                  >
                    404
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
