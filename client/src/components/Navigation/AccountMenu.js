import React from 'react'
import { Menu } from 'grommet'
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
      size="small"
      icon={false}
      focusIndicator={false}
      hoverIndicator={{ color: "#362725", opacity: "B3" }}
      label="Account"
      items={[
        { label: 'My Drinks', onClick: () => handleMyDrinks() },
        { label: 'Signout', onClick: () => handleSignout() },
      ]}
    />
  )
}

export default AccountMenu
