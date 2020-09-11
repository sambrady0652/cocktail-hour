import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Select, Button, Box, Text } from 'grommet'

import { fetchDrinks, setSearchResults } from '../../store/search'

const IngredientsSearchForm = () => {
  const [ingredient, setIngredient] = useState('Brandy');
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const results = await fetchDrinks(ingredient, "ingredients/type/search/results")
    dispatch(setSearchResults(results, true))
  }

  return (
    <Box>


      <Text>Pick your favorite liquor</Text>
      <Text>Let's find a drink with it!</Text>
      <Form onSubmit={handleSubmit}>
        <Select
          options={["Absinthe", "Brandy", "Gin", "Rum", "Tequila", "Vodka", "Whiskey"]}
          value={ingredient}
          onChange={({ option }) => setIngredient(option)}
        />
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