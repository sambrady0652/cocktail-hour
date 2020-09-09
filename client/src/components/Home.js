import React from 'react'
import { Box } from 'grommet'

import Navbar from './Navigation/Navbar'

const Home = () => {
  return (
    <Box fill style={{ position: "absolute" }} background="url(https://cocktail-hour-user-photos.s3.us-east-2.amazonaws.com/scope1.jpg)">
      <Navbar />
    </Box>
  )
}

export default Home