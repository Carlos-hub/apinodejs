import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload{
    sub:string;
}

export async function ensureAuthenticated(request:Request ,response:Response, next:NextFunction){
    // paravra reservada => Bearer + token
    const authHeader = request.headers.authorization;


    if(!authHeader){
        throw new AppError("token missing",401);
    }

    const [, token] = authHeader.split(" ");

    try{
        const {sub:user_id} =  verify(token,"0001ef602c85e33cb076329e3aaa9cf5") as IPayload;

        const usersRepository = new UsersRepository();
        const user = usersRepository.findById(user_id);

        if(!user){
            throw new AppError("User dont Exists!",401)
        }

        request.user ={
            id: user_id
        }

       next();
    }catch(err){
        throw new AppError("Invalid token!",401)
    }
}
