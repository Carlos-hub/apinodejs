import { container } from 'tsyringe';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

import { IUsersRepository} from "@modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import CategoriesRepository from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository';

container.registerSingleton<ICategoryRepository>(
    "CategoriesRepository",
    CategoriesRepository
);
container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
);
container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);
container.registerType<ICarsRepository>("CarsRepository", CarsRepository);
container.registerSingleton<ICarsImageRepository>("CarsImagesRepository",CarsImagesRepository)