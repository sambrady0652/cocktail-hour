import React from 'react'
import { Card, CardBody, Box, Image, Heading, Paragraph, Anchor } from 'grommet'



const SearchResultCard = (props) => {
  const { id, name, alcoholic, instructions, image_url, ingredients, measurements, measured_ingredients } = props.drink

  return (
    <Card width="large" background="#362725B3" height="medium">
      <Box direction="row">
        <CardBody height="small">
          <Image
            fill
            fit="cover"
            src={image_url}
          />
        </CardBody>
        <Box direction="column" pad={{ horizontal: 'medium' }} responsive={true}>
          <Anchor color="inherit" href={`/drinks/${id}`}>
            <Heading level="3" margin={{ bottom: "none" }}>{name}</Heading>
          </Anchor>
          <Paragraph>{instructions}</Paragraph>
        </Box>
      </Box>
    </Card>

  )
}

export default SearchResultCard
