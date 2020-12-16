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
    <Box direction="row" align="start" justify="center" gap="xlarge" style={{ position: "relative" }}>
      <IngredientSearchForm />
    </Box>
  )
}

export default SearchPage