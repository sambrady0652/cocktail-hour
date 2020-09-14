//REQUISITE IMPORTS HERE
import { apiUrl } from '../config';

const SET_SEARCH_RESULTS = "/cocktail_hour/drinks/search/SET_SEARCH_RESULTS"

export const fetchDrinks = async (searchTerm, route) => {
  try {
    const res = await fetch(`${apiUrl}/${route}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ searchTerm })
    })

    if (!res.ok) {
      throw res
    }

    const drinksList = await res.json()
    return drinksList['results']
  }
  catch (e) {
    console.error(e.message)
  }
}

export const fetchIngredientTypes = async () => {
  try {
    const res = await fetch(`${apiUrl}/ingredients/type`)

    if (!res.ok) {
      throw res
    }

    const { types } = await res.json()
    return types
  }
  catch (e) {
    console.error(e.message)
  }
}

export const fetchIngredients = async (searchTerm) => {
  try {
    const res = await fetch(`${apiUrl}/ingredients/type/list`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ searchTerm })
    })

    if (!res.ok) {
      throw res
    }

    const { ingredients } = await res.json()
    return ingredients
  }
  catch (e) {
    console.error(e.message)
  }
}

//ACTION CREATORS
//NOTE: redirect logic behaves as a switch between the Home Page and the Search Results page
export const setSearchResults = (drinksList, redirect) => ({
  type: SET_SEARCH_RESULTS,
  drinksList,
  redirect
})

// REDUCER 

export default function reducer(state = { results: [], redirect: false }, action) {
  Object.freeze(state);
  const newState = Object.assign({}, state);
  switch (action.type) {
    case SET_SEARCH_RESULTS: {
      return {
        results: action.drinksList,
        redirect: action.redirect
      }
    }
    default: return newState
  }
}