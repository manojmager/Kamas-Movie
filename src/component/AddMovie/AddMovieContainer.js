import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../../firebase"; // Ensure correct import

function AddMovieContainer({ addMovie }) {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [watched, setWatched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !genre) {
      alert("Please enter both name and genre!");
      return;
    }

    const newMovie = { name, genre, watched };

    try {
      const docRef = await addDoc(collection(firestore, "movies"), newMovie);
      console.log("Document written with ID: ", docRef.id);
      
      addMovie({ ...newMovie, id: docRef.id }); // Add to local state as well
      setName("");
      setGenre("");
      setWatched(false);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-add-movie">
      <input
        type="text"
        placeholder="Movie Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={watched}
          onChange={(e) => setWatched(e.target.checked)}
        />
        Movie Watched?
      </label>
      <button type="submit">Add</button>
    </form>
  );
}

export default AddMovieContainer;