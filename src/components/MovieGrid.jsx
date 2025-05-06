import React from 'react';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, onToggleFavorite }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default MovieGrid;
