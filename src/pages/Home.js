import React from 'react'
import { Typography, Container, Box, Grid } from '@mui/material'
import Avatar from '@mui/material/Avatar'

export default function Home() {
  return (
    <Box sx={{ mt: 16 }}>
      <Container maxwidth="sm">
        <Box sx={{ mt: 26, mb: 10 }}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} md={7}>
              <Box>
                <Typography variant="h1" component="div">
                  Hello👋
                </Typography>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h2" component="div">
                  My name is
                </Typography>
              </Box>
              <Typography variant="h2" component="div">
                Grigory Chemeris
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Typography variant="h3" component="div">
                  And i'm a Frontend Developer
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md>
              <Avatar
                alt="Avatar"
                src="https://sun9-49.userapi.com/impf/c844616/v844616007/dc5e8/9nSWo2IzZ9U.jpg?size=1536x1536&quality=96&sign=8803d74ba305d51e2a87db500d3c2c21&type=album"
                sx={{ width: 470, height: 470 }}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
