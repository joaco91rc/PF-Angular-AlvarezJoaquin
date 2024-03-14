import { Component, EventEmitter, Output } from '@angular/core';
import { Curso } from './models';
import { CursosService } from './cursos.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { forkJoin } from 'rxjs';



@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent {
  @Output() editCourseEvent = new EventEmitter<Curso>();
displayedColumns = ['id', 'courseName','createdAt', 'actions']

dataSource : Curso[] =[];
constructor (private cursoService: CursosService, private loadingService: LoadingService){
  
}

ngOnInit(): void {
  this.getPageData();
}

getPageData(): void {
  this.loadingService.setIsLoading(true);
  
  // Solo obtenemos datos de usuarios en lugar de roles y usuarios
  this.cursoService.getCursos().subscribe({
    next: (cursos) => {
      this.dataSource = cursos;
    },
    complete: () => {
      this.loadingService.setIsLoading(false);
    }
  });
}
courseToEdit: Curso | null = null;

modoEdicion: boolean = false;

onCourseSubmitted(ev:Curso):void{
  
  this.dataSource = [...this.dataSource, {...ev, id: Math.floor(Math.random() * 1000) }];
  this.loadingService.setIsLoading(true);
  this.cursoService.createCourse({...ev, id: this.dataSource.length + 1 }).subscribe({
    next: (cursos)=> {
      this.dataSource = [...cursos]
    },
    complete: ()=> {
      this.loadingService.setIsLoading(false)
    }
  })
}

onCourseEdited(editedCourse: Curso): void {
  // Encuentra y actualiza el usuario en el arreglo dataSource
  
this.dataSource = this.dataSource.map(course =>
  course.id == editedCourse.id ? editedCourse : course
);

// Restablece el usuario seleccionado y el modo de edición
this.courseToEdit = null;
this.modoEdicion = false;
}

editarCurso(curso: Curso) {
  this.courseToEdit = { ...curso };
 this.modoEdicion= true;
 
 this.editCourseEvent.emit(curso);
  
}

eliminarCurso(curso: Curso):void {




  const confirmacion = confirm('¿Estás seguro de que deseas eliminar a este usuario?');

  if (confirmacion) {
    this.loadingService.setIsLoading(true);
    this.cursoService.deleteCourse(curso.id).subscribe({
      next: (cursos)=>{
        this.dataSource = [...cursos]
      },
      complete: ()=>{
        this.loadingService.setIsLoading(false)
      }
    });
}

}}
