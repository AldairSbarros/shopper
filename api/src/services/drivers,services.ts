import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createDriverService = async( data: {
    nome: string;
    descricao: string;
    carro: string;
    avaliacao?: number;
    taxa: number;
    kmMinimo: number;
}) => {
    const { nome, descricao, carro, avaliacao, taxa, kmMinimo} = data;

    const driver = await prisma.drivers.create({
        data: {
            Nome: nome,
            Descricao: descricao?? undefined,
            Carro: carro?? undefined,
            Avaliacao: avaliacao?? null,
            Taxa: taxa?? undefined, 
            KmMinimo: kmMinimo?? undefined
        },
    });
    return driver;
};

export const getAllDriversService = async () => {
    const drivers = await prisma.drivers.findMany();
    return drivers;
};