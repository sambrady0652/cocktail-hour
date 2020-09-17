import React from 'react'
import { Menu, Anchor } from 'grommet'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { signOut } from '../../store/auth'
import { setSearchResults } from '../../store/search'

const AccountMenu = () => {
  const dispatch = useDispatch()
  let history = useHistory()

  const handleSignout = () => {
    dispatch(signOut())
  }

  const handleMyDrinks = () => {
    dispatch(setSearchResults([], false))
    history.push("/my_drinks")
  }

  return (
    <Menu
      icon={false}
      label={<Anchor color="#FDCF89">Account</Anchor>}
      items={[
        { label: 'My Drinks', onClick: () => handleMyDrinks() },
        { label: 'Signout', onClick: () => handleSignout() },
      ]}
    />
  )
}

export default AccountMenu
