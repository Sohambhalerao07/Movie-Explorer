import React, { useEffect, useState } from 'react';
import MovieGrid from '../components/MovieGrid';

function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteMovies(storedFavorites);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Your Favorite Movies</h2>
      <MovieGrid movies={favoriteMovies} />
    </div>
  );
}

export default Favorites;
