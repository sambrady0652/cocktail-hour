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
    <Box direction="row" align="start" justify="around" overflow="scroll" gap="small">
      <Box>
        {results.map(drink => <DrinkCard drink={drink} key={drink.id} />)}
      </Box>
      <Box background="#832023" round="small">
        <IngredientsSearchForm />
      </Box>
    </Box>
  )
}

export default SearchResults