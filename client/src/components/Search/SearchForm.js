import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { TextInput, Form, Button, Box, Text } from 'grommet'
import { Search } from 'grommet-icons'

import { fetchDrinks, setSearchResults } from '../../store/search'


const SearchForm = (props) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const { toggleSearch } = props
  const dispatch = useDispatch()

  const handleChange = async (e) => {
    setSearchTerm(e.target.value)
    //NOTE: use e.target.value directly in fetch call because useState is "one step behind" 
    //This is the result of useState's 'pending state' feature. 
    const suggestions = await fetchDrinks(e.target.value, "drinks/search/suggestions")
    setSuggestions(suggestions.map(suggObj => suggObj.name))
  }

  const handleSelect = async (e) => {
    setSearchTerm(e.suggestion)
    //See note above for rationale on using e.suggestion
    const results = await fetchDrinks(e.suggestion, "drinks/search/results")
    dispatch(setSearchResults(results, true))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!searchTerm) {
      toggleSearch()
      dispatch(setSearchResults([], false))
    }
    else {
      const results = await fetchDrinks(searchTerm, "drinks/search/results")
      dispatch(setSearchResults(results, true))
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Box direction="row" justify="center" alignContent="center">
        <TextInput
          placeholder="Quickly find a drink by name"
          type="text"
          name="searchTerm"
          value={searchTerm}
          onChange={handleChange}
          suggestions={suggestions}
          onSelect={handleSelect}
        />
        <Button
          plain
          type="submit" >
          <Search color="#FDCF89" />
        </Button>
      </Box>
    </Form>
  )
}

export default SearchForm