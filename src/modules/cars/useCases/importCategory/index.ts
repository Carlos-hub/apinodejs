import CategoriesRepository from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./importcategoryController";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const categoriesRepository = CategoriesRepository.getInstance();
const importcategoryUseCAse = new ImportCategoryUseCase(categoriesRepository);
const importCategoryController = new ImportCategoryController(importcategoryUseCAse);



export {importCategoryController}