import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { UsersRepository} from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { injectable, inject } from "tsyringe";

import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
interface IRequest{
    email:string;
    password:string;
}

interface IResponse{
    token:string,
    user:{
        name:string,
        email:string;
    };
    
}

@injectable()
class AuthenticateUserUseCase{
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ){}
    async execute({email, password}:IRequest):Promise<IResponse>{
        // Usuário existe
        const user = await this.userRepository.findByEmail(email);
        if(!user){
            throw new AppError("Email or password incorrect");
        }
        const passwordMatch = await compare(password,user.password)
        // Senha está correta
        if(!passwordMatch){
            throw new AppError("Email or password incorrect");
        }

        // Gerar webtoken
        const token = sign({},"0001ef602c85e33cb076329e3aaa9cf5",{
            subject:user.id,
            expiresIn:"1d"
        });

        const tokenReturn:IResponse = {
            token,
            user:{
                name:user.name,
                email:user.email
            }
        }

        return {
            tokenReturn
        };
    }
}

export { AuthenticateUserUseCase }