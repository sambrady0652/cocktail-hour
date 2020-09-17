import React, { useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box } from 'grommet'

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
  //List 
  const [measurements, setMeasurements] = useState([])
  const [ingredients, setIngredients] = useState([])
  //Combined List
  const [measuredIngredients, setMeasuredIngredients] = useState([])
  // Ingredient Suggestions
  const [suggestions, setSuggestions] = useState([])
  // Preview State 
  const [drinkNamePreview, setDrinkNamePreview] = useState("")
  const [instructionsPreview, setInstructionsPreview] = useState("")
  const [imageUrlPreview, setImageUrlPreview] = useState("")
  const [alcoholicPreview, setAlcoholicPreview] = useState("Non alcoholic")
  //Used to redirect after form submission
  const history = useHistory()

  //Add Measurements and Ingredients to Preview and appends them to Form
  const addMeasuredIngredients = () => {
    setMeasurements([...measurements, measurement])
    setIngredients([...ingredients, ingredient])
    setMeasuredIngredients([...measuredIngredients, [measurement, ingredient]])
    setMeasurement("")
    setIngredient("")
  }

  //Add Drink Name to Preview
  const addName = () => {
    setDrinkNamePreview(drinkName)
  }

  //Add Instructions to Preview
  const addInstructions = () => {
    setInstructionsPreview(instructions)
  }


  //Add Alcoholic Indicator to Form and Preview
  const addAlcoholic = (e) => {
    setAlcoholic(e.target.checked)
    if (alcoholic === false) {
      setAlcoholicPreview("Alcoholic")
    }
    if (alcoholic === true) {
      setAlcoholicPreview("Non alcoholic")
    }
  }

  //Add Image to Form and Preview
  const addImage = (e) => {
    setImageUrl(e.target.files.item(0))
    setImageUrlPreview(URL.createObjectURL(e.target.files.item(0)))
  }

  //Fill suggestions Box for Text Input on Ingredients Form
  const getIngredientSuggestions = async (e) => {
    setIngredient(e.target.value)
    const suggestions = await fetchIngredients(e.target.value, "ingredients/suggestions")
    setSuggestions(suggestions.map(suggObj => suggObj.name))
  }

  //Submit Form and Creates Drink
  const handleSubmit = (e) => {
    e.preventDefault()
    createDrink(drinkName, ingredients, measurements, instructions, alcoholic, imageUrl)
    history.push("/my_drinks")
  }

  //Pass Requisite State and Functions as Props to components 
  const preview = {
    imageUrlPreview,
    drinkNamePreview,
    alcoholicPreview,
    measuredIngredients,
    instructionsPreview
  }

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
    addMeasuredIngredients,
    addName,
    addInstructions,
    getIngredientSuggestions,
    addAlcoholic,
    addImage,
    handleSubmit
  }

  const { redirect } = useSelector(state => state.search)
  if (redirect) {
    return <Redirect to="/search_results" />
  }

  return (
    <Box direction="row" align="start" justify="center" overflow="scroll" gap="large" style={{ position: "relative", padding: "0px", margin: "0px" }}>
      <DrinkPreview preview={preview} />
      <Box background="#362725B3" height="medium" margin={{ vertical: "small" }} round="5px" gap="small" align="center">
        <CreateDrinksForm form={form} />
      </Box>
    </Box>

  )
}

export default CreateDrinks