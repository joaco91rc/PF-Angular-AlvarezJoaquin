import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './cursos.component';
import { SharedModule } from '../../../../shared/shared.module';
import {CursosService} from './cursos.service'
import { MatIconModule } from '@angular/material/icon';
import { CourseFormComponent } from './components/course-form/course-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CursosComponent,
    CourseFormComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    SharedModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  providers:[
    CursosService
  ]
})
export class CursosModule { }
