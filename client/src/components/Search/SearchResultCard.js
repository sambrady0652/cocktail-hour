import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Box, Image, Heading, Paragraph, Text } from 'grommet'


import FavoriteButton from '../Favorite/FavoriteButton'
import { fetchFavorites } from '../../store/auth'

const SearchResultCard = (props) => {
  const { userId, needSignIn } = useSelector(state => state.currentUser)
  const { id, name, alcoholic, instructions, image_url, measured_ingredients } = props.drink
  //NOTE: Some of data has empty ingredients string, so this filters those out.
  const cleanIngredients = measured_ingredients.filter(tuple => tuple[0] !== "")
  const [isFavorited, setIsFavorited] = useState("")

  //Set Initial Favorites Status of each Drink on Component Load
  useEffect(() => {
    async function favFetch() {
      if (!needSignIn && userId) {
        const favs = await fetchFavorites(userId)
        setIsFavorited(favs.includes(id))
      }
    }
    favFetch()
  }, [])

  return (
    <Box width="large" background="#362725B3" height="medium" margin={{ vertical: "small" }} round="5px">
      <Box direction="row" round="small" fill="vertical">
        <Box fill>
          <Image
            fit="cover"
            src={image_url}
          />
        </Box>
        <Box pad={{ horizontal: 'medium' }} responsive={true} justify="around">
          <Box direction="row" justify="between">
            <Box wrap={true} height="xsmall" justify="end">
              <Heading level="3" margin={{ bottom: "xsmall", top: "none" }}>{name}</Heading>
            </Box>
            <Box justify="start" margin={{ top: "small" }}>
              <FavoriteButton drinkId={id} setIsFavorited={setIsFavorited} isFavorited={isFavorited} />
            </Box>
          </Box>
          <Box pad="small" border={{ side: "horizontal", color: "#EAE1E0" }}>
            {cleanIngredients.map(tuple => (
              <Text
                key={`${id}${tuple[1]}${tuple[0]}`}
                size="small"
              >
                {tuple[1]} {tuple[0]}
              </Text>
            ))}
          </Box>
          <Box pad="small" overflow="auto" margin={{ vertical: "none" }} height="xsmall">
            <Paragraph margin={{ vertical: "none" }} size="small">{instructions}</Paragraph>
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
