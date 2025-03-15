import MovieListContainer from "../MovieList/MovieListContainer";
import AddMovieContainer from "../AddMovie/AddMovieContainer";
import './movie-content.css'

function MovieContent({ movies, addMovie, selectedGenre }) {
  return (
    <>
      <div className="full-screen-container">
        <MovieListContainer movies={movies} selectedGenre={selectedGenre} />
      </div>
      <div id='add-movie-container' className='add-movie-container'>
        <AddMovieContainer addMovie={addMovie} />
      </div>
    </>
  );
}

export default MovieContent;