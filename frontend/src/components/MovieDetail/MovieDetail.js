import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import apiKey from '../Movie/apikey';
import './MovieDetail.css'
import Spinner from '../Spinner/Spinner';

function MovieDetail() {
    let { title } = useParams();
    const [movie, setMovie] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function fetchMovieDetail() {
        try {
            setIsLoading(true)
            let resp = await axios.get(`http://www.omdbapi.com/?t=${title}&apikey=${apiKey()}`)
            setMovie(resp.data)
            setIsLoading(false)
        } catch { }
    }

    useEffect(() => {
        fetchMovieDetail()

    }, [])
    console.log(movie)
    return (
        <div className="movie-detail-container">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="movie-detail-column">
            <div className="movie-detail-poster">
              <img src={movie.Poster} />
            </div>
          </div>
          <div className="movie-detail-column">
            <div className="movie-details">
              <div>
                <h1>{movie.Title}</h1>
              </div>

              <div>
                <p>Year: {movie.Year}</p>
              </div>

              <div>
                <p>Rating: {movie.imdbRating}</p>
              </div>

              <div>
                <p>Released: {movie.Released}</p>
              </div>

              <div>
                <p>Actors: {movie.Actors}</p>
              </div>

              <div>
                <p>Awards: {movie.Awards}</p>
              </div>

              <div>
                <p>Genre: {movie.Genre}</p>
              </div>

              <div className="plot-style">
                <p>Plot: {movie.Plot}</p>
              </div>

              <div>
                <button>Add To Favorites</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    )
}

export default MovieDetail