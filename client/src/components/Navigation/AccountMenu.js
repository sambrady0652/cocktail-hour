import React from 'react'
import { Menu } from 'grommet'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { signOut } from '../../store/auth'

const AccountMenu = () => {
  const dispatch = useDispatch()
  let history = useHistory()

  const handleClick = () => {
    dispatch(signOut())
  }
  return (
    <Menu
      size="small"
      icon={false}
      focusIndicator={false}
      hoverIndicator={{ color: "#362725", opacity: "B3" }}
      label="Account"
      items={[
        { label: 'My Drinks', onClick: () => { history.push("/my_drinks") } },
        { label: 'Signout', onClick: () => handleClick() },
      ]}
    />
  )
}

export default AccountMenu
