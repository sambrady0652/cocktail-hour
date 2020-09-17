import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { Box } from 'grommet'


const Home = () => {
  const { redirect } = useSelector(state => state.search)
  if (redirect) {
    return <Redirect to="/search_results" />
  }

  return (
    <Box direction="row" align="start" justify="center" overflow="scroll" gap="xlarge" style={{ position: "relative", padding: "0px", margin: "0px" }}>
    </Box>
  );
}

export default Home