import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button, Box, Text } from 'grommet'

import { fetchDrinks, setSearchResults } from '../../store/search'
import IngredientSelectField from './IngredientsSelectField'

const IngredientsSearchForm = () => {
  const [ingredient, setIngredient] = useState([]);
  const ingredientsPreview = ingredient.join(" or ")
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const results = await fetchDrinks(ingredient, "ingredients/type/search/drinks")
    dispatch(setSearchResults(results, true))
    setIngredient([])
  }

  return (
    <Box width="medium" background="#362725B3" margin={{ vertical: "small" }} round="5px" pad="small" >
      <Box>
        <Text>
          find drinks that include...
        </Text>
        {ingredientsPreview && (
          <Text>{ingredientsPreview}</Text>
        )}
      </Box>
      <Form onSubmit={handleSubmit}>
        <IngredientSelectField ingredient={ingredient} setIngredient={setIngredient} />
        <Button
          fill
          plain={false}
          type="submit" >
          Find Drinks
        </Button>
      </Form>
    </Box>
  )
}

export default IngredientsSearchForm