import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Transacoes from './pages/Transacoes';
import Extrato from './pages/Extrato';
import { Box, Button, CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import { Navbar } from './components/Navbar';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';


function App() {

  const redirectToTransacoes = () => {
    window.location.href = '/transacoes';
  };

  const redirectToExtrato = () => {
    window.location.href = '/extrato';
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/transacoes" element={<Transacoes />} />
          <Route path="/extrato" element={<Extrato />} />
        </Routes>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh">
          <Box width="300px">
            <Button variant="contained" onClick={redirectToTransacoes} fullWidth style={{ display: window.location.pathname === '/transacoes' || window.location.pathname === '/extrato' ? 'none' : 'block' }} sx={{ marginBottom: '16px' }}>
              Enviar Transacao
              <ArrowOutwardIcon />
            </Button>
            <Button variant="contained" onClick={redirectToExtrato} fullWidth style={{ display: window.location.pathname === '/transacoes' || window.location.pathname === '/extrato' ? 'none' : 'block' }}>
              Acessar Extrato
              <ArrowOutwardIcon />
            </Button>
          </Box>
        </Box>
      </Router>
    </ThemeProvider >
  );
}

export default App;
