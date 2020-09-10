import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';

const Home = () => {
  const { redirect } = useSelector(state => state.search)
  if (redirect) {
    return <Redirect to="/search_results" />
  }

  return (
    <div>HOME</div>

  )
}

export default Home