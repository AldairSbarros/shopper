"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePrice = exports.getAvailableDrivers = exports.getRoute = exports.getDistance = exports.getCordinates = void 0;
const axios_1 = __importDefault(require("axios"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient;
const apiKey = "GOOGLE_API_KEY";
const getCordinates = (address) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
    return response.data.results[0].geometry.location;
});
exports.getCordinates = getCordinates;
const getDistance = (origin, destination) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&key=${apiKey}`);
    return response.data.rows[0].elements[0].distance.text;
});
exports.getDistance = getDistance;
const getRoute = (origin, destination) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&key=${apiKey}`);
    return response.data;
});
exports.getRoute = getRoute;
const getAvailableDrivers = (distance) => __awaiter(void 0, void 0, void 0, function* () {
    const drivers = yield prisma.drivers.findMany({
        where: {
            KmMinimo: {
                lte: distance,
            },
        },
        orderBy: {
            Taxa: 'asc',
        },
    });
    return drivers;
});
exports.getAvailableDrivers = getAvailableDrivers;
const calculatePrice = (distance, pricePerkm) => {
    const distanceInKm = parseFloat(distance.replace(" km", "").replace(",", ".").trim());
    return distanceInKm * pricePerkm;
};
exports.calculatePrice = calculatePrice;
