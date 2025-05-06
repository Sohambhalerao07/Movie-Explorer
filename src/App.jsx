import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import MovieDetails from './pages/MovieDetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black text-white">
      <Router>
        <Navbar />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/movie/:imdbID" element={<MovieDetails />} />
          </Routes>
        </main>
      </Router>
    </div>
        <Footer />
    </>
  );
}

export default App;
