import React, { useState, useEffect } from 'react'
import './Movie.css'
import UserAuthHook from '../hooks/UserAuthHook'
import axios from 'axios'
import apiKey from './apikey'
import "../MovieList/MovieList"
import Spinner from '../Spinner/Spinner'
import MovieList from '../MovieList/MovieList'

function Movie() {
  UserAuthHook("/movie", "/login")
  useEffect(() => {
    fetchMovie(favoriteMovies[Math.floor(Math.random() * favoriteMovies.length)])
  }, [])

  const [movie, setMovie] = useState("")
  const [movieArray, setMovieArray] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const favoriteMovies = ["Harry Potter", "Joker", "Alien", "Friday the", "Halloween", "Die Hard", "James Bond", "Spiderman", "Ice Age", "Lord of the Rings", "Star Wars", "Godfather", "Pokemon", "Pirates of the", "Spiderman"]
  
  async function fetchMovie(movieTitle) {
    setIsLoading(true)
    const url = `http://www.omdbapi.com/?s=${movieTitle}&apikey=${apiKey()}`
    try {
      let resp = await axios.get(url)
      if (Array.isArray(resp.data.Search)) {
        setMovieArray(resp.data.Search)
        setIsLoading(false)
      } else {
        setError(true)
        // throw new Error("Movie not found.")
        throw {
          message: "Movie not found",
          statusCode: 404
        }
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      if (error.statusCode === 404){
        setError(error.message)
      }
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
          {error && <div style={{ textAlign: "center", color: "red", padding: 15 }}>{error}</div>}
          <form onSubmit={handleOnSubmit}>
            <input type="text" value={"Please enter a movie"} onChange={(e) => setMovie(e.target.value)} />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
      {isLoading ? <Spinner /> : <MovieList movieArray={movieArray} />}
    </>
  );
}

export default Movie