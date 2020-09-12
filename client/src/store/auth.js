//REQUISITE IMPORTS HERE
import { apiUrl } from '../config';

//ACTION TYPES AND LOCAL STORAGE ASSIGNMENTS
const SET_USER = 'cocktail_hour/auth/SET_USER';
const REMOVE_USER = 'cocktail_hour/auth/REMOVE_USER';
const AUTH_ERROR = 'cocktail_hour/auth/AUTH_ERROR'
const SESSION_TOKEN = 'SESSION_TOKEN';
const USER_ID = 'USER_ID';

//SIGN IN 
export const signIn = (email, password) => async dispatch => {
  try {
    //Retrieve Information from Server
    const response = await fetch(`${apiUrl}/users/signin`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw response;
    }
    //Place token in Local Storage, update Redux State
    const { access_token, id } = await response.json();
    localStorage.setItem(SESSION_TOKEN, access_token);
    localStorage.setItem(USER_ID, id);
    dispatch(setUser(access_token, id));
  }
  catch (err) {
    const errJSON = await err.json()
    dispatch(handleAuthErrors(errJSON))
  }
}

//SIGN UP 
export const signUp = (firstName, lastName, email, password, imageUrl) => async dispatch => {
  try {
    const formData = new FormData();
    formData.append("first_name", firstName)
    formData.append("last_name", lastName)
    formData.append("email", email)
    formData.append("password", password)
    if (imageUrl !== "") {
      formData.append("imageUrl", imageUrl, `${firstName}-profpic`)
    }

    const response = await fetch(`${apiUrl}/users/signup`, {
      method: 'post',
      body: formData
    });

    if (!response.ok) {
      throw response
    }
    //Place token in Local Storage, update Redux State
    const { access_token, id } = await response.json();
    localStorage.setItem(SESSION_TOKEN, access_token);
    localStorage.setItem(USER_ID, id);
    dispatch(setUser(access_token, id));
  }
  catch (err) {
    const errJSON = await err.json()
    dispatch(handleAuthErrors(errJSON))
  }
}


//SIGN OUT
export const signOut = () => async (dispatch) => {
  localStorage.removeItem(SESSION_TOKEN);
  localStorage.removeItem(USER_ID);
  dispatch(removeUser())
}

// FAVORITES FUNCTIONS


export const fetchFavorites = async (id) => {
  try {
    const res = await fetch(`${apiUrl}/users/${id}/favorites`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('SESSION_TOKEN')}`,
      }
    })

    if (!res.ok) {
      throw res
    }
    const { favorites } = await res.json()
    return favorites
  }
  catch (err) {
    console.error(err.message)
  }
}

export const favButton = (userId, drinkId, method) => async dispatch => {
  try {
    const res = await fetch(`${apiUrl}/users/${userId}/favorites/${drinkId}`, {
      method: `${method}`,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('SESSION_TOKEN')}`,
        'Content-Type': 'application/json'
      },
      body: { 'user_id': userId, 'drink_id': drinkId }
    });
    if (!res.ok) {
      throw res
    }
    const { new_favorite_id } = await res.json()
    return new_favorite_id
  }
  catch (err) {
    const errJSON = await err.json()
    dispatch(handleAuthErrors(errJSON))
  }
}

//ACTION CREATOR FUNCTIONS
export const setUser = (access_token, id, favorites) => ({
  type: SET_USER,
  access_token,
  id: Number(id),
  favorites
});

export const handleAuthErrors = (errJSON) => ({
  type: AUTH_ERROR,
  errJSON
})

export const removeUser = () => ({
  type: REMOVE_USER
})


//REDUCER
export default function reducer(state = { needSignIn: true }, action) {
  Object.freeze(state);
  const newState = Object.assign({}, state);
  switch (action.type) {
    case SET_USER: {
      return {
        token: action.access_token,
        userId: action.id,
        needSignIn: false,

      }
    }
    case AUTH_ERROR: {
      return {
        needSignIn: true,
        authErrors: action.errJSON['errors'],
      }
    }
    case REMOVE_USER: {
      return {
        needSignIn: true,
      }
    }
    default: return newState;
  }
}