import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { Box, Text } from 'grommet'

import DrinkCard from './DrinkCard'
import IngredientsSearchForm from './IngredientsSearchForm'

const SearchResults = () => {
  const { results, redirect } = useSelector(state => state.search)
  if (!redirect) {
    return <Redirect to="/" />
  }
  return (
    <Box direction="row" align="start" justify="center" overflow="scroll" gap="xlarge" style={{ position: "relative" }}>
      {results !== [] ?
        (
          <Box>
            {results.map(drink => <DrinkCard drink={drink} key={drink.id} />)}
          </Box>
        )
        :
        (
          <Box width="large" background="#362725B3" height="medium" margin={{ vertical: "small" }} round="5px">
            <Text>NO RESULTS</Text>
          </Box>
        )
      }
      <IngredientsSearchForm />
    </Box>
  )
}

export default SearchResults