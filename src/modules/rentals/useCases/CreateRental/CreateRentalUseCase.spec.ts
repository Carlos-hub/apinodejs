import dayjs from "dayjs";
import "reflect-metadata"
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/Implementations/DayjsDateProvider";

let createRentalUseCase:CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider : DayjsDateProvider;

describe("Create Rental", ()=>{
 const dayAdd = dayjs().add(1,"day").toDate();
 beforeEach(() =>{
  rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
  dayjsDateProvider= new DayjsDateProvider();
  createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory,dayjsDateProvider);
 })
 it("Should be able to create a new rental",async () =>{
  const rental = await createRentalUseCase.execute({
   user_id:"123456",
   car_id:"123",
   expected_return_date:dayAdd,
  });
  expect(rental).toHaveProperty("id");
  expect(rental).toHaveProperty("start_date");
 });

 it("Should not be able to create a new rental if there is another open to the same user",async () =>{
  expect( async () =>{
   await createRentalUseCase.execute({
    user_id:"123456",
    car_id:"123",
    expected_return_date:dayAdd,
   });
 
   await createRentalUseCase.execute({
    user_id:"123456",
    car_id:"123",
    expected_return_date:dayAdd,
   });
  }).rejects.toBeInstanceOf(AppError)
 });

 it("Should not be able to create a new rental ",async () =>{
  expect( async () =>{
   await createRentalUseCase.execute({
    user_id:"123456",
    car_id:"654",
    expected_return_date:dayAdd,
   });
 
   await createRentalUseCase.execute({
    user_id:"213",
    car_id:"654",
    expected_return_date:dayAdd,
   });
  }).rejects.toBeInstanceOf(AppError)
 });

 it("Should not be able to create a new rental with a invalid return time",async () =>{
  expect( async () =>{
   await createRentalUseCase.execute({
    user_id:"123456",
    car_id:"654",
    expected_return_date:dayjs().toDate(),
   });
 

  }).rejects.toBeInstanceOf(AppError)
 });

})