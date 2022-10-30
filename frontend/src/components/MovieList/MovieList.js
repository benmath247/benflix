import React from 'react'
import { Link } from 'react-router-dom'

function MovieList({ movieArray }) {
  return (

    <div className="movie-list-container">
      {movieArray.map((item) => {

        let poster = item.Poster !== "N/A" ? item.Poster : "https://via.placeholder.com/300x477"

        return (<div key={item.imdbID}>
            <Link to={`/movie/${item.Title}`}>
          <div>
            <img src={poster} /></div>
          <div style = {{ color: "red" }}>
            <h2>{item.Title}
          </h2>
          </div>
          </Link>
        </div>
        )
      })}</div>

  )
}

export default MovieList