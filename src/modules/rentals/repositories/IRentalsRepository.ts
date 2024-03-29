import { ICreateRentalDTO } from "../dtos/ICreateDTO"
import { Rental } from "../infra/typeorm/entities/Rental"


interface IRentalsRepository{
 findOpenRentalByCar(car_id:string):Promise<Rental>
 findOpenRentalsByUser(user_id:string):Promise<Rental>
 create(data:ICreateRentalDTO):Promise<Rental>
}
export {IRentalsRepository}