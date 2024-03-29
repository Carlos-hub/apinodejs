import { CarsRepositoryInMemory } from "@modules/cars/repositories/In-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/In-memory/SpecificationInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory :CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;
describe("Create Car Specification", ()=>{
    beforeEach(()=>{
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory,specificationsRepositoryInMemory)
    })

    it("should be able to add a new specification to a now-existent car",async ()=>{
       expect(async ()=>{
        const car_id = "1324";
        const specifications_id = ["54321"];
        await createCarSpecificationUseCase.execute({car_id, specifications_id});
       }).rejects.toBeInstanceOf(AppError)
    });
    it("should be able to add a new specification to the car",async ()=>{
        const car = await carsRepositoryInMemory.create({
            name:"name",
            description:"description", 
            daily_rate:100, 
            license_plate:"ABC-123", 
            fine_amount:60, 
            brand:"Brand", 
            category_id:"category",
        });

        const specification = await specificationsRepositoryInMemory.create({
            description:"test",
            name: "test",
        })
        const specifications_id = specification.id;
        const specificationsCars = await createCarSpecificationUseCase.execute({car_id: car.id , specifications_id});
        expect(specificationsCars).toHaveProperty("specifications")
        expect(specificationsCars.specifications.length).toBe(1);
    })
})