import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Cars } from "../infra/typeorm/entities/Car";

interface ICarsRepository{

    create(data:ICreateCarDTO): Promise<Cars>;
    findByLicensePlate(license_plate:string):Promise<Cars>
}

export {ICarsRepository}