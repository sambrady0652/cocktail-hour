import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Header, Heading, Anchor, Box, Button } from 'grommet'
import { Search } from 'grommet-icons'

import SignInButton from './SignInButton'
import AccountMenu from './AccountMenu'
import NavAnchor from './NavAnchor';
import SearchForm from '../Search/SearchForm';


const Navbar = () => {
  const { needSignIn } = useSelector(state => state.currentUser)
  const [showSearch, setShowSearch] = useState(false)

  const toggleSearch = () => {
    if (showSearch) {
      setShowSearch(false)
    }
    else {
      setShowSearch(true)
    }
  }

  return (
    <Header fill="horizontal" justify="around" border="bottom" background="#362725B3" style={{ position: "fixed", top: "0px" }}>
      <Header >
        <Anchor href='/' color="#FDCF89" margin={{ left: "large" }}><Heading level={3}>Cocktail Hour</Heading></Anchor>
      </Header>
      <Header >
        {/* This Ternary Logic Determines whether to show the search form in the navbar */}
        {showSearch ?
          (
            <Box width="medium" alignContent="center">
              <SearchForm toggleSearch={toggleSearch} />
            </Box>)
          : (
            <Box width="medium" align="end" justify="end">
              <Button plain hoverIndicator={{ color: "#362725B3", opacity: "B3" }} onClick={toggleSearch}><Search color="#FDCF89" /></Button>
            </Box>
          )}
        <NavAnchor label="Browse Drinks" href="/drinks" />
        {/* This Ternary Logic Determines whether to activate the 'My Favorite Drinks' link based on whether the user is signed in */}
        {needSignIn ?
          (
            <NavAnchor disabled label="My Favorite Drinks" href="" />)
          : (
            <NavAnchor label="My Favorite Drinks" href="/my_favorites" />
          )}
        <Box width="xsmall" alignContent="center">
          {/* This Ternary Logic Determines whether to show the sign in button or account menu based on whether the user is signed in */}
          {needSignIn ? <SignInButton label="Sign in" /> : <AccountMenu />}
        </Box>
      </Header>
    </Header >
  )
}

export default Navbar