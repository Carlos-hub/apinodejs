import { Category } from '../../entities/Category';
import {ICategoryRepository} from '../../repositories/ICategoriesRepository';
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