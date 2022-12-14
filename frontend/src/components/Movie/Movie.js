import React, { useState, useEffect } from 'react'
import './Movie.css'
import UserAuthHook from '../hooks/UserAuthHook'
import axios from 'axios'
import "../MovieList/MovieList"
import Spinner from '../Spinner/Spinner'
import MovieList from '../MovieList/MovieList'
import Pagination from '../Pagination/Pagination'

function Movie() {
  UserAuthHook("/movie", "/login")
  const [movieArray, setMovieArray] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)
  const [totalMovieResults, settotalMovieResults] = useState(0)
  const [movie, setMovie] = useState("")
  const [onLoadMovie, setOnLoadMovie] = useState(null)
  const favoriteMovies = [
    "Harry Potter",
    "Joker",
    "Alien",
    "Friday the",
    "Halloween",
    "Die Hard",
    "James Bond",
    "Spiderman",
    "Ice Age",
    "Lord of the Rings",
    "Star Wars",
    "Godfather",
    "Pokemon",
    "Pirates of the",
    "Spiderman"
  ]

  useEffect(() => {
    fetchMovie(favoriteMovies[Math.floor(Math.random() * favoriteMovies.length)])
  }, [])

  useEffect(() => {
    if (onLoadMovie) {
      fetchMovie(onLoadMovie)
    }
  }, [page])

  useEffect(() => {
    setError("")
    setPage(1)
  }, [onLoadMovie])


  async function fetchMovie(movieTitle) {
    setIsLoading(true)
    setOnLoadMovie(movieTitle)
    setError("")
    const url = `http://www.omdbapi.com/?s=${movieTitle}&apikey=${process.env.REACT_APP_OMDB_API}&page=${page}`
    console.log(url)
    try {
      let resp = await axios.get(url)
      if (Array.isArray(resp.data.Search)) {
        setMovieArray(resp.data.Search)

        settotalMovieResults(Number(resp.data.totalResults));

        setIsLoading(false)
      } else {
        setError(true)
        throw {
          message: "Movie not found",
          statusCode: 404
        }
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      if (error.statusCode === 404) {
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
            <input type="text" onChange={(e) => setMovie(e.target.value)} />
            <button type="submit" onClick={(e) => {setPage(1);}}>Search</button>
          </form>
        </div>
      </div>
      <>
        {movieArray.length > 0 && (
          <Pagination page={page} setPage={setPage} totalMovieResults={totalMovieResults} />
        )}
      </>
      {isLoading ? <Spinner /> : <MovieList movieArray={movieArray} />}
    </>
  );
}

export default Movie