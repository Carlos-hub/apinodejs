import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase'

class UpdateUserAvatarController{
    async handle(request:Request,response:Response){
        const { id} = request.user;

        const avatarFile = request.file.filename;
        const updateUserAvatarUserCase = container.resolve(UpdateUserAvatarUseCase);
        
        await updateUserAvatarUserCase.execute({user_id:id ,avatarFile})

        return response.status(204).send();
    }
}
export { UpdateUserAvatarController}