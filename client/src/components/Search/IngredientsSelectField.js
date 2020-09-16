import React, { useEffect, useState } from 'react'
import { Select, CheckBoxGroup, Text } from 'grommet'

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

      <Select
        placeholder={<Text>ingredient types</Text>}
        options={typeOptions}
        value={type}
        onChange={handleTypeChoice}
      />

      {type && (
        <CheckBoxGroup
          options={ingredientOptions}
          onChange={handleIngredientChoice}
        />

      )}
    </>
  )
}

export default IngredientsSelectField