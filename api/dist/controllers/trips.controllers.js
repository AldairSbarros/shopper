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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTripDetails = exports.confirmTrip = exports.estimateTrip = void 0;
const trips_services_1 = require("../services/trips.services");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const estimateTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const originCoords = yield (0, trips_services_1.getCordinates)(origin);
        const destinationCoords = yield (0, trips_services_1.getCordinates)(destination);
        const distanceText = yield (0, trips_services_1.getDistance)(originCoords, destinationCoords);
        const distance = parseFloat(distanceText.replace(" km", "").replace(",", ".").trim());
        const route = yield (0, trips_services_1.getRoute)(originCoords, destinationCoords);
        const duration = route.routes[0].legs[0].duration.text;
        const drivers = yield (0, trips_services_1.getAvailableDrivers)(distance);
        const driversWithPrices = drivers.map((driver) => {
            const valorTotal = driver.Taxa !== null ? (0, trips_services_1.calculatePrice)(distanceText, driver.Taxa) : 0;
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
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.estimateTrip = estimateTrip;
const confirmTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { customer_id, origin, destination, distance, duration, driver, value, } = req.body;
    // Validações
    if (!customer_id ||
        !origin ||
        !destination ||
        !driver ||
        !driver.id ||
        !driver.name ||
        !distance ||
        !duration ||
        !value) {
        res.status(400).json({
            error_code: "INVALID_DATA",
            error_description: "Os dados fornecidos no corpo da requisição são inválidos.",
        });
        return;
    }
    if (origin === destination) {
        res.status(400).json({
            error_code: "INVALID_DATA",
            error_description: "Os endereços de origem e destino não podem ser o mesmo.",
        });
        return;
    }
    // Verificar se o motorista é uma opção válida
    const validDriver = yield prisma.drivers.findUnique({
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
    if (distance > ((_a = validDriver.KmMinimo) !== null && _a !== void 0 ? _a : 0)) {
        res.status(406).json({
            error_code: "INVALID_DISTANCE",
            error_description: "A quilometragem informada não é válida para o motorista selecionado.",
        });
        return;
    }
    try {
        // Gravar a viagem no histórico
        const trip = yield prisma.trips.create({
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
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.confirmTrip = confirmTrip;
const getTripDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const validDriver = yield prisma.drivers.findUnique({
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
        const trips = yield prisma.trips.findMany({
            where: Object.assign({ CustomerId: customer_id }, (driver_id && { DriverId: Number(driver_id) })),
            orderBy: {
                createdAt: "desc",
            },
        });
        res.json(trips);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.getTripDetails = getTripDetails;
