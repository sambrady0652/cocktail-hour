import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Select, Button } from 'grommet'

import { fetchDrinks, setSearchResults } from '../../store/search'

const IngredientsSearchForm = () => {
  const [ingredient, setIngredient] = useState('whiskey');
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const results = await fetchDrinks(ingredient, "ingredients/search/results")
    dispatch(setSearchResults(results, true))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Select
<<<<<<< HEAD
        options={["Absinthe", "Brandy", "Gin", "Rum", "Tequila", "Vodka", "Whiskey"]}
=======
        options={["whiskey", "gin"]}
>>>>>>> 3e9e9011e96319dd711498ad816d2f9a14cb06a5
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