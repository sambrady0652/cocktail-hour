import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { Box } from 'grommet'

import SearchResultCard from './SearchResultCard'

const SearchResults = () => {
  const { results, redirect } = useSelector(state => state.search)
  console.log(results)
  if (!redirect) {
    return <Redirect to="/" />
  }
  return (

    <Box overflow="scroll" justify="center">
      <div>Search Results</div>
      {results.map(drink => <SearchResultCard drink={drink} key={drink.id} />)}

    </Box>
  )
}

export default SearchResults