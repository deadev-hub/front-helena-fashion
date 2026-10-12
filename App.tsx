import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './src/pages/Home';
import Admin from './src/pages/Admin';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="font-sans text-stone-700 antialiased scroll-smooth">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;