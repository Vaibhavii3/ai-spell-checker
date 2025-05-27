import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import TextProcessor from './components/textProcessor';
import Homepage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

function App() {

    return (
      <>
      <Toaster position='top-right' reverseOrder={false} />

      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/text" element={<TextProcessor />} />
        </Routes>
      </Router>

      </>
    );
}

export default App;
