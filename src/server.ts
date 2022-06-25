import express from "express";
import { router } from "./routes";
import swaggerUI from "swagger-ui-express"
const app = express();
import swaggerfile from "./swagger.json"

import './database'
app.use(express.json())

app.use("/api-docs",swaggerUI.serve, swaggerUI.setup(swaggerfile))
app.use(router);


app.listen(3333, () => console.log("server is running"))