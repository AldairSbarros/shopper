// import { useState } from "react";
// import { Input } from "../../fragments/inputs";

// interface TripFormProps {
//   openModal: () => void;
//   setDrivers: (drivers: any[]) => void;
// }

// export const TripForm: React.FC<TripFormProps> = ({ openModal, setDrivers }) => {
//   const [customerId, setCustomerId] = useState("");
//   const [origin, setOrigin] = useState("");
//   const [destination, setDestination] = useState("");

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     try {
//       const response = await fetch("http://localhost:8080/ride/estimate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ customer_id: customerId, origin, destination }),
//       });

//       const data = await response.json();
//       console.log("Motoristas disponíveis:", data.drivers);
//       setDrivers(data.drivers);
//       openModal();
//     } catch (error) {
//       console.log("Erro ao buscar motoristas:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Insira o endereço de partida e de destino! </h2>
//       <Input
//         type="text"
//         label="ID:"
//         id="customerId"
//         placeholder="Digite seu Id."
//         value={customerId}
//         onChange={(e) => setCustomerId(e.target.value)}
//       />
//       <Input
//         type="text"
//         label="Partida:"
//         id="origin"
//         placeholder="Endereço de partida."
//         value={origin}
//         onChange={(e) => setOrigin(e.target.value)}
//       />
//       <Input
//         type="text"
//         label="Destino:"
//         id="destination"
//         placeholder="Endereço de destino."
//         value={destination}
//         onChange={(e) => setDestination(e.target.value)}
//       />
//       <button type="submit">Buscar</button>
//     </form>
//   );
// };


import { useState } from "react";
import { Input } from "../../fragments/inputs";
import styles from '../TripForm/styles.module.scss'

interface TripFormProps {
  openModal: () => void;
  setDrivers: (drivers: any[]) => void;
}

export const TripForm: React.FC<TripFormProps> = ({ openModal, setDrivers }) => {
  const [customerId, setCustomerId] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/ride/estimate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customer_id: customerId, origin, destination }),
      });

      const data = await response.json();
      console.log("Motoristas disponíveis:", data.drivers);
      setDrivers(data.drivers);
      openModal();
    } catch (error) {
      console.log("Erro ao buscar motoristas:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Insira abaixo seus dados: </h2>
      <p>seu Id, bem como o endereço de partida e de destino!</p>
      <Input
        type="text"
        label="ID:"
        id="customerId"
        placeholder="Digite seu Id."
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
      />
      <Input
        type="text"
        label="Partida:"
        id="origin"
        placeholder="Endereço de partida."
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
      />
      <Input
        type="text"
        label="Destino:"
        id="destination"
        placeholder="Endereço de destino."
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <button type="submit" className={styles.button}>Buscar</button>
    </form>
  );
};
