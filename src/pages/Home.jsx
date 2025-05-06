import React, { useEffect, useState } from 'react';
import MovieGrid from '../components/MovieGrid';

const API_KEY = 'db83c79f';

function Home() {
  const [search, setSearch] = useState(() => {
    // Get the search term from localStorage, or default to 'Avengers'
    return localStorage.getItem('searchTerm') || 'Avengers';
  });
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    fetch(`https://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          Promise.all(
            data.Search.map((movie) =>
              fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`)
                .then((res) => res.json())
                .then((fullMovie) => {
                  const isFavorite = storedFavorites.some(
                    (fav) => fav.imdbID === fullMovie.imdbID
                  );
                  return { ...fullMovie, isFavorite };
                })
            )
          ).then((fullMovies) => {
            setMovies(fullMovies);
          });
        } else {
          setMovies([]);
        }
      });

    setFavorites(storedFavorites);
  }, [search]);

  const handleToggleFavorite = (movie) => {
    setFavorites((prev) => {
      const isAlreadyFavorite = prev.some((fav) => fav.imdbID === movie.imdbID);
      const updatedFavorites = isAlreadyFavorite
        ? prev.filter((fav) => fav.imdbID !== movie.imdbID)
        : [...prev, movie];

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });

    setMovies((prevMovies) =>
      prevMovies.map((m) =>
        m.imdbID === movie.imdbID ? { ...m, isFavorite: !m.isFavorite } : m
      )
    );
  };

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    // Save the search term in localStorage
    localStorage.setItem('searchTerm', newSearch);
  };

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Search movies..."
        className="w-full border p-2 mb-4 rounded-2xl"
        value={search}
        onChange={handleSearchChange}
      />
      <MovieGrid movies={movies} onToggleFavorite={handleToggleFavorite} />
    </div>
  );
}

export default Home;
