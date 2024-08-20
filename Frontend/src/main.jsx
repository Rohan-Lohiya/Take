import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Mines from './games/Mines.jsx';
import './index.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import Diceroll from './games/Diceroll.jsx';
import Games from './components/Games.jsx';
import Readhere from './components/Readhere.jsx';
import NotFound from './components/NotFound.jsx'; // You need a NotFound component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import './responsive.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Navbar /> {/* Navbar appears on all routes */}
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/games/mines" element={<Mines />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/diceroll" element={<Diceroll />} />
          <Route path="/about" element={<Readhere />} />
         {/* Catch-all route for 404 */}
        </Routes>
        <Footer /> {/* Footer appears on all routes */}
      </Router>
    </Provider>
  </React.StrictMode>
);
