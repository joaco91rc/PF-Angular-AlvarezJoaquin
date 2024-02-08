import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxjsIntroductionComponent } from './rxjs-introduction.component';



@NgModule({
  declarations: [
    RxjsIntroductionComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[RxjsIntroductionComponent]
})
export class RxjsIntroductionModule { }
