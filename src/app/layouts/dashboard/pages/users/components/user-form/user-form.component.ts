import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from '../../models/index';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnChanges  {

@Input() 
userToEdit: Users | null = null;
// @Output()
// userSubmitted =new EventEmitter();

@Input() dataSource: Users[] = [];
@Output() userSubmitted = new EventEmitter<Users>();
@Output() userEdited = new EventEmitter<Users>();
@Output() editUserEvent = new EventEmitter<Users>();

userForm!: FormGroup;
// modoEdicion: boolean = false; // O el valor inicial que desees

private _modoEdicion: boolean = false;

get modoEdicion(): boolean {
  return this._modoEdicion;
}

@Input()
set modoEdicion(value: boolean) {
  this._modoEdicion = value;
}
constructor(private fb:FormBuilder){
  this.userForm = this.fb.group({
    firstname:this.fb.control('', Validators.required),
    lastname:this.fb.control('', Validators.required),
    password:this.fb.control('', Validators.required),
    email:this.fb.control('', Validators.required),
    role:this.fb.control('', Validators.required)
  })
}
  ngOnChanges(changes: SimpleChanges): void {
    if ('userToEdit' in changes && this.userToEdit) {
      this.userForm.patchValue({
        firstname: this.userToEdit.firstname,
        lastname: this.userToEdit.lastname,
        password: this.userToEdit.password,
        email: this.userToEdit.email,
        role: this.userToEdit.role
      });
      this.modoEdicion = true;
    }else{
      this.userForm.reset();
      this.modoEdicion = false;
    }
  }

ngOnInit(): void {
  this.modoEdicion =false;
 
  // Inicializar el formulario
  this.userForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', Validators.required],
    role: ['', Validators.required]
  });

  // Verificar si hay un usuario para editar y cargar sus datos en el formulario
  if (this.userToEdit) {
    this.userForm.patchValue({
      firstname: this.userToEdit.firstname,
      lastname: this.userToEdit.lastname,
      password: this.userToEdit.password,
      email: this.userToEdit.email,
      role: this.userToEdit.role
    });
  }
}

onSubmit(): void {
  if (this.userForm.invalid) {
    this.userForm.markAllAsTouched();
  } else {
    const editedUser: Users = { ...this.userToEdit, ...this.userForm.value }; // Copia del usuario antes de modificarlo
    if (this.modoEdicion) {
      this.userEdited.emit(editedUser);
    } else {
      this.userSubmitted.emit(this.userForm.value); // Usar this.userForm.value aquí
    }
    
    this.userForm.reset();
    this.userForm.markAsPristine();
    this.userForm.markAsUntouched();
  }
}



editarUsuario(usuario: Users) {
  this.userToEdit = { ...usuario };
  this.modoEdicion = true;

  // Emitir evento de edición
  this.editUserEvent.emit(this.userToEdit);

  // Cargar datos en el formulario
  this.userForm.patchValue({
    firstname: this.userToEdit.firstname,
    lastname: this.userToEdit.lastname,
    password: this.userToEdit.password,
    email: this.userToEdit.email,
    role: this.userToEdit.role
  });
}

}

