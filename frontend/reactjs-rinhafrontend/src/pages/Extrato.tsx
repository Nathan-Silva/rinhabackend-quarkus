import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ExtratoItem {
  id: string;
  descricao: string;
  valor: number;
  data: string;
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
      <h2>Extrato</h2>
      <div>
        <h3>Saldo</h3>
        <p>Total: R${saldo.total.toFixed(2)}</p>
        <p>Data de Extração: {new Date(saldo.data_extracao).toLocaleString()}</p>
        <p>Limite: R${saldo.limite.toFixed(2)}</p>
      </div>
      <div>
        <h3>Últimas Transações</h3>
        <ul>
          {ultimasTransacoes.map((transacao, index) => (
            <li key={index}>
              <p>Descrição: {transacao.descricao}</p>
              <p>Valor: R${transacao.valor.toFixed(2)}</p>
              <p>Data: {new Date(transacao.data).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Extrato;
