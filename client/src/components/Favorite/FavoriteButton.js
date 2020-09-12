import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Text } from 'grommet'
import { Favorite } from 'grommet-icons'
import { favButton, fetchFavorites } from '../../store/auth'

const FavoriteButton = (props) => {
  const { drinkId, setIsFavorited, isFavorited } = props
  const { needSignIn, userId } = useSelector(state => state.currentUser)

  const addFav = async () => {
    if (needSignIn) {
      return (
        <Text>Please Sign In</Text>
      )
    }
    else {
      await favButton(userId, drinkId, "POST")
      const favs = await fetchFavorites(userId)
      setIsFavorited(favs.includes(drinkId))
    }
  }

  const removeFav = async () => {
    if (needSignIn) {
      return (
        <Text>Please Sign In</Text>
      )
    }
    else {
      await favButton(userId, drinkId, "DELETE")
      const favs = await fetchFavorites(userId)
      setIsFavorited(favs.includes(drinkId))
    }
  }
  return (
    <>
      {isFavorited ?
        (
          <Button
            focusIndicator={false}
            plain
            onClick={removeFav}
            icon={<Favorite color="#C0521F" />}
          />
        ) : (
          <Button
            focusIndicator={false}
            plain
            onClick={addFav}
            icon={<Favorite color="#FDCF89" />}
          />
        )}
    </>
  )
}

export default FavoriteButton