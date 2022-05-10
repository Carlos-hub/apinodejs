import express from "express";
const app = express();
import {categoriesRoutes} from './routes/categories.routes';
import { specificationsRoutes } from "./routes/specifications.routes";

app.use(express.json())

app.use("/categories",categoriesRoutes);
app.use("/specifications",specificationsRoutes);


app.listen(3000, () => console.log("server is running"))