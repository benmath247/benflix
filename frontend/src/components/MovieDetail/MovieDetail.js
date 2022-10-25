import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import apiKey from '../Movie/apikey';
import './MovieDetail.css'
import Spinner from '../Spinner/Spinner';

import { toast } from 'react-toastify'

function MovieDetail() {
    let { title } = useParams();
    const [movie, setMovie] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    async function fetchMovieDetail() {
        try {
            let resp = await axios.get(`http://www.omdbapi.com/?t=${title}&apikey=${apiKey()}`)
            setMovie(resp.data)
            setIsLoading(false)
        } catch { }
    }

    async function addToFavorites() {
        try {

            let payload = await axios.post("http://localhost:3001/api/user/add-to-favorites", {

                title: movie.Title,
                image: movie.Poster,
                plot: movie.Plot,
                imdbID: movie.imdbID
            }, {
                headers:
                {
                    authorization: "Bearer " + window.localStorage.getItem("jwtToken")
                }
            }
            )
            console.log(payload)
            toast.success("Favorite movie added")
        } catch (e) {
            console.log(e)
        }

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
                                <button onClick={addToFavorites}>Add To Favorites</button>
                            </div>
                        </div>
                    </div>
                </>
            )
            }
        </div >
    )
}


export default MovieDetail