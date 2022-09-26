import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Cars } from "../entities/Car";

class CarsRepository implements ICarsRepository{

    private repository: Repository<Cars>;
    constructor(){
        this.repository = getRepository(Cars);
    }
    async create({brand,
    daily_rate,
    category_id,
    description,
    fine_amount,
    license_plate,
    name}: ICreateCarDTO): Promise<Cars> {
        const car = this.repository.create({
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
        });

        await this.repository.save(car);
        return car;
    }
    async findByLicensePlate(license_plate: string): Promise<Cars> {
        const car = await this.repository.findOne({
            license_plate,
        });
        return car;
    }

}
export {CarsRepository}