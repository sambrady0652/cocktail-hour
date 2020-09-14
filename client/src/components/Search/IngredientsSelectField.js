import React, { useEffect, useState } from 'react'
import { Select, CheckBoxGroup } from 'grommet'

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

  const handleIngredientChoice = async ({ value: nextValue }) => {
    setIngredient(nextValue)
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
        <CheckBoxGroup
          options={ingredientOptions}
          // value={ingredient}
          onChange={handleIngredientChoice}
        />

      )}
    </>
  )
}

export default IngredientsSelectField