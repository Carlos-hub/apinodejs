import { Cars } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import "reflect-metadata"
import { injectable,inject } from "tsyringe"

interface IRequest {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}

@injectable()
class CreateCarUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ){}

    async execute({ 
        name,
        description, 
        daily_rate, 
        license_plate, 
        fine_amount, 
        brand, 
        category_id }: IRequest): Promise<Cars>{
            
            const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate);

            if (carAlreadyExists){
                throw new AppError("car already exists")
            }
            const car = await this.carsRepository.create({
                name,
                description, 
                daily_rate, 
                license_plate, 
                fine_amount, 
                brand, 
                category_id
            });
            return car;
        }
}
export { CreateCarUseCase }