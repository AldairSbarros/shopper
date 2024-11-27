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
exports.getAllDriversService = exports.createDriverService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createDriverService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, photo, descricao, carro, avaliacao, taxa, kmMinimo } = data;
    const driver = yield prisma.drivers.create({
        data: {
            Nome: nome,
            Photo: photo,
            Descricao: descricao !== null && descricao !== void 0 ? descricao : undefined,
            Carro: carro !== null && carro !== void 0 ? carro : undefined,
            Avaliacao: avaliacao !== null && avaliacao !== void 0 ? avaliacao : null,
            Taxa: taxa !== null && taxa !== void 0 ? taxa : undefined,
            KmMinimo: kmMinimo !== null && kmMinimo !== void 0 ? kmMinimo : undefined
        },
    });
    return driver;
});
exports.createDriverService = createDriverService;
const getAllDriversService = () => __awaiter(void 0, void 0, void 0, function* () {
    const drivers = yield prisma.drivers.findMany();
    return drivers;
});
exports.getAllDriversService = getAllDriversService;
