import React from 'react'
import { IconButton, Box } from '@mui/material'
import Stack from '@mui/material/Stack'
import TelegramIcon from '@mui/icons-material/Telegram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'

export default function Socials() {
  return (
    <Box>
      <Stack direction="row" spacing={1}>
        <IconButton
          aria-label="telegram"
          target="_blank"
          href="https://t.me/mordoboy"
          rel="noreferrer"
        >
          <TelegramIcon />
        </IconButton>
        <IconButton
          aria-label="linkedin"
          target="_blank"
          href="https://www.linkedin.com/in/poccu/"
          rel="noreferrer"
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          aria-label="github"
          target="_blank"
          href="https://github.com/Poccu"
          rel="noreferrer"
        >
          <GitHubIcon />
        </IconButton>
      </Stack>
    </Box>
  )
}
