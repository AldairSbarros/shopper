"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driversRouter = void 0;
const express_1 = require("express");
const drivers_controllers_1 = require("../controllers/drivers.controllers");
exports.driversRouter = (0, express_1.Router)();
exports.driversRouter.post("/", drivers_controllers_1.createDriver);
exports.driversRouter.get("/", drivers_controllers_1.getAllDrivers);
