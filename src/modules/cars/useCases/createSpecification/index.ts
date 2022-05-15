import {SpecificationsRepository} from '../../repositories/implementations/SpecificationsRepository';
import { CreateSpecificationController } from './CreateSpecificationController';
import { CreateCategoryUseCase } from '../createCategory/CreateCategoryUseCase';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';


const specificationRepository = new SpecificationsRepository();
const createSpecificationsUseCase = new CreateSpecificationUseCase(specificationRepository)
const createSpecificationController = new CreateSpecificationController(createSpecificationsUseCase)

export{createSpecificationController}