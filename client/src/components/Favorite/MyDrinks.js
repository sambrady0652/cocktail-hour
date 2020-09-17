import React, { createContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { Box } from 'grommet'

import DrinkCard from '../Search/DrinkCard'
import { fetchFavorites } from '../../store/auth';

export const FavPageContext = createContext()

const MyDrinks = () => {
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

  const { redirect } = useSelector(state => state.search)
  if (redirect) {
    return <Redirect to="/search_results" />
  }

  return (
    <Box direction="row" align="start" justify="around" overflow="scroll" gap="small" style={{ position: "relative", padding: "0px", margin: "0px", background: "none", backgroundColor: "transparent" }}>
      <Box>
        <FavPageContext.Provider value={setFavsList} >
          {favsList.map(drink => <DrinkCard drink={drink} key={drink.id} />)}
        </FavPageContext.Provider>
      </Box>
    </Box>
  )
}

export default MyDrinks