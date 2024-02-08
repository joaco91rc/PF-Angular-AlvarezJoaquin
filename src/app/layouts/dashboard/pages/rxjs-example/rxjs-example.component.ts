import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs-example',
  templateUrl: './rxjs-example.component.html',
  styleUrl: './rxjs-example.component.scss'
})
export class RxjsExampleComponent {
  loading = false;

  users: string[]= [];

  getUsersSubscription?: Subscription;
  constructor(){
    console.log("Se instancio el componente");
    setTimeout(()=>{
      console.log("Timeout!")
    },2000)
    console.log("FIN");

    
    this.getUsersFromPromise();
    this.getUsersFromObservable();
  }

 getUsersFromObservable():void{
  this.getUsersSubscription?.unsubscribe()
  this.loading = true;
  const getUsers$ = new Observable<string[]>((subscriber)=>{
    // setTimeout(() => {
    //   subscriber.next(['Goku','Gohan','Vegeta']);
    // }, 2000);
     setInterval(()=>{
      subscriber.next (['Goku','Gohan','Vegeta']);
      
     },1000)

  });

  this.getUsersSubscription = getUsers$.subscribe({
    next: (respuesta)=>{
      this.users = respuesta;
    },
    error: ()=>{},
    complete: ()=>{this.loading = false;}
  });


 }


  getUsersFromPromise():void{
    const getUsers = new Promise<string[]>((resolve,reject)=> {
      //reject ('No posee permisos para consultar la lista de Usuarios');
      setTimeout(()=>{
        resolve(['Goku','Gohan','Vegeta'])
      },4000)
    });

    this.loading = true
    getUsers.then((respuesta)=> {
      this.users = respuesta;
    })
    .catch((error)=> console.log(error))
    .finally(()=>{
      this.loading= false;
    })

  }
}
