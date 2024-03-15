import { Component } from '@angular/core';
import { Users } from './pages/users/models';
import {  ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false
  usuarioSeleccionado: Users | null = null;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService){

  }

  // Manejar el evento para editar el usuario
  onEditarUsuario(usuario: Users) {
    
    this.usuarioSeleccionado = { ...usuario };
  }
  logout():void{
    // /dashboard/users ejemplo 
    //this.router.navigate(['users'], {relativeTo:this.route})
    this.authService.logout();


  }
}
