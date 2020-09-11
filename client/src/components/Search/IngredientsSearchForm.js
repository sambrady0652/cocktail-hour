import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Select, Button } from 'grommet'

import { fetchDrinks, setSearchResults } from '../../store/search'

const IngredientsSearchForm = () => {
  const [ingredient, setIngredient] = useState('Whiskey');
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const results = await fetchDrinks(ingredient, "ingredients/search/results")
    dispatch(setSearchResults(results, true))
  }

  return (
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
  )
}

export default IngredientsSearchForm