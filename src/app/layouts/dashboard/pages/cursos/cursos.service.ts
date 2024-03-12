import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Curso } from './models';


@Injectable()
export class CursosService{

    getCursos(){
        const cursos: Curso[]= [
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
        return of(cursos)
    }
}