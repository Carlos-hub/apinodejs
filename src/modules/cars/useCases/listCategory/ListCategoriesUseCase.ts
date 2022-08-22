import { Category } from '@modules/cars/entities/Category';
import {ICategoryRepository} from '@modules/cars/repositories/ICategoriesRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
class ListCategoriesUseCase{
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository:ICategoryRepository){

    }
    async execute():Promise<Category[]>{
       const categories = await this.categoriesRepository.list();

       return categories
    }
}

export{ListCategoriesUseCase}