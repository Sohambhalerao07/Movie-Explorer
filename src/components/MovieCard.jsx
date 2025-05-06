import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MovieCard = ({ movie, onToggleFavorite }) => {
  const poster =
    movie.Poster && movie.Poster !== 'N/A'
      ? movie.Poster
      : 'https://via.placeholder.com/300x450?text=No+Image';

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(movie);
  };

  return (
    <motion.div
      className="bg-gray-900 text-white rounded-lg shadow-lg p-4 w-64"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Link to={`/movie/${movie.imdbID}`}>
        <img
          src={poster}
          alt={movie.Title}
          className="w-full h-80 object-cover rounded mb-2"
        />
        <h3 className="text-lg font-semibold">{movie.Title}</h3>
        <p className="text-sm text-gray-600">{movie.Year}</p>
        <p className="text-sm"><strong>IMDb:</strong> ⭐ {movie.imdbRating || 'N/A'}</p>
      </Link>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className={`mt-3 w-full py-2 px-4 rounded text-white font-semibold shadow-md 
          ${movie.isFavorite 
            ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' 
            : 'bg-gradient-to-r from-indigo-900 to-black'}`
        }
        onClick={handleFavoriteClick}
      >
        {movie.isFavorite ? '★ Added to Favorites' : '☆ Add to Favorites'}
      </motion.button>
    </motion.div>
  );
};

export default MovieCard;
