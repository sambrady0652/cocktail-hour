import React, { useEffect, useState } from 'react'
import { Select, CheckBoxGroup, Text, Box } from 'grommet'

import { fetchIngredientTypes, fetchIngredients } from '../../store/search'

const IngredientsSelectField = (props) => {
  const { setIngredient } = props
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
    const ingredientsList = await fetchIngredients(option, "ingredients/type/search")
    setIngredientOptions(ingredientsList)
  }

  const handleIngredientChoice = async ({ value: nextValue }) => {
    setIngredient(nextValue)
  }

  return (
    <>
      <Box pad="small">
        <Select
          placeholder="ingredient types"
          options={typeOptions}
          value={type}
          onChange={handleTypeChoice}
        />
      </Box>

      {type && (
        <Box pad="small">
          <CheckBoxGroup
            options={ingredientOptions}
            onChange={handleIngredientChoice}
          />
        </Box>

      )}
    </>
  )
}

export default IngredientsSelectField