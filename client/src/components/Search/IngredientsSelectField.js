import React, { useEffect, useState } from 'react'
import { FormField, Select } from 'grommet'

import { fetchIngredientTypes, fetchIngredients } from '../../store/search'

const IngredientsSelectField = (props) => {
  const { ingredient, setIngredient } = props
  const [typeOptions, setTypeOptions] = useState([])
  const [type, setType] = useState("")
  const [ingredientOptions, setIngredientOptions] = useState([])

  useEffect(() => {
    const dataFetch = async () => {
      const types = await fetchIngredientTypes()
      setTypeOptions(types)
    }
    dataFetch()
  }, [])

  const handleTypeChoice = async ({ option }) => {
    setType(option)
    const ingredientsList = await fetchIngredients(option)
    setIngredientOptions(ingredientsList)
  }
  return (
    <>

      <Select
        placeholder="ingredient types"
        options={typeOptions}
        value={type}
        onChange={handleTypeChoice}
      />

      {type && (
        <Select
          options={ingredientOptions}
          value={ingredient}
          onChange={({ option }) => setIngredient(option)}
        />

      )}
    </>
  )
}

export default IngredientsSelectField