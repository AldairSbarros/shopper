import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { createDriverService, getAllDriversService } from "../services/drivers,services";

const prisma = new PrismaClient();

export const createDriver = async (req: Request, res: Response) => {
  const { nome, descricao, carro, avaliacao, taxa, kmMinimo } = req.body;

  try {
    const driver = await createDriverService({
      nome,
      descricao,
      carro,
      avaliacao,
      taxa,
      kmMinimo,
    });

    res.json(driver);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllDrivers = async ( req: Request, res: Response) => {
    try {
        const drivers = await getAllDriversService();
        res.json(drivers);
    } catch(error) {
        res.status(500).json({ error: error});
    }
};