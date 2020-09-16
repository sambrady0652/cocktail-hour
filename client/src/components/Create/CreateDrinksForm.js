import React from 'react'
import { Box, Button, Form, CheckBox, TextArea, Text, FormField } from 'grommet'
import { Add } from 'grommet-icons'

const CreateDrinksForm = (props) => {
  const {
    //State
    drinkName,
    instructions,
    alcoholic,
    measurement,
    ingredient,
    suggestions,
    //Set State Hooks
    setDrinkName,
    setInstructions,
    setMeasurement,
    setIngredient,
    //Functions
    addPair,
    addName,
    addInstructions,
    getIngredientSuggestions,
    handleCheck,
    handleImageChange,
    handleSubmit
  } = props.form

  return (
    // <Box pad="small">
    <Form onSubmit={handleSubmit}>
      <Box direction="row">
        <Box fill="horizontal">
          <FormField
            required
            placeholder="Your drink's name"
            name="name"
            type="text"
            value={drinkName}
            onChange={e => setDrinkName(e.target.value)} />
        </Box>
        <Button onClick={addName} icon={<Add color="#FDCF89" />} />
      </Box>
      <Box direction="row" >
        <Box fill="horizontal">
          <FormField
            placeholder='"1/2 oz"'
            name="measurements"
            type="text"
            value={measurement}
            onChange={e => setMeasurement(e.target.value)} />
        </Box>
        <Box fill="horizontal">
          <FormField
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
      <Text>Confirm the preview contains all the accurate information</Text>
      <Button type="submit" >Create Drink</Button>
    </Form>
    // </Box>
  )
}

export default CreateDrinksForm