-- CreateTable
CREATE TABLE "Drivers" (
    "Id" SERIAL NOT NULL,
    "Nome" TEXT NOT NULL,
    "Descricao" TEXT,
    "Carro" TEXT,
    "Avaliacao" DOUBLE PRECISION,
    "Taxa" DOUBLE PRECISION,
    "KmMinimo" DOUBLE PRECISION,

    CONSTRAINT "Drivers_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Trips" (
    "Id" SERIAL NOT NULL,
    "CustomerId" TEXT NOT NULL,
    "Origin" TEXT NOT NULL,
    "Destination" TEXT NOT NULL,
    "Distance" DOUBLE PRECISION NOT NULL,
    "Duration" TEXT NOT NULL,
    "DriverId" INTEGER NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trips_pkey" PRIMARY KEY ("Id")
);
