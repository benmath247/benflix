import React, { useState } from 'react'
import './Movie.css'
import UserAuthHook from '../hooks/UserAuthHook'
import axios from 'axios'
import apiKey from './apikey'
import "../MovieList/MovieList"
import Spinner from '../Spinner/Spinner'
import MovieList from '../MovieList/MovieList'

function Movie() {
  UserAuthHook("/movie", "/login")
  const [movie, setMovie] = useState("")
  const [movieArray, setMovieArray] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  async function fetchMovie(movieTitle) {
    setIsLoading(true)
    const url = `http://www.omdbapi.com/?s=${movieTitle}&apikey=${apiKey()}`
    try {
      let resp = await axios.get(url)
      console.log(resp)
      setMovieArray(resp.data.Search)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  function handleOnSubmit(e) {
    e.preventDefault()
    fetchMovie(movie)
  }

  return (
    <>
      <div className="movie-container">
        <div className="movie-input">
          <form onSubmit={handleOnSubmit}>
            <input type="text" onChange={(e) => setMovie(e.target.value)} />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
      { isLoading ? <Spinner /> : <MovieList movieArray={movieArray} />}
    </>
  );
}

export default Movie