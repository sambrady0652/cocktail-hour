import React, { useState } from 'react'
import { Box, Button, Form, Text, CheckBox, Heading, Image, Paragraph, TextInput, TextArea } from 'grommet'
import { Add } from 'grommet-icons'

import { createDrink, fetchIngredients } from '../../store/search'
import { useHistory } from 'react-router-dom'


const CreateDrinks = () => {
  const [drinkName, setDrinkName] = useState("")
  const [drinkNamePreview, setDrinkNamePreview] = useState("")
  const [instructions, setInstructions] = useState("")
  const [instructionsPreview, setInstructionsPreview] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [imageUrlPreview, setImageUrlPreview] = useState("")
  const [alcoholic, setAlcoholic] = useState(false)
  const [alcoholicPreview, setAlcoholicPreview] = useState("Non alcoholic")
  const [measurement, setMeasurement] = useState("")
  const [ingredient, setIngredient] = useState("")
  const [measurements, setMeasurements] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [measuredIngredients, setMeasuredIngredients] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const history = useHistory()

  const addPair = () => {
    setMeasurements([...measurements, measurement])
    setIngredients([...ingredients, ingredient])
    setMeasuredIngredients([...measuredIngredients, [measurement, ingredient]])
    setMeasurement("")
    setIngredient("")
  }

  const addName = () => {
    setDrinkNamePreview(drinkName)
  }
  const addInstructions = () => {
    setInstructionsPreview(instructions)
  }

  const getIngredientSuggestions = async (e) => {
    setIngredient(e.target.value)
    const suggestions = await fetchIngredients(e.target.value, "ingredients/suggestions")
    setSuggestions(suggestions.map(suggObj => suggObj.name))
  }

  const handleCheck = (e) => {
    setAlcoholic(e.target.checked)
    if (alcoholic === false) {
      setAlcoholicPreview("Alcoholic")
    }
    if (alcoholic === true) {
      setAlcoholicPreview("Non alcoholic")
    }
  }

  const handleImageChange = (e) => {
    setImageUrl(e.target.files.item(0))
    setImageUrlPreview(URL.createObjectURL(e.target.files.item(0)))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createDrink(drinkName, ingredients, measurements, instructions, alcoholic, imageUrl)
    history.push("/my_drinks")
  }

  return (
    <Box direction="row" align="start" justify="center" overflow="scroll" gap="xlarge" style={{ position: "relative" }}>
      {/* DRINK PREVIEW ELEMENT */}
      <Box>
        <Heading>Preview of your new drink</Heading>
        <Box width="large" background="#362725B3" height="medium" margin={{ vertical: "small" }} round="5px">
          <Box direction="row" round="small" fill="vertical">
            <Box width="medium">
              <Image
                fit="cover"
                src={imageUrlPreview || "https://cocktail-hour-site-images.s3.amazonaws.com/13598470Untitled-3-512.png"}
              />
            </Box>
            <Box pad={{ horizontal: 'medium' }} responsive={true} justify="around">
              <Box direction="row" justify="between">
                <Box wrap={true} height="xsmall" justify="end">
                  <Heading level="3" margin={{ bottom: "xsmall", top: "none" }}>{drinkNamePreview}</Heading>
                </Box>
              </Box>
              <Box pad="small" border={{ side: "horizontal", color: "#EAE1E0" }}>
                {measuredIngredients.map(tuple => (
                  <Text
                    key={`${tuple[0]}${tuple[1]}`}
                    size="small"
                  >
                    {tuple[0]} {tuple[1]}
                  </Text>
                ))}
              </Box>
              <Box pad="small" overflow="auto" margin={{ vertical: "none" }} height="xsmall">
                <Paragraph margin={{ vertical: "none" }} size="small">{instructionsPreview}</Paragraph>
              </Box>
              <Box align="end">
                <Text size="xsmall">{alcoholicPreview}</Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* FORM ELEMENT */}
      <Box>
        <Heading>Get Started</Heading>
        <Box background="#362725B3" height="medium" margin={{ vertical: "small" }} round="5px" gap="small" align="center">
          <Form onSubmit={handleSubmit}>
            <Box direction="row" >
              <TextInput
                required
                placeholder="Your drink's name"
                name="name"
                type="text"
                value={drinkName}
                onChange={e => setDrinkName(e.target.value)} />
              <Button onClick={addName} icon={<Add color="#FDCF89" />} />
            </Box>
            <Box direction="row">
              <Box>
                <TextInput

                  placeholder='"1/2 oz"'
                  name="measurements"
                  type="text"
                  value={measurement}
                  onChange={e => setMeasurement(e.target.value)} />
              </Box>
              <Box>
                <TextInput

                  placeholder='"bourbon"'
                  name="ingredients"
                  type="text"
                  value={ingredient}
                  suggestions={suggestions}
                  onSelect={e => setIngredient(e.suggestion)}
                  onChange={getIngredientSuggestions} />
              </Box>
              <Button onClick={addPair} icon={<Add color="#FDCF89" />} />
            </Box>
            <Box direction="row">
              <TextArea
                resize="vertical"
                required
                placeholder="Instructions to make your drink"
                name="instructions"
                type="text"
                value={instructions}
                onChange={e => setInstructions(e.target.value)} />
              <Button onClick={addInstructions} icon={<Add color="#FDCF89" />} />
            </Box>
            <Box margin="small">
              <input
                name="imageUrl"
                type="file"
                label="Drink Image"
                onChange={handleImageChange} />
            </Box>
            <CheckBox
              checked={alcoholic}
              label="contains alcohol?"
              onChange={handleCheck} />
            <Button type="submit" >Create Drink</Button>
          </Form>
        </Box>
      </Box>
    </Box>
  )
}

export default CreateDrinks