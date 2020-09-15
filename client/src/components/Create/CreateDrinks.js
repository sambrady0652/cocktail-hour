import React, { useState } from 'react'
import { Box, Button, Form, FormField, Text, CheckBox } from 'grommet'
import { Add } from 'grommet-icons'

import { createDrink } from '../../store/search'


const CreateDrinks = () => {
  const [drinkName, setDrinkName] = useState("")
  const [instructions, setInstructions] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [alcoholic, setAlcoholic] = useState(false)
  const [measurement, setMeasurement] = useState("")
  const [ingredient, setIngredient] = useState("")
  const [measurements, setMeasurements] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [measuredIngredients, setMeasuredIngredients] = useState([])

  const addPair = () => {
    setMeasurements([...measurements, measurement])
    setIngredients([...ingredients, ingredient])
    setMeasuredIngredients([...measuredIngredients, [measurement, ingredient]])
    setMeasurement("")
    setIngredient("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createDrink(drinkName, ingredients, measurements, instructions, alcoholic, imageUrl)
  }

  return (
    <Box direction="row" align="start" justify="center" overflow="scroll" gap="xlarge" style={{ position: "relative" }}>
      <Box background="#362725B3" height="medium" margin={{ vertical: "small" }} round="5px" gap="small" align="center">
        <Text>Share your favorite drink with us!</Text>
        <Form onSubmit={handleSubmit}>
          <FormField
            placeholder={<Text>Your drink's name</Text>}
            name="name"
            type="text"
            value={drinkName}
            onChange={e => setDrinkName(e.target.value)} />
          <Box pad="small">
            {measuredIngredients.map(m => <Text size="small" key={`${m[1]}${m[0]}`}>{m[0]} {m[1]}</Text>)}
          </Box>

          <Box direction="row">
            <Box>
              <FormField
                placeholder='"1/2 oz"'
                name="measurements"
                type="text"
                value={measurement}
                onChange={e => setMeasurement(e.target.value)} />
            </Box>
            <Box>
              <FormField
                placeholder='"bourbon"'
                name="ingredients"
                type="text"
                value={ingredient}
                onChange={e => setIngredient(e.target.value)} />
            </Box>
            <Button onClick={addPair} icon={<Add color="#FDCF89" />} />
          </Box>
          <FormField
            placeholder="Instructions to make your drink"
            name="instructions"
            type="text"
            value={instructions}
            onChange={e => setInstructions(e.target.value)} />
          <Box margin="small">
            <input
              name="imageUrl"
              type="file"
              label="Drink Image"
              onChange={e => setImageUrl(e.target.files.item(0))} />
          </Box>
          <CheckBox
            checked={alcoholic}
            label="contains alcohol?"
            onChange={(e) => setAlcoholic(e.target.checked)} />
          <Button type="submit" >Create Drink</Button>
        </Form>
      </Box>
    </Box>
  )
}

export default CreateDrinks