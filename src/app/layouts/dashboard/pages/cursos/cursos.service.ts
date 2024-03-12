import { Injectable } from "@angular/core";
import { Observable, delay, of, tap } from "rxjs";
import { Curso } from './models';
import { AlertsService } from "../../../../core/services/alerts.service";


let CURSOS_DB: Curso[] = [

    {
        id:1,
        curso: 'Angular',
        fechaCreacion: new Date(),
    },
    {
        id:2,
        curso: 'Javascript',
        fechaCreacion: new Date(),
    },
    {
        id:3,
        curso: 'ReactJS',
        fechaCreacion: new Date(),
    },
    {
        id:4,
        curso: 'C#',
        fechaCreacion: new Date(),
    },
    {
        id:1,
        curso: 'SQL Server',
        fechaCreacion: new Date(),
    },
    
]


@Injectable()
export class CursosService{

    constructor(private alerts: AlertsService){}

    

    getCourseById(id: number | string):Observable<Curso | undefined>{
        return of (CURSOS_DB.find((course)=>course.id ==id)).pipe(delay(2000))
      }
    
       getCursos(){
        
        return of(CURSOS_DB).pipe(delay(2000))
       }

    createCourse(payload: Curso){
        CURSOS_DB.push(payload);
        return this.getCursos();
       }
    deleteCourse(cursoID: number){
        CURSOS_DB = CURSOS_DB.filter((curso)=> curso.id !== cursoID);
        return this.getCursos().pipe(tap(()=>  this.alerts.showSucces('Realizado', 'Se ha eliminado el usuario')));
       }

       
}