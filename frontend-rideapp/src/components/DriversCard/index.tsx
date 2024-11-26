import React from 'react';

interface DriversProps {
  id: string;
  nome: string;
  photo: string;
  descricao: string;
  carro: string;
  avaliacao: number;
  valorTotal: number;
}

export const DriversCard: React.FC<DriversProps> = ({ id, nome, photo, descricao, carro, avaliacao, valorTotal }) => {
  return (
    <li>
      <h3>Nome: {nome}</h3>
      <img src={photo} alt={`Foto do Motorista ${nome}`} />
      <h4>Descrição: {descricao}</h4>
      <h4>Veículo: {carro}</h4>
      <h4>Avaliação: {avaliacao}</h4>
      <h4>Valor da Viagem: R$ {valorTotal.toFixed(2)}</h4>
    </li>
  );
};
