-- CreateTable
CREATE TABLE "Drivers" (
    "Id" SERIAL NOT NULL,
    "Nome" TEXT NOT NULL,
    "Descricao" TEXT NOT NULL,
    "Carro" TEXT NOT NULL,
    "Avaliacao" TEXT NOT NULL,
    "Taxa" INTEGER NOT NULL,
    "KMMinimo" INTEGER NOT NULL,

    CONSTRAINT "Drivers_pkey" PRIMARY KEY ("Id")
);
