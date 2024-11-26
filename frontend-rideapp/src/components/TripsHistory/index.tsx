

// import React, { useState } from 'react';
// import styles from './styles.module.scss';

// interface Trip {
//   id: string;
//   dataHora: string;
//   motorista: string;
//   origem: string;
//   destino: string;
//   distancia: string;
//   tempo: string;
//   valor: number;
// }

// interface TripsHistoryProps {
//   trips: Trip[];
//   goToHome: () => void;
// }

// const TripsHistory: React.FC<TripsHistoryProps> = ({ trips, goToHome }) => {
//   const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
//   const [filteredTrips, setFilteredTrips] = useState<Trip[]>(trips);

//   const handleFilter = () => {
//     if (selectedDriver) {
//       setFilteredTrips(trips.filter((trip) => trip.motorista === selectedDriver));
//     } else {
//       setFilteredTrips(trips);
//     }
//   };

//   const handleDelete = (id: string) => {
//     setFilteredTrips(filteredTrips.filter((trip) => trip.id !== id));
//   };

//   return (
//     <div className={styles.historyContainer}>
//       <h2>Histórico de Viagens</h2>
//       <div className={styles.filterContainer}>
//         <label htmlFor="driver">Motorista:</label>
//         <select id="driver" onChange={(e) => setSelectedDriver(e.target.value)}>
//           <option value="">Todos</option>
//           {Array.from(new Set(trips.map((trip) => trip.motorista))).map((motorista) => (
//             <option key={motorista} value={motorista}>{motorista}</option>
//           ))}
//         </select>
//         <button onClick={handleFilter} className={styles.filterButton}>Aplicar Filtro</button>
//       </div>
//       <ul className={styles.tripList}>
//         {filteredTrips.map((trip) => (
//           <li key={trip.id} className={styles.tripCard}>
//             <p>Data e Hora: {trip.dataHora}</p>
//             <p>Motorista: {trip.motorista}</p>
//             <p>Origem: {trip.origem}</p>
//             <p>Destino: {trip.destino}</p>
//             <p>Distância: {trip.distancia}</p>
//             <p>Tempo: {trip.tempo}</p>
//             <p>Valor: R$ {trip.valor.toFixed(2)}</p>
//             <button onClick={() => handleDelete(trip.id)} className={styles.deleteButton}>Excluir</button>
//           </li>
//         ))}
//       </ul>
//       <button onClick={goToHome} className={styles.backButton}>
//         Voltar para o Início
//       </button>
//     </div>
//   );
// };

// export default TripsHistory;



import React, { useState } from 'react';
import styles from './styles.module.scss';

interface Trip {
  id: string;
  dataHora: string;
  motorista: string;
  origem: string;
  destino: string;
  distancia: string;
  tempo: string;
  valor: number;
}

interface TripsHistoryProps {
  trips: Trip[];
  goToHome: () => void;
}

const TripsHistory: React.FC<TripsHistoryProps> = ({ trips, goToHome }) => {
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>(trips);
  const [userId, setUserId] = useState<string>('');

  const handleFilter = async () => {
    try {
      const response = await fetch(`http://localhost:8080/ride/history?userId=${userId}`);
      const data = await response.json();
      setFilteredTrips(data.trips);
    } catch (error) {
      console.error('Erro ao buscar histórico de viagens:', error);
    }
  };

  const handleDelete = (id: string) => {
    setFilteredTrips(filteredTrips.filter((trip) => trip.id !== id));
  };

  return (
    <div className={styles.historyContainer}>
      <h2>Histórico de Viagens</h2>
      <div className={styles.filterContainer}>
        <label htmlFor="userId">ID do Usuário:</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <label htmlFor="driver">Motorista:</label>
        <select id="driver" onChange={(e) => setSelectedDriver(e.target.value)}>
          <option value="">Todos</option>
          {Array.from(new Set(trips.map((trip) => trip.motorista))).map((motorista) => (
            <option key={motorista} value={motorista}>{motorista}</option>
          ))}
        </select>
        <button onClick={handleFilter} className={styles.filterButton}>Aplicar Filtro</button>
      </div>
      <ul className={styles.tripList}>
        {filteredTrips.map((trip) => (
          <li key={trip.id} className={styles.tripCard}>
            <p>Data e Hora: {trip.dataHora}</p>
            <p>Motorista: {trip.motorista}</p>
            <p>Origem: {trip.origem}</p>
            <p>Destino: {trip.destino}</p>
            <p>Distância: {trip.distancia}</p>
            <p>Tempo: {trip.tempo}</p>
            <p>Valor: R$ {trip.valor.toFixed(2)}</p>
            <button onClick={() => handleDelete(trip.id)} className={styles.deleteButton}>Excluir</button>
          </li>
        ))}
      </ul>
      <div className={styles.backButtonContainer}>
        <button onClick={goToHome} className={styles.backButton}>
          Voltar para o Início
        </button>
      </div>
    </div>
  );
};

export default TripsHistory;
