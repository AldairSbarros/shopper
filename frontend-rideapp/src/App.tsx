
import { useEffect, useState } from "react";
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
}

// Definir o elemento do App para o Modal
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
        console.log('Motoristas disponíveis:', response.data); // Adicionei este console.log para verificar os dados
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
      id: driver.id,
      dataHora: new Date().toLocaleString(),
      motorista: driver.nome,
      origem: "Origem Exemplo",
      destino: "Destino Exemplo",
      distancia: "10 km",
      tempo: "20 mins",
      valor: driver.valorTotal
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
          <ModalDrivers isOpen={modalIsOpen} onRequestClose={closeModal} drivers={drivers} onSelectDriver={selectDriver} />
        </>
      ) : (
        <TripsHistory trips={trips} goToHome={goToHome} />
      )}
      <Footer />
    </>
  );
};

export default App;
