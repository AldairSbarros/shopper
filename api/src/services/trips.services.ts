import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient
const apiKey = "AIzaSyBT7Adutv_LO28oR454JmCKTvxtt4ZTGmQ";

export const getCordinates = async (address: string) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`
  );
  return response.data.results[0].geometry.location;
};

export const getDistance = async (origin: any, destination: any) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&key=${apiKey}`
  );
  return response.data.rows[0].elements[0].distance.text;
};

export const getRoute = async (origin: any, destination: any) =>{
    const response = await axios.get(
     `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&key=${apiKey}`   
    );
    return response.data;
};

export const getAvailableDrivers = async(distance: number) =>{
    const drivers = await prisma.drivers.findMany({
        where: {
            KmMinimo :{
                lte: distance,
            },
        },
        orderBy: {
            Taxa: 'asc',
        },
    });
    return drivers
        }


export const calculatePrice = (distance: string, pricePerkm: number) => {
  const distanceInKm = parseFloat(
    distance.replace(" km", "").replace(",", ".").trim()
  );
  return distanceInKm * pricePerkm;
};
