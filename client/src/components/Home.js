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
    <Box direction="row" align="center" justify="around" >
      <Box background="#832023">
        <Text>HOME CONTENT</Text>
      </Box>
      <Box background="#832023">
        <Text>Pick your favorite liquor</Text>
        <Text>Let's find a drink with it!</Text>
        <IngredientsSearchForm />
      </Box>
    </Box>
  );
}

export default Home