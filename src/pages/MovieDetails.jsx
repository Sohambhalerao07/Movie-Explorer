import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_KEY = 'db83c79f';

function MovieDetails() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setMovie(data);

        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const exists = storedFavorites.some(fav => fav.imdbID === data.imdbID);
        setIsFavorite(exists);
      });
  }, [imdbID]);

  const toggleFavorite = () => {
    let storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isFavorite) {
      storedFavorites = storedFavorites.filter(fav => fav.imdbID !== movie.imdbID);
    } else {
      storedFavorites.push(movie);
    }

    localStorage.setItem('favorites', JSON.stringify(storedFavorites));
    setIsFavorite(!isFavorite);
  };

  if (!movie) return <div className="p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black text-white">
      <div className="container mx-auto px-4 py-6">
        <Link to="/" className="text-white mb-4 block">← Back to Movies</Link>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Poster */}
          <div>
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
              alt={movie.Title}
              className="w-64 rounded shadow-lg"
            />
          </div>

          {/* Main Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{movie.Title}</h1>
            <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-300">
              <span className="bg-gray-700 px-2 py-1 rounded">{movie.Year}</span>
              <span className="bg-gray-700 px-2 py-1 rounded">{movie.Runtime}</span>
              {movie.Genre?.split(',').map((g, i) => (
                <span key={i} className="bg-gray-700 px-2 py-1 rounded">{g.trim()}</span>
              ))}
            </div>

            {/* IMDb + Favorite */}
            <div className="flex items-center gap-4 mt-4">
              <p className="text-lg">⭐ {movie.imdbRating} IMDb</p>
              <button
                className={`px-4 py-2 border rounded ${isFavorite ? 'bg-blue-200 text-white' : 'text-blue-400 border-blue-600'} transition-colors duration-300`}
                onClick={toggleFavorite}
              >
                {isFavorite ? '★ Added to Favorites' : '♡ Add to Favorites'}
              </button>
            </div>

            {/* Plot */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Overview</h3>
              <p>{movie.Plot}</p>
            </div>

            {/* Cast */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Cast</h3>
              <div className="flex flex-wrap gap-4 text-center">
                {movie.Actors?.split(',').map((actor, index) => (
                  <div key={index} className="w-28">
                    <div className="bg-gray-700 h-20 w-20 rounded-full mx-auto mb-1" />
                    <p className="text-sm font-medium">{actor.trim()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Details & Production */}
            <div className="mt-6 grid md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <h4 className="font-semibold">Director</h4>
                <p>{movie.Director}</p>
                <h4 className="font-semibold mt-2">Writers</h4>
                <p>{movie.Writer}</p>
                <h4 className="font-semibold mt-2">Release Date</h4>
                <p>{movie.Released}</p>
              </div>
              <div>
                <h4 className="font-semibold">Production</h4>
                <p>{movie.Production || 'N/A'}</p>
                <h4 className="font-semibold mt-2">Box Office</h4>
                <p>{movie.BoxOffice || 'N/A'}</p>
                <h4 className="font-semibold mt-2">Awards</h4>
                <p>{movie.Awards || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
