import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
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
  const { pathname } = useLocation();
  const [heading, setHeading] = useState("Cocktail Hour")

  useEffect(() => {
    if (pathname === "/") {
      setHeading("Cocktail Hour")
    }
    else if (pathname === "/search") {
      setHeading("Search Drinks")
    }
    else if (pathname === "/search_results") {
      setHeading("Search Results")
    }
    else if (pathname === "/create_drink") {
      setHeading("Create Drink")
    }
    else if (pathname === "/my_drinks") {
      setHeading("My Drinks")
    }
  }, [pathname])

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
        <Anchor href='/' color="#FDCF89" margin={{ left: "large" }}><Heading level={3}>{heading}</Heading></Anchor>
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
        <NavAnchor label="Find a Drink" href="/search" />
        {/* This Ternary Logic Determines whether to activate the 'My Favorite Drinks' link based on whether the user is signed in */}
        {needSignIn ?
          (
            <NavAnchor disabled label="Create a Drink" href="" />)
          : (
            <NavAnchor label="Create a Drink" href="/create_drink" />
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