import { Category } from "../model/Category";



// DTO => Data transfer object
interface ICreateCategoryDTO {
    name:string;
    description:string;
}

 interface ICategoryRespository{
     findByName(name:string):Category;
     list():Category[];
     create({name,description}:ICreateCategoryDTO):void;

 }

 export {ICategoryRespository, ICreateCategoryDTO}