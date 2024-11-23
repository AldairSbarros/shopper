import { Router } from "express";
import { createDriver, getAllDrivers } from "../controllers/drivers.controllers";

export const driversRouter = Router();

driversRouter.post("/", createDriver)
driversRouter.get("/", getAllDrivers);