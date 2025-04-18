// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegister from './pages/LoginRegister';
import Donate from './pages/Donate';
import { motion } from 'framer-motion';
import './App.css';

function Home() {
  return (
    <div className="bg-hotRed text-white min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ y: -200, opacity: 0, rotate: -5 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.1 }}
      >    
      <motion.img
         src={`${process.env.PUBLIC_URL}/secondServingLogo.png`}
         alt="Second Serving Logo"
         className="w-60 h-60 mb-6"
         animate={{ scale: [1, 1.05, 1] }}
         transition={{
           duration: 2,
           ease: 'easeInOut',
           repeat: Infinity,
           repeatType: 'loop'
         }}
      />
      </motion.div>
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-4 text-streetYellow"
        initial={{ y: -200, opacity: 0, rotate: -5 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.5 }}
      >
        Welcome to Second Serving
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl text-center max-w-xl text-paleDog mb-6 steam-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        Helping communities by redistributing extra meals to those in need. This is your one-stop app to share, donate, and support.
      </motion.p>
      <motion.a
        href="/login"
        className="bg-streetYellow text-black font-semibold px-6 py-3 rounded-full hover:bg-yellow-400 transition"
        initial={{ y: -200, scale: 0.7, opacity: 0 }}
        animate={{
          y: [ -200, 20, 0 ],          // start high, overshoot below, settle
          scale: [ 0.7, 1.2, 1 ],      // small → big → normal
          opacity: [ 0, 1, 1 ]         // fade in while moving
        }}
        transition={{
          duration: 0.8,
          delay: 1.8,
          ease: 'easeOut'
        }}
      >
  Get Started
</motion.a>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
    </Router>
  );
}

export default App;
