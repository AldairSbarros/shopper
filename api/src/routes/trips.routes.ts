import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";
import { estimateTrip, confirmTrip, getTripDetails } from "../controllers/trips.controllers";

export const tripsRouter = Router();

tripsRouter.post("/estimate", asyncHandler(estimateTrip));
tripsRouter.patch("/confirm", asyncHandler(confirmTrip));
tripsRouter.get("/:customer_id", asyncHandler(getTripDetails));