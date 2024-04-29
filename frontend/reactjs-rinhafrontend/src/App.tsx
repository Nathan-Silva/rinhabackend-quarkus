import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Transacoes from './pages/Transacoes';
import Extrato from './pages/Extrato';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/transacoes" element={<Transacoes />} />
        <Route path="/extrato" element={<Extrato />} />
        <Route path="/" element={<Navigate to="/transacoes" />} />
      </Routes>
    </Router>
  );
}

export default App;
