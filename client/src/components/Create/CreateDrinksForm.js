import React from 'react'
import { Box, Button, Form, CheckBox, TextArea, FormField, Paragraph, Text } from 'grommet'
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
    addMeasuredIngredients,
    addName,
    addInstructions,
    getIngredientSuggestions,
    addAlcoholic,
    addImage,
    handleSubmit
  } = props.form

  return (
    <Box pad="small">
      <Form onSubmit={handleSubmit}>
        <Box direction="row">
          <Button onClick={addName} icon={<Add color="#FDCF89" />} />
          <Box fill="horizontal">
            <FormField
              required
              placeholder="Your drink's name"
              name="name"
              type="text"
              value={drinkName}
              onChange={e => setDrinkName(e.target.value)} />
          </Box>
        </Box>
        <Box direction="row" >
          <Button onClick={addMeasuredIngredients} icon={<Add color="#FDCF89" />} />
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

        </Box>
        <Box direction="row">
          <Button onClick={addInstructions} icon={<Add color="#FDCF89" />} />
          <TextArea
            resize="vertical"
            required
            placeholder="Instructions to make your drink"
            name="instructions"
            type="text"
            value={instructions}
            onChange={e => setInstructions(e.target.value)} />
        </Box>
        <Box margin={{ left: "large", vertical: "small" }}>
          <input
            name="imageUrl"
            type="file"
            label="Drink Image"
            onChange={addImage} />
        </Box>
        <Box margin="small">
          <CheckBox
            checked={alcoholic}
            label="contains alcohol?"
            onChange={addAlcoholic} />
        </Box>
        <Box margin={{ left: "large", vertical: "small" }}>
          <Paragraph size="small" margin={{ top: "none" }}>Please confirm the Preview is accurate</Paragraph>
        </Box>
        <Button type="submit" plain={false} fill="horizontal">
          Create Drink
        </Button>
      </Form>
    </Box>
  )
}

export default CreateDrinksForm