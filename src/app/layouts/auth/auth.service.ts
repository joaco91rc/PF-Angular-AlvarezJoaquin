import { Inject, Injectable } from "@angular/core";
import { Users } from "../dashboard/pages/users/models";
import { Router } from "@angular/router";
import { AlertsService } from "../../core/services/alerts.service";
import { delay, finalize, map, of, tap } from "rxjs";
import { LoadingService } from "../../core/services/loading.service";

interface LoginData {
    email: null | string,
    password: null | string
}

const MOCK_USER ={
    id:56,
    email: 'prueba@gmail.com',
    firstname: 'Nombre Prueba',
    lastname:'Apellido Prueba',
    password: '123456',
   role: 'ADMIN'
   
}
@Injectable({providedIn:'root'})

export class AuthService{
authUser: Users | null = null

constructor(private router: Router , private alerts: AlertsService, private loadingService: LoadingService ){

}

 private setAuthUser(mockUser: Users): void{
    this.authUser = mockUser
    localStorage.setItem('token','gukasvbknakhsf12467uhasf78tasgf1')
 }

    login(data: LoginData):void{
        

       if(data.email === MOCK_USER.email && data.password === MOCK_USER.password){
        this.authUser =MOCK_USER
        localStorage.setItem('token','gukasvbknakhsf12467uhasf78tasgf1')    
        this.router.navigate(['dashboard', 'home'])
       } else{
        return this.alerts.showError('Email o Contraseña Invalidos')
       }
            
        
        
    }

    logout():void{
        this.authUser =null;
        this.router.navigate(['auth','login'])
        localStorage.removeItem('token')
    }


    verifyToken(){
        this.loadingService.setIsLoading(true)
        return of(localStorage.getItem('token')).pipe(delay(2000),map((response)=> !!response),
        tap(()=>{
            this.setAuthUser(MOCK_USER)
        }),
        finalize(()=>this.loadingService.setIsLoading(false)))
    }


}