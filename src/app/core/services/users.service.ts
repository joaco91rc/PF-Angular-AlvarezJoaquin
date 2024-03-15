import { Inject, Injectable } from '@angular/core';
import { MY_USER_TOKEN } from '../injection-tokens';
import { Users } from '../../layouts/dashboard/pages/users/models';
import { Observable, delay, of, tap } from 'rxjs';
import { AlertsService } from './alerts.service';
import { HttpClient } from '@angular/common/http';


const ROLES_DB: string[] = ['ADMIN','USER']
let USER_DB: Users[] = []

@Injectable()
export class UsersService {

  constructor(private alerts: AlertsService, private httpClient: HttpClient){}
   
  getUserById(id: number | string):Observable<Users | undefined>{
    return of (USER_DB.find((user)=>user.id ==id)).pipe(delay(2000))
  }

   getUsers(){
    
    // return of(USER_DB).pipe(delay(2000))
   return this.httpClient.get<Users[]>('http://localhost:3000/users')
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
    return this.getUsers().pipe(
      tap(()=>  this.alerts.showSucces('Realizado', 'Se ha eliminado el usuario')));
   }
}
