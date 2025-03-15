import React from 'react';
import './Movie-list-container.css';
import EmptyContainer from './EmptyContainer';

function MovieListContainer({ movies, selectedGenre }) {
    // Filter movies correctly based on multi-genre selection
    const filteredMovies = selectedGenre === "All"
        ? movies
        : movies.filter(movie => movie.genres.includes(selectedGenre));

    // Separate movies into "Want to Watch" and "Watched" categories
    const wantToWatch = filteredMovies.filter(movie => !movie.watched);
    const watched = filteredMovies.filter(movie => movie.watched);

    // Scroll to AddMovieContainer
    const handleAddMovieClick = () => {
      const addMovieSection = document.getElementById("add-movie-container");
      if (addMovieSection) {
          addMovieSection.scrollIntoView({ behavior: "smooth" });
      }
    };
    return (
      <div className='movie-list-container'>
        <div className='want-to-watch-container'>
          <h1>Want to Watch</h1>
          <button onClick={handleAddMovieClick}>Add a Movie</button>
          {wantToWatch.length === 0 ? (<EmptyContainer/>) : 
          <ul>
            {wantToWatch.map((movie, index) => (
              <li key={movie.id}>
                <div className='list-item'>{movie.name}</div>
              </li>
            ))}
          </ul>}
        </div>

        <div className='watched-container'>
          <h1>Watched</h1>
          {watched.length === 0 ? (<EmptyContainer/>) : 
          <ul>
            {watched.map((movie, index) => (
                <li key={movie.id}>
                  <div className='list-item'>{movie.name}</div>
                </li>
              ))}
          </ul>}
        </div>
      </div>
    );
}

export default MovieListContainer;
