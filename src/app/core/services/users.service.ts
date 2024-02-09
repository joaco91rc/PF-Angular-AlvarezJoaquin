import { Inject, Injectable } from '@angular/core';
import { MY_USER_TOKEN } from '../injection-tokens';
import { Users } from '../../layouts/dashboard/pages/users/models';
import { Observable, delay, of, tap } from 'rxjs';
import { AlertsService } from './alerts.service';


const ROLES_DB: string[] = ['ADMIN','USER']
let USER_DB: Users[] = [
  {
    id:1,
    firstname:"Joaquin Andres",
    lastname: "Alvarez",
    email:'joaquinalvarez@gmail.com',
    password:'123456',
    role:'ADMIN'
  },
  {
    id:2,
    firstname:"Fabian Edgardo",
    lastname: "Salomone",
    email:'fabiansalomone@gmail.com',
    password:'123456',
    role:'USER'
  },
  {
    id:3,
    firstname:"Lara Jimena",
    lastname: "Estrada",
    email:'laraestrada@gmail.com',
    password:'123456',
    role:'ADMIN'
  },
  {
    id:4,
    firstname:"Federico Gaspar",
    lastname: "Alvarez",
    email:'federicoalvarezalvarez@gmail.com',
    password:'123456',
    role:'ADMIN'
  },
  {
    id:5,
    firstname:"Romina",
    lastname: "Carabajal",
    email:'rominacarabajal@gmail.com',
    password:'123456',
    role:'USER'
  },
  {
    id:6,
    firstname:"Julieta",
    lastname: "Bracco",
    email:'julietabracco@gmail.com',
    password:'123456',
    role:'USER'
  },
  {
    id:7,
    firstname:"Lucas Emanuel",
    lastname: "Velazquez",
    email:'lucasvelazquez@gmail.com',
    password:'123456',
    role:'USER'
  },
]

@Injectable()
export class UsersService {

  constructor(private alerts: AlertsService){}
   

   getUsers(){
    
    return of(USER_DB).pipe(delay(2000))
   }

   getRoles(): Observable<string[]>{
      return of (ROLES_DB).pipe(delay(1000))
   }

   createuser(payload: Users){
    USER_DB.push(payload);
    return this.getUsers();
   }

   deleteUser(userID: number){
    USER_DB = USER_DB.filter((user)=> user.id !== userID);
    return this.getUsers().pipe(tap(()=>  this.alerts.showSucces('Realizado', 'Se ha eliminado el usuario')));
   }
}
