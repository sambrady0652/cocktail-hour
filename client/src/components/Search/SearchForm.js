import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { TextInput, Form, Button, Box, Text } from 'grommet'
import { Search } from 'grommet-icons'

import { fetchSearch, setSearchResults } from '../../store/search'


const SearchForm = (props) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const { toggleSearch } = props
  const dispatch = useDispatch()

  const handleChange = async (e) => {
    setSearchTerm(e.target.value)
    //NOTE: use e.target.value directly in fetch call because useState is "one step behind" 
    //This is the result of useState's 'pending state' feature. 
    const suggestions = await fetchSearch(e.target.value, "suggestions")
    setSuggestions(suggestions.map(suggObj => suggObj.name))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!searchTerm) {
      toggleSearch()
      dispatch(setSearchResults([], false))
    }
    else {
      const results = await fetchSearch(searchTerm, "results")
      dispatch(setSearchResults(results, true))
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Box direction="row" justify="center" alignContent="center">
        <TextInput
          placeholder={<Text>Find your favorite cocktail</Text>}
          type="text"
          name="searchTerm"
          value={searchTerm}
          onChange={handleChange}
          suggestions={suggestions}
          onSelect={e => setSearchTerm(e.suggestion)}
        />
        <Button
          plain
          hoverIndicator={{ color: "#362725B3", opacity: "B3" }}
          type="submit" >
          <Search color="#FDCF89" />
        </Button>
      </Box>
    </Form>
  )
}

export default SearchForm