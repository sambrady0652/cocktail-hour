import React, { createContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Box } from 'grommet'

import DrinkCard from '../Search/DrinkCard'
import IngredientsSearchForm from '../Search/IngredientsSearchForm'
import { fetchFavorites } from '../../store/auth';

export const FavPageContext = createContext()

const MyFavorites = () => {
  const { userId } = useSelector(state => state.currentUser)
  const [favsList, setFavsList] = useState([])

  useEffect(() => {
    async function getFavs() {
      if (userId) {
        const favs = await fetchFavorites(userId)
        setFavsList(favs)
      }
    }
    getFavs()
  }, [userId])

  return (
    <Box direction="row" align="start" justify="around" overflow="scroll" gap="small">
      <Box>
        <FavPageContext.Provider value={setFavsList} >
          {favsList.map(drink => <DrinkCard drink={drink} key={drink.id} />)}
        </FavPageContext.Provider>
      </Box>
      <Box background="#832023" round="small">
        <IngredientsSearchForm />
      </Box>
    </Box>
  )
}

export default MyFavorites