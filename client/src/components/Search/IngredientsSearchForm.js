import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button, Box, Text } from 'grommet'

import { fetchDrinks, setSearchResults } from '../../store/search'
import IngredientSelectField from './IngredientsSelectField'

const IngredientsSearchForm = () => {
  const [ingredient, setIngredient] = useState([]);
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("SEARCHED", ingredient)
    const results = await fetchDrinks(ingredient, "ingredients/type/search/results")
    dispatch(setSearchResults(results, true))
  }

  return (
    <Box width="small" background="#362725B3" margin={{ vertical: "small" }} round="5px" >
      <Text>Got something lying around?</Text>
      <Text>Let's find a drink with it!</Text>
      <Form onSubmit={handleSubmit}>
        <IngredientSelectField ingredient={ingredient} setIngredient={setIngredient} />
        <Button
          plain
          hoverIndicator={{ color: "#362725B3", opacity: "B3" }}
          type="submit" >
          Go!
        </Button>
      </Form>
    </Box>
  )
}

export default IngredientsSearchForm