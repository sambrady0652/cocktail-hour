import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Text } from 'grommet'

const ErrorBox = () => {
  const { authErrors } = useSelector(state => state.currentUser)
  return (
    <Box
      align="start"
      pad="xsmall"
      border={{ color: "#832023" }}
      round="xsmall"
      // fill="horizontal"
      background="#58542D"
      overflow={{ horizontal: "hidden", vertical: "visible" }}
    >
      {authErrors.map(err => <Text size="xsmall">{err}</Text>)}
    </Box>
  )
}

export default ErrorBox