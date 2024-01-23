import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective implements OnChanges {

  @Input()
  color = 'ligth-blue';
  constructor(private elementref: ElementRef, private renderer: Renderer2) { 

    
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.renderColor();
  }
  renderColor():void{

    this.renderer.setStyle(this.elementref.nativeElement, 'background-color', this.color)
  }

}
