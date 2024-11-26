import { useEffect, useState } from "react";
import { DriversCard } from "../DriversCard";

interface DriversProps {
  id: string;
  name: string;
  photo: string;
  descricao: string;
  carro: string;
  avaliacao: number;
  taxa: number;
  kmMinimo: number;
}

export const DriverList: React.FC = () => {
  const [drivers, setDrivers] = useState<DriversProps[]>([]);
  const customerId = "";
  const origin = "";
  const destination = "";

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch("http://localhost:8080/ride/estimate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer_id: customerId,
            origin,
            destination,
          }),
        });
        const data = await response.json();
        setDrivers(data.drivers);
      } catch (error) {
        console.error("Erro ao buscar motoristas:", error);
      }
    };
    fetchDrivers();
  }, [customerId, origin, destination]);

  return (
    <ul>
      {drivers.map((driver) => (
        <DriversCard
          key={driver.id}
          id={driver.id}
          nome={driver.name}
          photo={driver.photo}
          descricao={driver.descricao}
          carro={driver.carro}
          avaliacao={driver.avaliacao}
          taxa={driver.taxa}
          kmMinimo={driver.kmMinimo}
        />
      ))}
    </ul>
  );
};
