import express, { json } from "express";
import helmet from "helmet";
import { tripsRouter } from "./routes/trips.routes";
import { driversRouter } from "./routes/drivers.routes";
import cors from 'cors';


export const app = express();
app.use(helmet());
app.use(json());
app.use(cors())

app.use("/ride", tripsRouter);
app.use("/ride", tripsRouter); 
app.use("/ride", tripsRouter);
app.use("/drivers", driversRouter)
  


