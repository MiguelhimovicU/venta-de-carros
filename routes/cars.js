import express from "express";
import { carsFileRouter } from "./cars.file.router.js"; 

const router = express.Router();

export function routerCars(app) {
    app.use("/api/v1", router);
    router.use("/file/cars", carsFileRouter);
}

