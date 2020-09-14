import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { Box, Text } from 'grommet'

import IngredientsSearchForm from './Search/IngredientsSearchForm'

const Home = () => {
  const { redirect } = useSelector(state => state.search)
  if (redirect) {
    return <Redirect to="/search_results" />
  }

  return (
    <Box direction="row" align="start" justify="center" overflow="scroll" gap="xlarge" style={{ position: "relative" }}>
      <Box width="large" background="#362725B3" height="medium" margin={{ vertical: "small" }} round="5px">
        <Text>HOME CONTENT</Text>
      </Box>

      <IngredientsSearchForm />


    </Box>
  );
}

export default Home