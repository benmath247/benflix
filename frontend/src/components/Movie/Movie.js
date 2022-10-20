import React, { useState } from 'react'
import './Movie.css'
import UserAuthHook from '../hooks/UserAuthHook'
import axios from 'axios'
import apiKey from './apikey'

function Movie() {
  UserAuthHook("/movie", "/login")
  const [movie, setMovie] = useState("")
  const [movieArray, setMovieArray] = useState([])

  async function fetchMovie(movieTitle) {
    const url = `http://www.omdbapi.com/?s=${movieTitle}&apikey=${apiKey()}`
    try {
      let resp = await axios.get(url)
      console.log(resp)
      setMovieArray(resp.data.Search)
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
      <div className="movie-list-container">
        {movieArray.map((item) => {
          return (<div key={item.imdbId}>
            <div>
              <img src={item.Poster} /></div>
            <div><h2>{item.Title}</h2></div>
          </div>
          )
        })}

      </div>
    </>
  );
}

export default Movie