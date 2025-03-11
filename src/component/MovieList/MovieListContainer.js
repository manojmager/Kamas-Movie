import React from 'react';
import './Movie-list-container.css';

function MovieListContainer({ movies, selectedGenre }) {
    const filteredMovies = selectedGenre === "All" ? movies : movies.filter(movie => movie.genre === selectedGenre);
    const wantToWatch = filteredMovies.filter(movie => !movie.watched);
    const watched = filteredMovies.filter(movie => movie.watched);

    return (
      <div className='movie-list-container'>
        <div className='want-to-watch-container'>
          <h1>Want to Watch</h1>
          <button>Add a Movie</button>
          <ul>
            {wantToWatch.map(movie => (
                <li key={movie.id}>{movie.name}</li>
              ))}
          </ul>
        </div>

        <div className='watched-container'>
          <h1>Watched</h1>
          <ul>
            {watched.map(movie => (
                <li key={movie.id}>{movie.name}</li>
              ))}
          </ul>
        </div>
      </div>
    );
}

export default MovieListContainer;