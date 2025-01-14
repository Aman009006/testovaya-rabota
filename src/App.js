import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import FAQ from "./components/FAQ";
import Reviews from "./components/Reviews";
import Help from "./components/Help";
import Data from "./components/Data";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <Router>
      <div>
      <nav className="nav">
      <div className="containerNav">
        <div className="logo">
          <a href="/">FAST CHANGER</a>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <a href="/faq" onClick={() => setIsMenuOpen(false)}>FAQ</a>
          <a href="/help" onClick={() => setIsMenuOpen(false)}>Help</a>
          <a href="/reviews" onClick={() => setIsMenuOpen(false)}>Reviews</a>
          <a target="_blank" href="https://upload.wikimedia.org/wikipedia/commons/a/a3/Woolly_mammoth_%28Mammuthus_primigenius%29_-_Mauricio_Ant%C3%B3n.jpg" onClick={() => setIsMenuOpen(false)}>
            <img
              className="tg"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/512px-Telegram_2019_Logo.svg.png"
              alt="Telegram"
            />
          </a>
          <h1 onClick={toggleMenu}>X</h1>
        </div>
      </div>
    </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/help" element={<Help />} />
          <Route path="/dataProcessing" element={<Data />} />
        </Routes>
        <footer className="footer">
          <div className="footer_text">
            <div className="logo">FAST CHANGER</div>
            <p>©2025 Cryptocurrency exchange service</p>
          </div>
          <a target="_blank" href="https://upload.wikimedia.org/wikipedia/commons/a/a3/Woolly_mammoth_%28Mammuthus_primigenius%29_-_Mauricio_Ant%C3%B3n.jpg" className="footer_link">
            support_fastchanger@proton.me
            <a href="#">
              <img
                className="tg"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/512px-Telegram_2019_Logo.svg.png"
              />
            </a>
          </a>
        </footer>
      </div>
    </Router>
  );
}

export default App;
