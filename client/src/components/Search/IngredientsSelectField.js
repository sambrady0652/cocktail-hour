import React, { useEffect, useState } from 'react'
import { Select, CheckBoxGroup, Button, Box } from 'grommet'

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

  const handleReset = () => {
    setType("")
    setIngredient([])
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
          <Box margin="small">
            <Button
              onClick={handleReset}
              plain >
              Reset Search
            </Button>
          </Box>
        </Box>
      )}

    </>
  )
}

export default IngredientsSelectField