import React from 'react'
import { useSelector } from 'react-redux';
import { Header, Heading, Anchor } from 'grommet'
import { Search } from 'grommet-icons'
import SignInButton from './SignInButton'
import AccountMenu from './AccountMenu'
import NavAnchor from './NavAnchor';


const Navbar = () => {
  const { needSignIn } = useSelector(state => state.currentUser)

  return (
    <Header justify="around" border="bottom">
      <Header justify="center" >
        <Anchor href='/' alignSelf='center'><Heading level={3} >Cocktail Hour</Heading></Anchor>
      </Header>
      <Header >
        <NavAnchor href="/search" icon={<Search color="plain" />} />
        <NavAnchor label="Browse" href="/petitions" />
        {needSignIn ? <NavAnchor disabled label="My Favorite Drinks" href="" /> : <NavAnchor label="My Favorite Drinks" href="" />}
        {needSignIn ? <SignInButton label="Sign in" /> : <AccountMenu />}
      </Header>
    </Header >
  )
}

export default Navbar