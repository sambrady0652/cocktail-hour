import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Heading } from 'grommet'

import { createDrink, fetchIngredients } from '../../store/search'
import DrinkPreview from './DrinkPreview'
import CreateDrinksForm from './CreateDrinksForm'


const CreateDrinks = () => {
  //Form Data
  const [drinkName, setDrinkName] = useState("")
  const [instructions, setInstructions] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [alcoholic, setAlcoholic] = useState(false)
  //Individual
  const [measurement, setMeasurement] = useState("")
  const [ingredient, setIngredient] = useState("")
  const [suggestions, setSuggestions] = useState([])
  //List 
  const [measurements, setMeasurements] = useState([])
  const [ingredients, setIngredients] = useState([])
  //Combined List
  const [measuredIngredients, setMeasuredIngredients] = useState([])

  // Preview State 
  const [drinkNamePreview, setDrinkNamePreview] = useState("")
  const [instructionsPreview, setInstructionsPreview] = useState("")
  const [imageUrlPreview, setImageUrlPreview] = useState("")
  const [alcoholicPreview, setAlcoholicPreview] = useState("Non alcoholic")

  //Used to redirect after form submission
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


  //Pass Requisite State and Functions as Props
  const preview = { imageUrlPreview, drinkNamePreview, alcoholicPreview, measuredIngredients, instructionsPreview }
  const form = {
    drinkName,
    setDrinkName,
    instructions,
    setInstructions,
    imageUrl,
    setImageUrl,
    alcoholic,
    setAlcoholic,
    measurement,
    setMeasurement,
    ingredient,
    setIngredient,
    suggestions,
    addPair,
    addName,
    addInstructions,
    getIngredientSuggestions,
    handleCheck,
    handleImageChange,
    handleSubmit
  }

  return (
    <Box direction="row" align="start" justify="center" overflow="scroll" gap="large" style={{ position: "relative" }}>
      <Box>
        <Heading>Preview of your new drink</Heading>
        <DrinkPreview preview={preview} />
      </Box>
      <Box>
        <Heading>Get Started</Heading>
        <Box background="#362725B3" height="medium" margin={{ vertical: "small" }} round="5px" gap="small" align="center">
          <CreateDrinksForm form={form} />
        </Box>
      </Box>
    </Box>
  )
}

export default CreateDrinks