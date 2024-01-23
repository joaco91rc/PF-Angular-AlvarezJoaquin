import { Component } from '@angular/core';
import { Users } from './pages/users/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false
  usuarioSeleccionado: Users | null = null;

  // Manejar el evento para editar el usuario
  onEditarUsuario(usuario: Users) {
    
    this.usuarioSeleccionado = { ...usuario };
  }
}
