import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { Box } from 'grommet'

import SearchResultCard from './SearchResultCard'

const SearchResults = () => {
  const { results, redirect } = useSelector(state => state.search)
  if (!redirect) {
    return <Redirect to="/" />
  }
  return (
    <>
      <Box overflow="scroll">
        <div>Search Results</div>
        {results.map(drink => <SearchResultCard drink={drink} key={drink.id} />)}

      </Box>
      <Box align="center">
        <div>Try Ingredients Search!</div>
      </Box>
    </>
  )
}

export default SearchResults