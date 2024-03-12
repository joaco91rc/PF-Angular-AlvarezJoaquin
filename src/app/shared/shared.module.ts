import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './full-name.pipe';
import { ResaltadoDirective } from './resaltado.directive';
import { Fontsize20Directive } from './fontsize20.directive';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    FullNamePipe,
    ResaltadoDirective,
    Fontsize20Directive,
    
  ],
  imports: [
    CommonModule
  ],
  exports:[FullNamePipe,ResaltadoDirective,Fontsize20Directive, MatTableModule,MatButtonModule]
})
export class SharedModule { }
