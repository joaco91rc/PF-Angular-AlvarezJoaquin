import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Users } from './models/index';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersService } from '../../../../core/services/users.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { forkJoin, Subscription } from 'rxjs';








@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent  implements OnInit{
  @Output() editUserEvent = new EventEmitter<Users>();
 
  displayedColumns: string[] = ['Id', 'NombreCompleto', 'Email', 'Rol' ,'Acciones'];
  dataSource : Users[] =[];
  roles: string[] = [];
  constructor (private userService: UsersService, private loadingService: LoadingService){


  }
  ngOnInit(): void {
    this.getPageData();
  }

  getPageData():void{
    this.loadingService.setIsLoading(true);
    forkJoin([this.userService.getRoles(),
    this.userService.getUsers()]).subscribe({
      next: (value) =>{
        this.roles = value[0],
        this.dataSource = value[1]
      },
      complete: ()=>{
        this.loadingService.setIsLoading(false);
      }
    })
    
  }
  userToEdit: Users | null = null;
  
  modoEdicion: boolean = false;
  
  onUserSubmitted(ev:Users):void{
    
    this.dataSource = [...this.dataSource, {...ev, id: Math.floor(Math.random() * 1000) }];
    this.loadingService.setIsLoading(true);
    this.userService.createuser({...ev, id: Math.floor(Math.random() * 1000) }).subscribe({
      next: (users)=> {
        this.dataSource = [...users]
      },
      complete: ()=> {
        this.loadingService.setIsLoading(false)
      }
    })
  }

  onUserEdited(editedUser: Users): void {
    // Encuentra y actualiza el usuario en el arreglo dataSource
    
  this.dataSource = this.dataSource.map(user =>
    user.id === editedUser.id ? editedUser : user
  );

  // Restablece el usuario seleccionado y el modo de edición
  this.userToEdit = null;
  this.modoEdicion = false;
  }


  editarUsuario(usuario: Users) {
    this.userToEdit = { ...usuario };
   this.modoEdicion= true;
   
   this.editUserEvent.emit(usuario);
    
  }
  
  eliminarUsuario(usuario: Users):void {




    const confirmacion = confirm('¿Estás seguro de que deseas eliminar a este usuario?');

    if (confirmacion) {
      this.loadingService.setIsLoading(true);
      this.userService.deleteUser(usuario.id).subscribe({
        next: (users)=>{
          this.dataSource = [...users]
        },
        complete: ()=>{
          this.loadingService.setIsLoading(false)
        }
      });
  }

}
}
