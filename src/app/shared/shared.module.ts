import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './full-name.pipe';
import { ResaltadoDirective } from './resaltado.directive';
import { Fontsize20Directive } from './fontsize20.directive';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ValidationErrorsPipe } from './validation-errors.pipe';
@NgModule({
  declarations: [
    FullNamePipe,
    ResaltadoDirective,
    Fontsize20Directive,
    ValidationErrorsPipe,
    
  ],
  imports: [
    CommonModule
  ],
  exports:[FullNamePipe,
    ResaltadoDirective,
    Fontsize20Directive,
    MatTableModule,
    MatButtonModule,
    MatDatepickerModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatInputModule,
  MatIconModule,
ValidationErrorsPipe]
})
export class SharedModule { }
