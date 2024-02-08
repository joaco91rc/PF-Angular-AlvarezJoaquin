import { Inject, Injectable } from '@angular/core';
import { MY_USER_TOKEN } from '../injection-tokens';
import { Users } from '../../layouts/dashboard/pages/users/models';
import { Observable, delay, of } from 'rxjs';


const ROLES_DB: string[] = ['ADMIN','USER']
const USER_DB: Users[] = [
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

  constructor(){}
   

   getUsers(){
    
    return of(USER_DB).pipe(delay(2000))
   }

   getRoles(): Observable<string[]>{
      return of (ROLES_DB).pipe(delay(1000))
   }
}
