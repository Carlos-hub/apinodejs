import { container } from "tsyringe";
import { DayjsDateProvider } from "./DateProvider/Implementations/DayjsDateProvider";

container.registerSingleton<IDateProvider>(
 "DayjsDateProvider",
 DayjsDateProvider
);