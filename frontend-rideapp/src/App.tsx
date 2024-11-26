
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { TripForm } from "./components/TripForm";
import axios from "axios";
import ModalDrivers from "./components/ModalDrivers";
import Modal from 'react-modal';
import TripsHistory from "./components/TripsHistory";

interface Driver {
  id: string;
  nome: string;
  photo: string;
  descricao: string;
  carro: string;
  avaliacao: number;
  valorTotal: number;
}

interface Trip {
  id: string;
  dataHora: string;
  motorista: string;
  origem: string;
  destino: string;
  distancia: string;
  tempo: string;
  valor: number;
  origin: Location;
  destination: Location;
}

interface Location {
  lat: number;
  lng: number;
}


Modal.setAppElement('#root');

const App = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/drivers');
        
        setDrivers(response.data);
      } catch (error) {
        console.error('Erro ao buscar motoristas:', error);
      }
    };

    fetchDrivers();
  }, []);

  useEffect(() => {
    const savedTrips = localStorage.getItem('trips');
    if (savedTrips) {
      setTrips(JSON.parse(savedTrips));
    }
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const selectDriver = (driver: Driver) => {
    const newTrip = {
      id: uuidv4(),
      dataHora: new Date().toLocaleString(),
      motorista: driver.nome,
      origem: "Origem Exemplo",
      destino: "Destino Exemplo",
      distancia: "10 km",
      tempo: "20 mins",
      valor: driver.valorTotal,
      origin: { lat: -3.0598683, lng: -60.0444871 }, // Exemplo de coordenadas de origem
      destination: { lat: -3.1212906, lng: -60.00565849999999 } // Exemplo de coordenadas de destino
    };
    const updatedTrips = [...trips, newTrip];
    setTrips(updatedTrips);
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
    setSelectedDriver(driver);
    closeModal();
    setShowHistory(true);
  };

  const goToHome = () => {
    setShowHistory(false);
  };

  return (
    <>
      <Header />
      {!showHistory ? (
        <>
          <TripForm openModal={openModal} setDrivers={setDrivers} />
          <ModalDrivers
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            drivers={drivers}
            onSelectDriver={selectDriver}
            origin={{ lat: -3.0598683, lng: -60.0444871 }} // Exemplo de coordenadas de origem
            destination={{ lat: -3.1212906, lng: -60.00565849999999 }} // Exemplo de coordenadas de destino
          />
        </>
      ) : (
        <TripsHistory trips={trips} goToHome={goToHome} />
      )}
      <Footer />
    </>
  );
};

export default App;
