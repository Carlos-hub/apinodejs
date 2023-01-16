import { app } from "@shared/infra/http/app";
import  request  from "supertest";
import createConnection from "@shared/infra/typeorm"
import { Connection } from "typeorm";
import { hash } from "bcrypt";
import {v4 as uuidv4} from "uuid"

let connection:Connection;
describe("Create CategoryController", () =>{

 beforeAll(async () =>{
   connection = await createConnection();
   await connection.runMigrations();

   const id = uuidv4();
   const password = await hash("admin",8)
   await connection.query(
       `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license )
       values('${id}', 'admin', 'admin@admin.com', '${password}', true, 'now()','abcd-1324')
       `
   );
 });

 afterAll(async () =>{
  await connection.dropDatabase();
  await connection.close();
 });
  it("Should be able to create a new category",async ()=>{
   const responseToken = await request(app).post("/sessions")
   .send({
    email:"admin@admin.com",
    password: "admin"
   });
   console.log(responseToken)
   const {token} = responseToken.body.tokenReturn;
   console.log(token);
   const response = await request(app)
  .post("/categories")
  .send({
   name:"Category SuperTest",
   description:"Category Supertest",
  }).set({
   Authorization: `Bearer ${token}`
  });
  expect(response.status).toBe(201);
  });
  it("Should not be able to create a new category with same name",async ()=>{
    const responseToken = await request(app).post("/sessions").send({
     email:"admin@admin.com",
     password: "admin"
    });
    const {token} = responseToken.body.tokenReturn;
    const response = await request(app)
   .post("/categories")
   .send({
    name:"Category SuperTest",
    description:"Category Supertest",
   }).set({
    Authorization: `Bearer ${token}`
   });
   expect(response.status).toBe(400);
   });
})