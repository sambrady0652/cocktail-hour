import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { Box } from 'grommet'

import DrinkCard from './DrinkCard'
import IngredientsSearchForm from './IngredientsSearchForm'

const SearchResults = () => {
  const { results, redirect } = useSelector(state => state.search)
  if (!redirect) {
    return <Redirect to="/" />
  }
  return (
    <Box direction="row" align="start" justify="center" overflow="scroll" gap="xlarge" style={{ position: "relative", padding: "0px", margin: "0px", background: "none", backgroundColor: "transparent" }}>
      {results && (
        <Box>
          {results.map(drink => <DrinkCard drink={drink} key={drink.id} />)}
        </Box>
      )}
      <IngredientsSearchForm />
    </Box>
  )
}

export default SearchResults