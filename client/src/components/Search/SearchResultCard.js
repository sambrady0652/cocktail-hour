import React from 'react'
import { Box, Image, Heading, Paragraph, Text } from 'grommet'


import FavoriteButton from '../Favorite/FavoriteButton'

const SearchResultCard = (props) => {
  const { id, name, alcoholic, instructions, image_url, measured_ingredients } = props.drink
  //NOTE: Some of data has empty ingredients string, so this filters those out.
  const cleanIngredients = measured_ingredients.filter(tuple => tuple[0] !== "")
  return (
    <Box width="large" background="#362725B3" height="medium" margin={{ vertical: "small" }} round="5px">
      <Box direction="row" round="small" fill="vertical">
        <Box fill>
          <Image
            fit="cover"
            src={image_url}
          />
        </Box>
        <Box direction="column" pad={{ horizontal: 'medium' }} responsive={true} overflow="scroll" justify="around">
          <Box direction="row" justify="between" alignContent="center">
            <Heading level="3" margin={{ bottom: "none" }}>{name}</Heading>
            <Box justify="end">
              <FavoriteButton />
            </Box>
          </Box>
          <Box overflow="scroll" margin="small">
            <Paragraph>{instructions}</Paragraph>
          </Box>
          <Box>
            {cleanIngredients.map(tuple => <Text key={`${id}-${tuple[0]}`}>{tuple[1]} {tuple[0]}</Text>)}
          </Box>
          <Box align="end">
            <Text size="xsmall">{alcoholic}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default SearchResultCard
