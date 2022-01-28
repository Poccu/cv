import React from 'react'
import { Typography, Container, Box } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Socials from '../components/Socials'

function About() {
  return (
    <Box sx={{ m: 8 }}>
      <Container maxwidth="sm">
        <Typography
          variant="h1"
          component="h1"
          sx={({ flexGrow: 1 }, { textAlign: 'center' })}
        >
          About Page
        </Typography>

        <Box sx={{ textAlign: 'center' }}>
          <Avatar
            alt="Avatar"
            src="https://sun9-49.userapi.com/impf/c844616/v844616007/dc5e8/9nSWo2IzZ9U.jpg?size=1536x1536&quality=96&sign=8803d74ba305d51e2a87db500d3c2c21&type=album"
            sx={{ width: 400, height: 400 }}
          />
          {/* <img
          src="https://sun9-49.userapi.com/impf/c844616/v844616007/dc5e8/9nSWo2IzZ9U.jpg?size=1536x1536&quality=96&sign=8803d74ba305d51e2a87db500d3c2c21&type=album"
          alt="Avatar"
          width="400"
        /> */}
        </Box>
        <Typography>My name is Grigory</Typography>
        <Socials />
        <Typography>
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum. Why do we use it?
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like). Where
          does it come from? Contrary to popular belief, Lorem Ipsum is not
          simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard
          McClintock, a Latin professor at Hampden-Sydney College in Virginia,
          looked up one of the more obscure Latin words, consectetur, from a
          Lorem Ipsum passage, and going through the cites of the word in
          classical literature, discovered the undoubtable source. Lorem Ipsum
          comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
        </Typography>
      </Container>
    </Box>
  )
}

export default About
