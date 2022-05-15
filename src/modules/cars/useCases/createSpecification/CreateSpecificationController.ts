import { Request,Response } from "express";

import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase"

class CreateSpecificationController{
    constructor(private createSpecificationUseCase:CreateCategoryUseCase){}
    handle(req:Request,res:Response):Response{
        const {name,description} = req.body
        this.createSpecificationUseCase.execute({name,description})
        return res.status(201).send()
    }
}

export {CreateSpecificationController}