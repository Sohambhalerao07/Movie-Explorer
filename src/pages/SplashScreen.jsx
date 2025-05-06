import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start the fade-out after 1.8 seconds to give time for the animation to trigger
    const timer = setTimeout(() => {
      setIsFadingOut(true); // Trigger the fade-out
    }, 1800); // 1.8 seconds delay for fade-out effect

    const completeTimer = setTimeout(() => {
      onComplete(); // Complete the loading after fade-out
    }, 2000); // 2 seconds total for splash screen

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`flex items-center justify-center h-screen text-white bg-gradient-to-br from-black via-indigo-950 to-black transition-opacity duration-1000 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <h1 className="text-4xl font-bold animate-pulse">🎬 Movie Explorer</h1>
    </div>
  );
};

export default SplashScreen;
