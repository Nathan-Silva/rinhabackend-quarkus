import React, { useState } from 'react';
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

  const handleTipoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTipo(event.target.value);
  };

  const handleDescricaoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescricao(event.target.value);
  };

  const handleSubmit = async () => {
    const transacaoData = {
      valor: valor,
      tipo: tipo,
      descricao: descricao
    };

    try {
      // Fazer a chamada POST para o endpoint /clientes/[id]/transacoes
      const response = await axios.post(`http://localhost:8080/clientes/${idCliente}/transacoes`, transacaoData);

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
    <div>
      <h2>Realizar Transação</h2>
      <div>
        <label htmlFor="idCliente">ID do Cliente:</label>
        <input type="text" id="idCliente" value={idCliente} onChange={handleIdClienteChange} />
      </div>
      <div>
        <label htmlFor="valor">Valor:</label>
        <input type="number" id="valor" value={valor} onChange={handleValorChange} />
      </div>
      <div>
        <label htmlFor="tipo">Tipo:</label>
        <select id="tipo" value={tipo} onChange={handleTipoChange}>
          <option value="D">Débito</option>
          <option value="R">Recebíveis</option>
          {/* Adicione outras opções conforme necessário */}
        </select>
      </div>
      <div>
        <label htmlFor="descricao">Descrição:</label>
        <input type="text" id="descricao" value={descricao} onChange={handleDescricaoChange} />
      </div>
      <button onClick={handleSubmit}>Realizar Transação</button>
    </div>
  );
};

export default Transacoes;
