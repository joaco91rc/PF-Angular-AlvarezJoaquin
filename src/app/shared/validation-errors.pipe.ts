import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'validationErrors'
})
export class ValidationErrorsPipe implements PipeTransform {

  transform(errors?: ValidationErrors | null, ...args: unknown[]): unknown {
    console.log(errors)
    if(!!errors){
      let messages = []
      if(errors['required']) messages.push('Este campo es requerido')
      if(errors['email']) messages.push( 'El mail es invalido')
      //if(errors['maxlength']) messages.push( `El mail no puede tener mas de ${errors['maxlength']?.requiredLength} caracteres`)
      return messages.join('. ') + '.'
    }
    return null;
  }

}
