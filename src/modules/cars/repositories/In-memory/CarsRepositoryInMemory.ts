import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Cars } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository{
    cars:Cars[] = [];
    async create({brand,category_id,daily_rate,description,fine_amount,name,license_plate}: ICreateCarDTO):Promise<Cars> {
        const car = new Cars();
        Object.assign(car,{
            brand,category_id,daily_rate,description,fine_amount,name,license_plate
        });
        return car;
    }
    async findByLicensePlate(license_plate: string): Promise<Cars> {
        return this.cars.find((car) =>car.license_plate ===license_plate);
    }
    
}

export {CarsRepositoryInMemory}