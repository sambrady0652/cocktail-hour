import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Header, Heading, Anchor, Box, FormField, Form, Button } from 'grommet'
import { Search } from 'grommet-icons'
import SignInButton from './SignInButton'
import AccountMenu from './AccountMenu'
import NavAnchor from './NavAnchor';


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
        <Box width="medium" alignContent="center">
          {showSearch && <Form><FormField placeholder="Search" type="text" /></Form>}
        </Box>
        <Button plain hoverIndicator={{ color: "#362725B3", opacity: "B3" }} onClick={toggleSearch}><Search color="#FDCF89" /></Button>
        <NavAnchor label="Browse Drinks" href="/petitions" />
        {needSignIn ? <NavAnchor disabled label="My Favorite Drinks" href="" /> : <NavAnchor label="My Favorite Drinks" href="" />}
        <Box width="xsmall" alignContent="center">
          {needSignIn ? <SignInButton label="Sign in" /> : <AccountMenu />}
        </Box>
      </Header>
    </Header >
  )
}

export default Navbar