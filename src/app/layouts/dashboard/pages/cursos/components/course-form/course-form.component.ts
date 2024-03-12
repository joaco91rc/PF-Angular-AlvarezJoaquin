import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Curso } from '../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent  implements OnChanges{
  @Input() 
  courseToEdit: Curso | null = null;
  // @Output()
  // userSubmitted =new EventEmitter();
  
  @Input() dataSource: Curso[] = [];
  @Output() courseSubmitted = new EventEmitter<Curso>();
  @Output() courseEdited = new EventEmitter<Curso>();
  @Output() editCourseEvent = new EventEmitter<Curso>();
  
  courseForm!: FormGroup;
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
    this.courseForm = this.fb.group({
      curso:this.fb.control('', Validators.required),
      fechaCreacion:this.fb.control('', Validators.required),
      
    })
  }

  
    ngOnChanges(changes: SimpleChanges): void {
      if ('courseToEdit' in changes && this.courseToEdit) {
        this.courseForm.patchValue({
          
          curso: this.courseToEdit.curso,
          fechaCreacion: new Date(this.courseToEdit.fechaCreacion).toLocaleDateString('es-ES'),
          
        });
        this.modoEdicion = true;
      }else{
        this.courseForm.reset();
        this.modoEdicion = false;
      }
    }
  
  ngOnInit(): void {
    this.modoEdicion =false;
   
    // Inicializar el formulario
    this.courseForm = this.fb.group({
      curso: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      
    });
  
    // Verificar si hay un usuario para editar y cargar sus datos en el formulario
    if (this.courseToEdit) {
      this.courseForm.patchValue({
        curso: this.courseToEdit.curso,
          fechaCreacion: this.courseToEdit.fechaCreacion,
          
        
      });
    }
  }
  
  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      const editedCourse: Curso = { ...this.courseToEdit, ...this.courseForm.value }; // Copia del usuario antes de modificarlo
      if (this.modoEdicion) {
        this.courseEdited.emit(editedCourse);
      } else {
        this.courseSubmitted.emit(this.courseForm.value); // Usar this.userForm.value aquí
      }
      
      this.courseForm.reset();
      this.courseForm.markAsPristine();
      this.courseForm.markAsUntouched();
    }
  }
  
  
  
  editarCurso(curso: Curso) {
    this.courseToEdit = { ...curso };
    this.modoEdicion = true;
  
    // Emitir evento de edición
    this.editCourseEvent.emit(this.courseToEdit);
  
    // Cargar datos en el formulario
    this.courseForm.patchValue({
      curso: this.courseToEdit.curso,
      fechaCreacion: this.courseToEdit.fechaCreacion,
      
      
    });
  }
}
