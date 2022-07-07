import {v4 as uuidV4} from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("specifications")
class Specification{
    @PrimaryColumn()
    id?: string;
    @Column()
    name: string | undefined;
    @Column()
    description:string | undefined;
    @CreateDateColumn()
    created_at:Date | undefined;


    constructor(){
        if(!this.id){
            this.id = uuidV4();
        }
    }
}

export {Specification}