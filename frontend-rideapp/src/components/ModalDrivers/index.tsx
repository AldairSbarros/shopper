

// import React from 'react';
// import Modal from 'react-modal';
// import { DriversCard } from '../DriversCard';

// Modal.setAppElement('#root');

// interface Driver {
//   id: string;
//   nome: string;
//   photo: string;
//   descricao: string;
//   carro: string;
//   avaliacao: number;
//   valorTotal: number;
// }

// interface Location {
//   lat: number;
//   lng: number;
// }

// interface ModalDriversProps {
//   isOpen: boolean;
//   onRequestClose: () => void;
//   drivers: Driver[];
//   onSelectDriver: (driver: Driver) => void;
//   origin: Location;
//   destination: Location;
// }

// const ModalDrivers: React.FC<ModalDriversProps> = ({
//   isOpen,
//   onRequestClose,
//   drivers,
//   onSelectDriver,
//   origin,
//   destination,
// }) => {
//   const googleMapsApiKey = 'AIzaSyBT7Adutv_LO28oR454JmCKTvxtt4ZTGmQ';
//   const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=800x600&path=color:0x0000ff|weight:5|${origin.lat},${origin.lng}|${destination.lat},${destination.lng}&markers=color:green|label:A|${origin.lat},${origin.lng}&markers=color:red|label:B|${destination.lat},${destination.lng}&key=${googleMapsApiKey}`;

//   return (
//     <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
//       <h2>Motoristas Disponíveis</h2>

//       <div>
//         <img src={mapUrl} alt="Mapa da Rota" style={{ width: '30%', height: 'auto' }} />
//       </div>

//       {drivers.length === 0 ? (
//         <p>Não há motoristas disponíveis no momento.</p>
//       ) : (
//         <ul style={{ listStyleType: 'none', padding: 0 }}>
//           {drivers.map((driver) => (
//             <li
//               key={driver.id}
//               style={{
//                 marginBottom: '20px',
//                 borderBottom: '1px solid #ccc',
//                 paddingBottom: '10px',
//               }}
//             >
//               <DriversCard
//                 id={driver.id}
//                 nome={driver.nome}
//                 photo={driver.photo}
//                 descricao={driver.descricao}
//                 carro={driver.carro}
//                 avaliacao={driver.avaliacao}
//                 valorTotal={driver.valorTotal}
//               />
//               <button
//                 onClick={() => onSelectDriver(driver)}
//                 style={{
//                   marginTop: '10px',
//                   padding: '10px 20px',
//                   backgroundColor: 'rgb(6, 88, 24)',
//                   color: '#fff',
//                   border: 'none',
//                   borderRadius: '5px',
//                   cursor: 'pointer',
//                 }}
//               >
//                 Selecionar
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}

//       <button
//         onClick={onRequestClose}
//         style={{
//           marginTop: '20px',
//           padding: '10px 20px',
//           backgroundColor: '#6c757d',
//           color: '#fff',
//           border: 'none',
//           borderRadius: '5px',
//           cursor: 'pointer',
//         }}
//       >
//         Fechar
//       </button>
//     </Modal>
//   );
// };

// export default ModalDrivers;

////////////////////////////////////////////////////


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
