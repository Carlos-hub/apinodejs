
import { CarsRepositoryInMemory } from "@modules/cars/repositories/In-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./createCarUseCase"

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;
describe("Create Car",()=>{

    beforeEach(()=>{
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);

    })
    it("Should be able to create a new car", async ()=>{
        const car = await createCarUseCase.execute({
            name:"name",
            description:"description", 
            daily_rate:100, 
            license_plate:"ABC-123", 
            fine_amount:60, 
            brand:"Brand", 
            category_id:"category",
        })
        expect(car).toHaveProperty("name")
    });
    it("should not be able to create a car with exists license plate",() =>{
        expect(async ()=>{
            await createCarUseCase.execute({
                name:"car 1",
                description:"description", 
                daily_rate:100, 
                license_plate:"ABC-123", 
                fine_amount:60, 
                brand:"Brand",
                category_id:"category",
            });
            await createCarUseCase.execute({
                name:"car 2",
                description:"description", 
                daily_rate:100, 
                license_plate:"ABC-123", 
                fine_amount:60, 
                brand:"Brand", 
                category_id:"category",
    
            });
        }).rejects.toBeInstanceOf(AppError);
    });
    it("should not be able to create a car with available true by default",async () =>{
            const car =  await createCarUseCase.execute({
                name:"car available",
                description:"description", 
                daily_rate:100, 
                license_plate:"ABCD-123", 
                fine_amount:60, 
                brand:"Brand", 
                category_id:"category",
            });

            expect(car.available).toBe(true);
        
    });
});