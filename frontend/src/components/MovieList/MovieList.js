import React from 'react'

function MovieList({ movieArray }) {
  return (
    
      <div className="movie-list-container">
        {movieArray.map((item) => {
          return (<div key={item.imdbId}>
            <div>
              <img src={item.Poster} /></div>
            <div><h2>{item.Title}</h2></div>
          </div>
          )
        })}</div>

  )
}

export default MovieList