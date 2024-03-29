import { request, response, Router } from "express";
import { CreateCategoryController } from "@modules/cars/useCases/createCategory/createCategoryController";
import { CreateCategoryUseCase } from "@modules/cars/useCases/createCategory/CreateCategoryUseCase";
import { ListCategoriesController } from "@modules/cars/useCases/listCategory/ListCategoriesController";
import multer from "multer";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/importcategoryController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const upload = multer({
    dest:"./tmp"
});
const categoriesRoutes = Router();
const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post("/",ensureAuthenticated,ensureAdmin,createCategoryController.handle);

categoriesRoutes.get("/",listCategoriesController.handle)
categoriesRoutes.use(ensureAuthenticated)

categoriesRoutes.post("/import",ensureAuthenticated,ensureAdmin,upload.single("file"),importCategoryController.handle);

export { categoriesRoutes }