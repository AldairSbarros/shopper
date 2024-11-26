import { Request, Response } from "express";
import {
  calculatePrice,
  getAvailableDrivers,
  getCordinates,
  getDistance,
  getRoute,
} from "../services/trips.services";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const estimateTrip = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { customer_id, origin, destination } = req.body;

  if (!customer_id || !origin || !destination) {
    res
      .status(400)
      .json({ error: "Customer ID, origin, and destination cannot be empty" });
    return;
  }
  if (origin === destination) {
    res
      .status(400)
      .json({ error: "Origin and destination cannot be the same." });
    return;
  }

  try {
    const originCoords = await getCordinates(origin);
    const destinationCoords = await getCordinates(destination);

    const distanceText = await getDistance(originCoords, destinationCoords);
    const distance = parseFloat(
      distanceText.replace(" km", "").replace(",", ".").trim()
    );

    const route = await getRoute(originCoords, destinationCoords);
    const duration = route.routes[0].legs[0].duration.text;

    const drivers = await getAvailableDrivers(distance);

    const driversWithPrices = drivers.map((driver) => {
      const valorTotal =
        driver.Taxa !== null ? calculatePrice(distanceText, driver.Taxa) : 0;
      return {
        id: driver.Id,
        nome: driver.Nome,
        photo: driver.Photo,
        descricao: driver.Descricao,
        carro: driver.Carro,
        avaliacao: driver.Avaliacao,
        valorTotal: valorTotal,
      };
    });

    res.json({
      origin: originCoords,
      destination: destinationCoords,
      distance: `${distance} km`,
      duration,
      drivers: driversWithPrices,
      route: route.routes[0],
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const confirmTrip = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    customer_id,
    origin,
    destination,
    distance,
    duration,
    driver,
    value,
  } = req.body;

  // Validações
  if (
    !customer_id ||
    !origin ||
    !destination ||
    !driver ||
    !driver.id ||
    !driver.name ||
    !distance ||
    !duration ||
    !value
  ) {
    res.status(400).json({
      error_code: "INVALID_DATA",
      error_description:
        "Os dados fornecidos no corpo da requisição são inválidos.",
    });
    return;
  }

  if (origin === destination) {
    res.status(400).json({
      error_code: "INVALID_DATA",
      error_description:
        "Os endereços de origem e destino não podem ser o mesmo.",
    });
    return;
  }

  // Verificar se o motorista é uma opção válida
  const validDriver = await prisma.drivers.findUnique({
    where: { Id: driver.id },
  });

  if (!validDriver) {
    res.status(404).json({
      error_code: "DRIVER_NOT_FOUND",
      error_description: "Motorista não encontrado.",
    });
    return;
  }

  // Verificar se a quilometragem informada é válida para o motorista selecionado
  if (distance > (validDriver.KmMinimo ?? 0)) {
    res.status(406).json({
      error_code: "INVALID_DISTANCE",
      error_description:
        "A quilometragem informada não é válida para o motorista selecionado.",
    });
    return;
  }

  try {
    // Gravar a viagem no histórico
    const trip = await prisma.trips.create({
      data: {
        CustomerId: customer_id,
        Origin: origin,
        Destination: destination,
        Distance: distance,
        Duration: duration,
        DriverId: driver.id,
        Price: value,
      },
    });

    res.status(200).json({
      success: true,
      description: "Operação realizada com sucesso.",
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getTripDetails = async (req: Request, res: Response) => {
  const { customer_id } = req.params;
  const { driver_id } = req.query;

  if (!customer_id) {
    res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "O ID do usuário não pode estar em branco.",
    });
    return;
  }
  if (driver_id) {
    const validDriver = await prisma.drivers.findUnique({
      where: { Id: Number(driver_id) },
    });

    if (!validDriver) {
      res.status(404).json({
        error_code: "DRIVER_NOT_FOUND",
        error_description: "Motorista não encontrado;",
      });
      return;
    }
  }
  try {
    const trips = await prisma.trips.findMany({
      where: {
        CustomerId: customer_id,
        ...(driver_id && { DriverId: Number(driver_id) }),
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
