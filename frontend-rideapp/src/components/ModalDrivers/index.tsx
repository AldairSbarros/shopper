

import React from 'react';
import Modal from 'react-modal';
import { DriversCard } from '../DriversCard';
import styles from './styles.module.scss';

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

interface Location {
  lat: number;
  lng: number;
}

interface ModalDriversProps {
  isOpen: boolean;
  onRequestClose: () => void;
  drivers: Driver[];
  onSelectDriver: (driver: Driver) => void;
  origin: Location;
  destination: Location;
}

const ModalDrivers: React.FC<ModalDriversProps> = ({
  isOpen,
  onRequestClose,
  drivers,
  onSelectDriver,
  origin,
  destination,
}) => {
  const googleMapsApiKey = 'AIzaSyBT7Adutv_LO28oR454JmCKTvxtt4ZTGmQ';
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=800x600&path=color:0x0000ff|weight:5|${origin.lat},${origin.lng}|${destination.lat},${destination.lng}&markers=color:green|label:A|${origin.lat},${origin.lng}&markers=color:red|label:B|${destination.lat},${destination.lng}&key=${googleMapsApiKey}`;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
    >
      <h2 className={styles.modalTitle}>Motoristas Disponíveis</h2>

      <div className={styles.mapContainer}>
        <img src={mapUrl} alt="Mapa da Rota" className={styles.map} />
      </div>

      {drivers.length === 0 ? (
        <p>Não há motoristas disponíveis no momento.</p>
      ) : (
        <ul className={styles.driverList}>
          {drivers.map((driver) => (
            <li key={driver.id} className={styles.driverItem}>
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
                className={styles.selectButton}
              >
                Selecionar
              </button>
            </li>
          ))}
        </ul>
      )}

      <button onClick={onRequestClose} className={styles.closeButton}>
        Fechar
      </button>
    </Modal>
  );
};

export default ModalDrivers;


