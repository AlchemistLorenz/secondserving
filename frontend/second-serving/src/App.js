import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegister from './pages/LoginRegister';
import './App.css';

function Home() {
  return (
    <div className="bg-hotRed text-white min-h-screen flex flex-col items-center justify-center px-4">
      <img
        src={`${process.env.PUBLIC_URL}/secondServingLogo.png`}
        alt="Second Serving Logo"
        className="w-60 h-60 mb-6"
      />
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-streetYellow">
        Welcome to Second Serving
      </h1>
      <p className="text-lg md:text-xl text-center max-w-xl text-paleDog">
        Helping communities by redistributing extra meals to those in need. This is your one-stop app to share, donate, and support.
      </p>
      <div className="mt-8">
        <a
          href="/login"
          className="bg-streetYellow text-black font-semibold px-6 py-3 rounded-full hover:bg-yellow-400 transition"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginRegister />} />
      </Routes>
    </Router>
  );
}

export default App;
