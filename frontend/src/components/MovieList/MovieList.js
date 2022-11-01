import React from 'react'
import { Link } from 'react-router-dom'

function MovieList({ movieArray }) {
  return (

    <div className="movie-list-container">
      {movieArray.map((item) => {

        let poster = item.Poster !== "N/A" ? item.Poster : "https://via.placeholder.com/300x477"
        let title = item.Poster !== "N/A" ? "" : item.Title

        return (<div key={item.imdbID}>
          <Link to={`/movie/${item.Title}`}>
            <div style={{color: "red"}}>
              <img src={poster} alt={item.Title} />
              <h3>
                {title}
                </h3>
              </div>

          </Link>
        </div>
        )
      })}</div>

  )
}

export default MovieList