
import { Request, Response } from "express"
import { calculatePrice, getCordinates, getDistance } from "../services/trips.services";

export const estimateTrip = async( req: Request, res: Response) => {
    try{
        const { origin, destination, pricePerkm } = req.body;

        const originCoords = await getCordinates(origin);
        const destinationCoords = await getCordinates(destination);
        const distance = await getDistance(originCoords, destinationCoords);
        const price = calculatePrice(distance, pricePerkm);

        res.json({distance, price});
    } catch (error){
        res.status(500).json({error});
    }
};

export const confirmTrip = ( req: Request, res: Response) => {
    const { tripId, driver_id }= req.body;
    res.json({ message: `Corrida ${tripId} confirmada pelo motorista ${driver_id}`});
};

export const getTripDetails = (req: Request, res: Response) => {
    const {customer_id} = req.params;
    const { driver_id} = req.query;
    res.json({ message: `Detalhes da corrida para o cliente ${customer_id} e do motorista ${driver_id}`})
}
        


    




