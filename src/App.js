import './App.css';
import Header from './component/Header/header';
import AddMovieContainer from './component/AddMovie/AddMovieContainer';
import MovieListContainer from './component/MovieList/MovieListContainer';
import { firestore } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';

function ParentContainer({ movies, addMovie, selectedGenre }) {
  return (
    <>
      <div className="full-screen-container">
        <MovieListContainer movies={movies} selectedGenre={selectedGenre} />
      </div>
      <div>
        <AddMovieContainer addMovie={addMovie} />
      </div>
    </>
  );
}

function App() {
  const [MOVIES, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Fetch movies from Firebase
  useEffect(() => {
    const fetchMovies = async () => {
      const moviesCollection = collection(firestore, "movies");
      const movieSnapshot = await getDocs(moviesCollection);
      const movieList = movieSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMovies(movieList);
    };

    fetchMovies();
  }, []);

  // Function to add a new movie to the list
  const addMovie = (newMovie) => {
    setMovies((prevMovies) => [...prevMovies, newMovie]);
  };

  // Ensure genres update dynamically
  const uniqueGenres = [...new Set(MOVIES.flatMap(movie => movie.genres || []))];

  return (
    <div className="App">
      <Header genres={uniqueGenres} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
      <ParentContainer movies={MOVIES} addMovie={addMovie} selectedGenre={selectedGenre} />
    </div>
  );
}

export default App;