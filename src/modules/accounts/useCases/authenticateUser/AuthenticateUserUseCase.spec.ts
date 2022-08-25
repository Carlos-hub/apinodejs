import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInmemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInmemory: UsersRepositoryInmemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User",()=>{
    beforeEach(()=>{
        usersRepositoryInmemory = new UsersRepositoryInmemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInmemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInmemory);
    })
    it("Should be able to authenticate an user", async () =>{
        const user:ICreateUserDTO ={
            driver_license:"00123",
            email:"User@teste.com",
            password:"1234",
            name:"User test"
        };
        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });
        // console.log(result);
        expect(result).toHaveProperty("tokenReturn");
    });
    it("Should not be able authenticate an non existent user",()=>{
        expect( async()=>{
            await authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "error"
            });
        }).rejects.toBeInstanceOf(AppError);
    });
    it("Should not be able to authenticate with incorrect password",()=>{
        expect(async ()=>{
            const user:ICreateUserDTO ={
                driver_license:"99123",
                email:"paswordincorrect@teste.com",
                password:"1234",
                name:"User test"
            };
            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email:user.email,
                password:"incorrectedpassword",
            });
        }).rejects.toBeInstanceOf(AppError);
    })
})