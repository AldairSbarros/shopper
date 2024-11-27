import React from 'react';
import styles from './styles.module.scss';

interface DriversProps {
  id: string;
  nome: string;
  photo: string;
  descricao: string;
  carro: string;
  avaliacao: number;
  valorTotal: number;
  
}

export const DriversCard: React.FC<DriversProps> = ({ nome, photo, descricao, carro, avaliacao, valorTotal }) => {
  return (
    <li className={styles.card}>
      <h3 className={styles.nome}>Nome: {nome}</h3>
      <img src={photo} alt={`Foto do Motorista ${nome}`} className={styles.photo} />
      <div className={styles.info}>
        <h4>Descrição: {descricao}</h4>
        <h4>Veículo: {carro}</h4>
        <h4>Avaliação: {avaliacao}</h4>
        <h4>Valor da Viagem: R$ {valorTotal.toFixed(2)}</h4>
       
        
      </div>
    </li>
  );
};
