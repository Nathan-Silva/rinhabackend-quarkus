import React, { useEffect, useState } from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';
import { format } from 'date-fns';
import axios from 'axios';

interface ExtratoItem {
  id: string;
  descricao: string;
  valor: number;
  realizada_em: string;
  tipo: string;
}

interface Saldo {
  total: number;
  data_extracao: string;
  limite: number;
}

const Extrato: React.FC = () => {
  const [saldo, setSaldo] = useState<Saldo>({
    total: 0,
    data_extracao: '',
    limite: 0,
  });
  const [ultimasTransacoes, setUltimasTransacoes] = useState<ExtratoItem[]>([]);

  useEffect(() => {
    // Obter o ID do usuário da outra aba/janela
    const userId = localStorage.getItem('userId');

    if (userId) {
      // Fazer a chamada GET para o endpoint /clientes/[id]/extrato com o ID do usuário
      axios.get(`http://localhost:9999/clientes/${userId}/extrato`)
        .then((response) => {
          console.log(response)
          // Definir o saldo
          setSaldo(response.data.saldo);
          // Definir as últimas transações
          setUltimasTransacoes(response.data.ultimas_transacoes);
        })
        .catch((error) => {
          console.error('Erro ao obter extrato:', error);
        });
    } else {
      console.error('ID do usuário não encontrado.');
    }
  }, []);

  return (
    <div>
      <Box sx={{ margin: '16px' }} >
        <Typography variant="h3" gutterBottom>Saldo</Typography>
        <Typography>Total: R${saldo.total.toFixed(2)}</Typography>
        <Typography>Data de Extração: {new Date(saldo.data_extracao).toLocaleString()}</Typography>
        <Typography>Limite: R${saldo.limite.toFixed(2)}</Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        >
        <Typography variant="h6" gutterBottom>Últimas Transações</Typography>
        {ultimasTransacoes.map((transacao, index) => (
          <Card key={index} variant="outlined" sx={{ marginBottom: '16px' }}>
            <CardContent>
              <Typography variant="subtitle1">Descrição: {transacao.descricao}</Typography>
              <Typography variant="body2">Valor: R${transacao.valor.toFixed(2)} | Data: {transacao.realizada_em ? format(new Date(transacao.realizada_em.replace(' ', 'T')), 'dd/MM/yyyy HH:mm:ss') : 'Data indisponível'}</Typography>
              <Typography variant="subtitle1">Tipo da Transacao: {transacao.tipo === 'r' ? 'Recebíveis' : 'Débito'}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default Extrato;
