
import React, { useState } from 'react';

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

  const handleFilter = () => {
    if (selectedDriver) {
      setFilteredTrips(trips.filter((trip) => trip.motorista === selectedDriver));
    } else {
      setFilteredTrips(trips);
    }
  };

  return (
    <div>
      <h2>Histórico de Viagens</h2>
      <div>
        <label htmlFor="driver">Motorista:</label>
        <select id="driver" onChange={(e) => setSelectedDriver(e.target.value)}>
          <option value="">Todos</option>
          {Array.from(new Set(trips.map((trip) => trip.motorista))).map((motorista) => (
            <option key={motorista} value={motorista}>{motorista}</option>
          ))}
        </select>
        <button onClick={handleFilter}>Aplicar Filtro</button>
      </div>
      <ul>
        {filteredTrips.map((trip) => (
          <li key={trip.id}>
            <p>Data e Hora: {trip.dataHora}</p>
            <p>Motorista: {trip.motorista}</p>
            <p>Origem: {trip.origem}</p>
            <p>Destino: {trip.destino}</p>
            <p>Distância: {trip.distancia}</p>
            <p>Tempo: {trip.tempo}</p>
            <p>Valor: R$ {trip.valor.toFixed(2)}</p>
          </li>
        ))}
      </ul>
      <button onClick={goToHome} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Voltar para o Início
      </button>
    </div>
  );
};

export default TripsHistory;
