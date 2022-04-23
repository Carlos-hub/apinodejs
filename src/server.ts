import express from "express";
const app = express();
import {categoriesRoutes} from './routes/categories.routes';

app.use(express.json())

app.use("/categories",categoriesRoutes)

app.listen(3000, () => console.log("server is running"))