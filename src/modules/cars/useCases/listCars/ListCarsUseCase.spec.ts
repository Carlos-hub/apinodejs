import { ListCarsUseCase } from "./ListCarsUseCase"
import { CarsRepositoryInMemory } from "../../repositories/In-memory/CarsRepositoryInMemory"
let listCarsUseCase:ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars",()=>{

    beforeEach(() =>{
        carsRepositoryInMemory = new CarsRepositoryInMemory
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    })

    it("Should be able to list all available cars",async ()=>{
        const car = await carsRepositoryInMemory.create({
            brand:"Car brand",
            category_id:"c83576e3-4efe-4aad-b8fa-b6d018649193",
            daily_rate:200,
            description:"Car description",
            fine_amount:300,
            license_plate:"LOVU-1S2",
            name:"Cars2"
        })

        const cars = await listCarsUseCase.execute({
            brand:"Car_brand"
        });
        expect(cars).toEqual([car]);
    });

    it("Should be able to list available cars by brand", async () =>{
        const car = await carsRepositoryInMemory.create({
            brand:"Car_brand_test",
            category_id:"c83576e3-4efe-4aad-b8fa-b6d018649193",
            daily_rate:200,
            description:"Car description",
            fine_amount:300,
            license_plate:"LOVU-1S2",
            name:"Cars5"
        })

        const cars = await listCarsUseCase.execute({
            brand:"Car_brand_test"
        });
        console.log(cars);
        expect(cars).toEqual([car]);
    });
    it("Should be able to list available cars by name", async () =>{
        const car = await carsRepositoryInMemory.create({
            brand:"Car_brand_test",
            category_id:"c83576e3-4efe-4aad-b8fa-b6d01864915293",
            daily_rate:200,
            description:"Car description",
            fine_amount:300,
            license_plate:"LOVU-1S522",
            name:"Cars6"
        })

        const cars = await listCarsUseCase.execute({
            brand:"Cars6"
        });
        console.log(cars);
        expect(cars).toEqual([car]);
    });
    })
