import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Text } from 'grommet'
import { Favorite } from 'grommet-icons'

const FavoriteButton = () => {
  const { needSignIn } = useSelector(state => state.currentUser)
  const dispatch = useDispatch()
  const handleClick = () => {
    if (needSignIn) {
      return (
        <Text>Please Sign In</Text>
      )
    }
    else {
      console.log("clicked")
    }
  }
  return (
    <Button
      plain
      onClick={handleClick}
      icon={<Favorite color="#FDCF89" />}
    />
  )
}

export default FavoriteButton