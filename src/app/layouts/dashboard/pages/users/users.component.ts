import { Component } from '@angular/core';
import { Users } from './models/index';





@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  displayedColumns: string[] = ['Id', 'NombreCompleto', 'Email', 'Rol'];
  dataSource : Users[] =[
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
  ];

  onUserSubmitted(ev:Users):void{
    
    this.dataSource = [...this.dataSource, {...ev, id: Math.floor(Math.random() * 1000) }];
  }


}
