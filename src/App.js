import './App.css';
import Header from './component/Header/header';
import MovieContent from './component/MovieContent/MovieContent'
import { firestore } from './firebase';
import { collection, doc, getDoc, setDoc, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';

function App() {
  const [MOVIES, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [username, setUsername] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      fetchMovies(storedUsername); // 🔹 Fetch movies on load
    }
  }, []);

  const fetchMovies = async (user) => {
    const moviesCollection = collection(firestore, "users", user, "movies");
    const movieSnapshot = await getDocs(moviesCollection);
    const movieList = movieSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setMovies(movieList);
  };

  // Function to add a new movie to the list
  const addMovie = (newMovie) => {
    setMovies((prevMovies) => [...prevMovies, newMovie]);
  };
  // Ensure genres update dynamically
  const uniqueGenres = [...new Set(MOVIES.flatMap(movie => movie.genres || []))];

  const handleLoginSubmit = async () => {
    if (!inputValue.trim()) return;
    const userRef = doc(firestore, "users", inputValue);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, { createdAt: new Date() });
    }
    localStorage.setItem("username", inputValue);
    setUsername(inputValue); // Now officially log the user in
    fetchMovies(inputValue);
  };

  return (
    <div className="App">
      <>
        <div className='auth-container'>{!username ?
          (<div className='login-container'>
            <input
              type="text"
              placeholder="Choose a nickname"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              onClick={handleLoginSubmit}>Login
            </button> 
          </div>) : <div className='logged-in-container'>@ {username}</div>}
        </div>
        <Header genres={uniqueGenres} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
        <MovieContent movies={MOVIES} addMovie={addMovie} selectedGenre={selectedGenre} />
      </>
    </div>
  );
}

export default App;