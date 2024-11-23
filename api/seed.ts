import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.drivers.createMany({
        data: [
            {
            Nome: "João Silva",
            Descricao: "Motorista experiente",
            Carro: "Ford Ka",
            Avaliacao: 4.5,
            Taxa: 2.5,
            KmMinimo: 2,
            },
            {
                Nome: "Maria Silva",
                Descricao: "Motorista atenciosa",
                Carro: "Chevrolet Onix",
                Avaliacao: 4.8,
                Taxa: 3.0,
                KmMinimo: 1,
            },
        ],
    });
}

main()
.then(async() => {
    await prisma.$disconnect();
})
.catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})

