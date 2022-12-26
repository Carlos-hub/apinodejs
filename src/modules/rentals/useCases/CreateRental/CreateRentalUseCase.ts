import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

dayjs.extend(utc)



interface IRequest{
 user_id:string;
 car_id:string;
 expected_return_date:Date;
}

class CreateRentalUseCase{
 constructor(
  private rentalsRepository:IRentalsRepository
 ){}
 async execute({user_id,car_id,expected_return_date}:IRequest):Promise<Rental>{
  // Não deve ser possível cadastrar um novo aluguel caso já exista um aluguel aberto para o mesmo carro.
  const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

  if(carUnavailable){
    throw new AppError(" Car is unavailable")
  }
  // Não deve ser possível cadastrar um novo aluguel caso já exista um aluguel aberto para o mesmo usuário.
  const rentalOpenToUser = await this.rentalsRepository.findOpenRentalsByUser(user_id)

  if(rentalOpenToUser){
   throw new AppError(" There's a rental in progress for user!")
 }

 //   O aluguel deve ter duração minima de 24 horas.
 const expectedReturnDateFormat = dayjs(expected_return_date).utc().local().format()
 const dateNow = dayjs().utc().local().format()
 const compare =dayjs(expectedReturnDateFormat).diff(dateNow,"hours");
 if(compare < 24){
  throw new AppError("Invalid return time! ")
 }



  const rental = await this.rentalsRepository.create({
  user_id,
  car_id,
  expected_return_date
 });
 return rental
 }
}

export { CreateRentalUseCase }