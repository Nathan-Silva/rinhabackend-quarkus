import React, { useState } from 'react';
import { Button, CssBaseline, ThemeProvider, TextField, MenuItem, Box } from '@mui/material';
import theme from '../theme';
import axios from 'axios';

const Transacoes: React.FC = () => {
  const [idCliente, setIdCliente] = useState<string>('');
  const [valor, setValor] = useState<number>(0);
  const [tipo, setTipo] = useState<string>('D');
  const [descricao, setDescricao] = useState<string>('');

  const handleIdClienteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdCliente(event.target.value);
  };

  const handleValorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValor(Number(event.target.value));
  };

  const handleTipoChange = (event: React.ChangeEvent<any>) => {
    setTipo(event.target.value);
  };

  const handleDescricaoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescricao(event.target.value);
  };

  const transactionTye = [
    {
      value: 'D',
      label: 'Débito'
    },
    {
      value: 'R',
      label: 'Recebíveis'
    }
  ];

  const handleSubmit = async () => {
    const transacaoData = {
      valor: valor,
      tipo: tipo,
      descricao: descricao
    };

    try {
      // Fazer a chamada POST para o endpoint /clientes/[id]/transacoes
      const response = await axios.post(`http://localhost:9999/clientes/${idCliente}/transacoes`, transacaoData);

      // Verificar se a resposta foi bem-sucedida
      if (response.status === 200) {
        localStorage.setItem('userId', idCliente);

      } else {
        console.error('Erro ao fazer a transação:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao fazer a transação:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Box width="300px">
        <TextField id="outlined-basic" label="Id do cliente" variant="outlined" value={idCliente} onChange={handleIdClienteChange} fullWidth sx={{ marginBottom: '16px' }} />
        <TextField id="outlined-basic" label="Valor que deseja enviar" variant="outlined" value={valor} onChange={handleValorChange} fullWidth sx={{ marginBottom: '16px' }} />
        <TextField
          id="outlined-select-currency"
          select
          label="Tipo de transacao"
          defaultValue="Débito"
          value={tipo}
          sx={{ marginBottom: '16px' }}
          onChange={handleTipoChange}
          fullWidth
        >
          {transactionTye.map((option) => (
            <MenuItem key={option.value} value={option.value} >
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField id="outlined-basic" label="Deixe sua mensagem:" variant="outlined" value={descricao} onChange={handleDescricaoChange} sx={{ marginBottom: '16px' }} fullWidth />
        <Button variant="contained" size="large" fullWidth onClick={handleSubmit}>Enviar Transacao</Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Transacoes;
