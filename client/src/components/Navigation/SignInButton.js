import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Layer } from 'grommet';

import Signin from '../Auth/Signin';
import Signup from '../Auth/Signup';

const SignInButton = (props) => {

  const [showIn, setShowIn] = useState(false)
  const [showUp, setShowUp] = useState(false)
  const { label, onClickProp, icon } = props
  const { needSignIn } = useSelector(state => state.currentUser)

  useEffect(() => {
    if (!needSignIn) {
      close()
    }
  }, [needSignIn])

  const close = () => {
    setShowIn(false)
    setShowUp(false)
  }

  const toggleLast = () => {
    if (!showIn && !showUp) {
      setShowUp(false)
      setShowIn(true)
    } else if (!showIn && showUp) {
      setShowUp(false)
      setShowIn(true)
    } else if (showIn && !showUp) {
      setShowIn(false)
      setShowUp(true)
    }
  }

  return (
    <Box>
      <Button
        plain
        focusIndicator={false}
        label={label}
        icon={icon}
        onClick={() => { onClickProp ? onClickProp() : toggleLast() }} />
      {(showIn || showUp) && (
        <Layer
          onEsc={() => close()}
          onClickOutside={() => close()}
        >
          {showIn ?
            (
              <Signin toggleLast={toggleLast} />
            ) : (
              <Signup toggleLast={toggleLast} />
            )
          }
        </Layer>
      )}
    </Box>
  )
}

export default SignInButton;