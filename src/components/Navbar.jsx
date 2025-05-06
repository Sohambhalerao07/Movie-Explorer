import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = ({ onSearch }) => {
  return (
    <motion.nav
  className="flex justify-between items-center p-4 shadow-lg bg-gradient-to-r from-indigo-900 to-black text-white"
  initial={{ y: -50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.6 }}
>

      <div className="text-2xl font-bold flex items-center gap-2">
        <span role="img" aria-label="film">🎬</span> MovieExplorer
      </div>
      <Link
  to="/favorites"
  className="text-sm flex items-center gap-1 bg-indigo-300 text-black px-3 py-2 rounded shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
>
        <span role="img" aria-label="heart">❤️</span> Favorites
      </Link>
    </motion.nav>
  );
};

export default Navbar;
