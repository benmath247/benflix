import React from 'react'
import { Link } from 'react-router-dom'

function MovieList({ movieArray }) {
  return (
    
      <div className="movie-list-container">
        {movieArray.map((item) => {
          return (<div key={item.imdbId}>
            <div>
              <img src={item.Poster} /></div>
            <div><Link to={`/movie/${item.Title}`}><h2>{item.Title}
            </h2></Link></div>
          </div>
          )
        })}</div>

  )
}

export default MovieList