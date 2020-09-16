import React from 'react'
import { Box, Heading, Image, Text, Paragraph } from 'grommet'

const DrinkPreview = (props) => {

  const { imageUrlPreview, drinkNamePreview, measuredIngredients, instructionsPreview, alcoholicPreview } = props.preview

  return (
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
  )
}

export default DrinkPreview