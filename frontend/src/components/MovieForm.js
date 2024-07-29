import React, { useState } from "react";
import axios from "axios";
import "./MovieForm.css"; // Import the CSS file

const MovieForm = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [year, setYear] = useState('');
  const [category, setCategory] = useState('Action');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !rating || !year || !category || !image) {
      alert('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('rating', rating);
    formData.append('year', year);
    formData.append('category', category);
    formData.append('image', image);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/movies`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response from server:', response.data);
      alert('Movie added successfully!');
      setName('');
      setRating('');
      setYear('');
      setCategory('Action');
      setImage(null);
    } catch (error) {
      console.error('There was an error adding the movie!', error.response.data);
      alert(`Error: ${error.response.data.message}`);
    }
  };

  return (
    <div className="form-container">
      <h1>Add a Movie</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Movie Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Rating:</label>
          <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} required />
        </div>
        <div>
          <label>Year:</label>
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
        </div>
        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="Action">Action</option>
            <option value="Drama">Drama</option>
            <option value="Comedy">Comedy</option>
            <option value="Horror">Horror</option>
            <option value="Sci-Fi">Sci-Fi</option>
          </select>
        </div>
        <div>
          <label>Movie Image:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        </div>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default MovieForm;
