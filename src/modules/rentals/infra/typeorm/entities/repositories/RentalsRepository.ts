import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "../Rental";
import { Repository, getRepository } from "typeorm";

class RentalsRepository implements IRentalsRepository{
 private repository:Repository<Rental>

 constructor(){
  this.repository = getRepository(Rental)
 }


 async findOpenRentalByCar(car_id: string): Promise<Rental> {
  const openByCar = await this.repository.findOne({car_id})
  return openByCar
 }
 async findOpenRentalsByUser(user_id: string): Promise<Rental> {
  const openByUser = await this.repository.findOne({user_id})
  return openByUser
 }
 async create({car_id,
  expected_return_date,
  user_id}: ICreateRentalDTO): Promise<Rental> {
  const rental = this.repository.create({
   car_id,
   expected_return_date,
   user_id
  });
  await this.repository.save(rental);
  return rental;
 }

}

export {RentalsRepository}