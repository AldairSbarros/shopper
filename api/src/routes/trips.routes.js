"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripsRouter = void 0;
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const trips_controllers_1 = require("../controllers/trips.controllers");
exports.tripsRouter = (0, express_1.Router)();
exports.tripsRouter.post("/estimate", (0, express_async_handler_1.default)(trips_controllers_1.estimateTrip));
exports.tripsRouter.patch("/confirm", (0, express_async_handler_1.default)(trips_controllers_1.confirmTrip));
exports.tripsRouter.get("/:customer_id", (0, express_async_handler_1.default)(trips_controllers_1.getTripDetails));
