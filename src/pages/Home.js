import React from 'react'
import { Typography, Container, Box, Grid } from '@mui/material'
import Avatar from '@mui/material/Avatar'

export default function Home() {
  return (
    <Box sx={{ mt: 16 }}>
      <Container maxwidth="sm">
        <Box
          sx={{
            mt: 32,
            mb: 14,
            display: { xs: 'none', md: 'none', lg: 'block' },
          }}
        >
          <Grid
            container
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} md={8}>
              <Box>
                <Typography variant="h1" component="div">
                  <b>Hey there👋</b>
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
                  <b>And I'm a Frontend Developer</b>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Avatar
                alt="Avatar"
                src="https://sun9-49.userapi.com/impf/c844616/v844616007/dc5e8/9nSWo2IzZ9U.jpg?size=1536x1536&quality=96&sign=8803d74ba305d51e2a87db500d3c2c21&type=album"
                // sx={{ width: 470, height: 470 }}
                sx={{ width: '100%', height: '100%' }}
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 16, mb: 10, display: { lg: 'none' } }}>
          <Grid
            container
            spacing={5}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} md={12}>
              <Box>
                <Box>
                  <Typography variant="h1" component="div" align="center">
                    <b>Hey there👋</b>
                  </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h2" component="div" align="center">
                    My name is Grigory Chemeris
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Avatar
                alt="Avatar"
                src="https://sun9-49.userapi.com/impf/c844616/v844616007/dc5e8/9nSWo2IzZ9U.jpg?size=1536x1536&quality=96&sign=8803d74ba305d51e2a87db500d3c2c21&type=album"
                sx={{ width: 240, height: 240 }}
                // sx={{ width: '100%', height: '100%' }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <Box sx={{ mt: 5 }}>
              <Box>
                <Typography variant="h3" component="div" align="center">
                  <b>And I'm a Frontend Developer</b>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
