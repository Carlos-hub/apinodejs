import { CreateCarController } from "@modules/cars/useCases/createCar/createCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCars";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImage/UploadCarImageController";
import { Router } from "express";
import multer from "multer";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import uploadConfig from "@config/upload";
const uploadImage = multer(uploadConfig.upload("./tmp/cars"));
const carsRoutes = Router();
const  createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImages = new UploadCarImagesController();

carsRoutes.post("/",ensureAuthenticated,ensureAdmin,createCarController.handle)
carsRoutes.post('/specifications/:id',ensureAuthenticated,ensureAdmin,createCarSpecificationController.handle)
carsRoutes.get("/available", listAvailableCarsController.handle)
carsRoutes.post("/",ensureAuthenticated,ensureAdmin,createCarController.handle)
carsRoutes.post('/images/:id',ensureAuthenticated,ensureAdmin,uploadImage.array("images"),uploadCarImages.handle)
export { carsRoutes }