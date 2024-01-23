import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFontsize20]'
})
export class Fontsize20Directive {

  constructor(private elementref: ElementRef, private renderer: Renderer2) { 
    this.renderer.setStyle(this.elementref.nativeElement, 'font-size', '20px');
  }

}
