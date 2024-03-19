import { Inject, Injectable } from '@angular/core';
import { MY_USER_TOKEN } from '../injection-tokens';
import { Users } from '../../layouts/dashboard/pages/users/models';
import { Observable, catchError, delay, mergeMap, of, tap } from 'rxjs';
import { AlertsService } from './alerts.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  environment } from '../../../environments/environment';




const ROLES_DB: string[] = ['ADMIN','USER']
let USER_DB: Users[] = []

@Injectable()
export class UsersService {

  constructor(private alerts: AlertsService, private httpClient: HttpClient){}
   

  generateString(length: number){
    const characters ='ABCDEFGHIJKRLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789'
    let result = '';
    const charactersLength = characters.length;
    for( let i = 0; i <length; i++){
      result += characters.charAt(Math.floor(Math.random()*charactersLength))
    }
    return result
  }
  getUserById(id: number | string):Observable<Users | undefined>{
    // return of (USER_DB.find((user)=>user.id ==id)).pipe(delay(2000))
    return this.httpClient.get<Users>(`${environment.apiUrl}/users/${id}`)
  }

   getUsers(){
    
    // let headers = new HttpHeaders();
    // headers = headers.append('X-token',localStorage.getItem('token') || '')
    // return of(USER_DB).pipe(delay(2000))
   return this.httpClient.get<Users[]>(`${environment.apiUrl}/users`).pipe(catchError(()=>{
    this.alerts.showError('Error al cargar los Usuarios')
    return of()
   }))
   }

   getRoles(): Observable<string[]>{
      return of (ROLES_DB).pipe(delay(1000))
   }

   createuser(payload: Users){
    // USER_DB.push(payload);
    // return this.getUsers();
    return this.httpClient.post<Users>(`${environment.apiUrl}/users`,payload).pipe(mergeMap(()=>this.getUsers()))
   }

   deleteUser(userID: number){
    // USER_DB = USER_DB.filter((user)=> user.id !== userID);
    // return this.getUsers().pipe(
    //   tap(()=>  this.alerts.showSucces('Realizado', 'Se ha eliminado el usuario')));
    return this.httpClient.delete<Users>(`${environment.apiUrl}/users/${userID}`)
    .pipe(mergeMap(()=>this.getUsers()))
   }
}
