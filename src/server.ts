import express, { NextFunction } from "express";
import "express-async-errors"
import "reflect-metadata";
import { router } from "./routes";
import swaggerUI from "swagger-ui-express"
const app = express();
import swaggerfile from "./swagger.json"

import './database'
import "./shared/container/"
import { AppError } from "./errors/AppError";
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


app.listen(3333, () => console.log("server is running"))