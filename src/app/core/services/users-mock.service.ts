import { Injectable } from "@angular/core";

@Injectable()
export class UsersMockService{
    constructor(){
        console.log("Se instancia un mock service")
    }

    getUsers(){
        console.log("Se obtuvieron Usuarios de Prueba");
        return ['Goku','Gohan','Piccolo']
       }
}