import express, { NextFunction,Request,Response } from "express";
import "express-async-errors"
import "reflect-metadata";
import { router } from "./routes";
import swaggerUI from "swagger-ui-express"
import swaggerfile from "../../../swagger.json"

import createConnection from '@shared/infra/typeorm'
import "@shared/container/"
import { AppError } from "@shared/errors/AppError";
const app = express();
createConnection();
app.use(express.json())

app.use("/api-docs",swaggerUI.serve, swaggerUI.setup(swaggerfile))
app.use(router);

app.use((err: Error ,_request: Request, response: Response, _next: NextFunction)=>{
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            message:err.message
        })
    }
    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    })
})


export {app}