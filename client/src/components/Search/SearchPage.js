import React from 'react';
import { Box } from 'grommet';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import IngredientSearchForm from './IngredientsSearchForm'

const SearchPage = () => {
  const { redirect } = useSelector(state => state.search)
  if (redirect) {
    return <Redirect to="/search_results" />
  }

  return (
    <Box direction="row" align="start" justify="center" overflow="scroll" gap="xlarge" style={{ position: "relative", padding: "0px", margin: "0px", background: "none", backgroundColor: "transparent" }}>
      <IngredientSearchForm />
    </Box>
  )
}

export default SearchPage