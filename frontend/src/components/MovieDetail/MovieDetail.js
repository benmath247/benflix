import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import apiKey from '../Movie/apikey';
import './MovieDetail.css'

function MovieDetail() {
    let { title } = useParams();
    const [movie, setMovie] = useState("")

    async function fetchMovieDetail() {
        try {
            let resp = await axios.get(`http://www.omdbapi.com/?t=${title}&apikey=${apiKey()}`)
            setMovie(resp.data)
        } catch { }
    }

    useEffect(() => {
        fetchMovieDetail()

    }, [])
    console.log(movie)
    return (
        <div className="movie-detail-container">
            <div className="movie-detail-column">
                <h1>{movie.Title}</h1>
                <div className="movie-detail-poster">
                    <img src={movie.Poster}/> <br />
                </div>
                    {movie.Plot}
                    <br />
                    Actors: {movie.Actors}
            </div>
        </div>
    )
}

export default MovieDetail