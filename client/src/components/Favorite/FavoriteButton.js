import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'grommet'
import { Favorite } from 'grommet-icons'

import ErrorBox from '../Auth/ErrorBox'
import { favButton, fetchFavorites } from '../../store/auth'
import { getIds } from './helperFunctions'
import SignInButton from '../Navigation/SignInButton'
import { FavPageContext } from './MyFavorites'

const FavoriteButton = (props) => {
  const { drinkId, setIsFavorited, isFavorited } = props
  const { needSignIn, userId, authErrors } = useSelector(state => state.currentUser)
  const dispatch = useDispatch()
  const setFavsList = useContext(FavPageContext)
  const addFav = async () => {
    await dispatch(favButton(userId, drinkId, "POST"))
    const favs = await fetchFavorites(userId)
    setIsFavorited(getIds(favs).includes(drinkId))
    if (setFavsList) {
      setFavsList(favs)
    }
  }

  const removeFav = async () => {
    await dispatch(favButton(userId, drinkId, "DELETE"))
    const favs = await fetchFavorites(userId)
    setIsFavorited(getIds(favs).includes(drinkId))
    if (setFavsList) {
      setFavsList(favs)
    }
  }

  return (
    <>
      {/* if user is not signed in, button opens sign-in modal */}
      {needSignIn ? (
        <SignInButton
          icon={<Favorite color="#FDCF89" />}
        />
      ) : (
          <>
            {/* if user has already favorited the drink, button removes favorite and appears orange  */}
            {isFavorited ?
              (
                <Button
                  focusIndicator={false}
                  plain
                  onClick={removeFav}
                  icon={<Favorite color="#C0521F" />}
                />
              ) : (
                // otherwise, the button adds a favorite and appears tan
                <Button
                  focusIndicator={false}
                  plain
                  onClick={addFav}
                  icon={<Favorite color="#FDCF89" />}
                />
              )}
          </>
        )}
      {authErrors && <ErrorBox />}
    </>
  )
}

export default FavoriteButton