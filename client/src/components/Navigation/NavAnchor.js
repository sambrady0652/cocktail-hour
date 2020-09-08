import React from 'react'
import { Anchor } from 'grommet'

const NavAnchor = (props) => {
  const { href, label, disabled, icon } = props
  return (
    <Anchor
      href={href}
      label={label}
      disabled={disabled}
      icon={icon}
      color="inherit"
    />
  )
}

export default NavAnchor