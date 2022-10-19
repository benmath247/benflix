import React from 'react'
import './Movie.css'
import UserAuthHook from '../hooks/UserAuthHook'

function Movie() {
  UserAuthHook("/movie", "/login")
  return (
    <div>Movie</div>
  )
}

export default Movie