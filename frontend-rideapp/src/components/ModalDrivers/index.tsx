
import React from 'react';
import Modal from 'react-modal';
import { DriversCard } from '../DriversCard';

Modal.setAppElement('#root');

interface Driver {
  id: string;
  nome: string;
  photo: string;
  descricao: string;
  carro: string;
  avaliacao: number;
  valorTotal: number;
}

interface ModalDriversProps {
  isOpen: boolean;
  onRequestClose: () => void;
  drivers: Driver[];
  onSelectDriver: (driver: Driver) => void;
}

const ModalDrivers: React.FC<ModalDriversProps> = ({
  isOpen,
  onRequestClose,
  drivers,
  onSelectDriver,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Motoristas Disponíveis</h2>

      {drivers.length === 0 ? (
        <p>Não há motoristas disponíveis no momento.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {drivers.map((driver) => (
            <li
              key={driver.id}
              style={{
                marginBottom: '20px',
                borderBottom: '1px solid #ccc',
                paddingBottom: '10px',
              }}
            >
              <DriversCard
                id={driver.id}
                nome={driver.nome}
                photo={driver.photo}
                descricao={driver.descricao}
                carro={driver.carro}
                avaliacao={driver.avaliacao}
                valorTotal={driver.valorTotal}
              />
              <button
                onClick={() => onSelectDriver(driver)}
                style={{
                  marginTop: '10px',
                  padding: '10px 20px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Selecionar
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={onRequestClose}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#6c757d',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Fechar
      </button>
    </Modal>
  );
};

export default ModalDrivers;
