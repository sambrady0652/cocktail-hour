import React, { useState } from 'react'
import { TextInput, Form, Button, Box } from 'grommet'
import { Search } from 'grommet-icons'

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(searchTerm)
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Box direction="row" justify="center" alignContent="center">
        <TextInput
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <Button plain hoverIndicator={{ color: "#362725B3", opacity: "B3" }} type="submit"><Search color="#FDCF89" /></Button> */}
      </Box>
    </Form>
  )
}

export default SearchForm