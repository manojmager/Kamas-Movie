import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import "./add-movie-container.css";

const GENRES = [
  "Series", "Anime", "Romance", "Comedy", "Drama", 
  "Thriller", "Horror", "Mystery", "Action", "Sci-Fi", "Fantasy"
];

function AddMovieContainer({ addMovie }) {
  const [name, setName] = useState("");
  const [genres, setGenres] = useState([]); // Store multiple genres
  const [watched, setWatched] = useState(false);
  // const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || genres.length === 0) {
      alert("Please enter a movie name and select at least one genre!");
      return;
    }
    const username = localStorage.getItem("username"); // Get logged-in user
    if (!username) {
      alert("No user found. Please log in.");
      return;
    }
  
    const newMovie = { name, genres, watched };

    try {
      const docRef = await addDoc(collection(firestore, "users", username, "movies"), newMovie);
      console.log("Document written with ID: ", docRef.id);
      addMovie({ ...newMovie, id: docRef.id }); // Add to local state
      setName("");
      setGenres([]);
      setWatched(false);
      // setInputValue("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleAddGenre = (genre) => {
    if (!genres.includes(genre)) {
      setGenres([...genres, genre]);
    }
  };

  const handleRemoveGenre = (genre) => {
    setGenres(genres.filter((g) => g !== genre));
  };

  return (
    <form onSubmit={handleSubmit} className="form-add-movie">
      <input
        type="text"
        placeholder="Movie Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Genre Tag Input */}
      <div className="genre-tag-container">
        {genres.map((genre) => (
          <span key={genre} className="tag">
            {genre} <button type="button" onClick={() => handleRemoveGenre(genre)}>x</button>
          </span>
        ))}
        {/* <input
          type="text"
          placeholder="Type or select a genre..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputValue) {
              e.preventDefault();
              handleAddGenre(inputValue);
              setInputValue("");
            }
          }}
        /> */}
      </div>

      {/* Genre Selection Buttons */}
      <div className="genre-buttons">
        {GENRES.map((genre) => (
          <button
            type="button"
            key={genre}
            className={genres.includes(genre) ? "selected" : ""}
            onClick={() => handleAddGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      <label>
        <input
          type="checkbox"
          checked={watched}
          onChange={(e) => setWatched(e.target.checked)}
        />
        Movie Watched?
      </label>

      <button type="submit" className="addMovieBtn">Add</button>
    </form>
  );
}

export default AddMovieContainer;
