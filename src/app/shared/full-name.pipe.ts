import { Pipe, PipeTransform } from '@angular/core';
import { Users } from '../layouts/dashboard/pages/users/models';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: Users, ...args: unknown[]): string {
    return value.firstname.toUpperCase() + ' ' + value.lastname.toUpperCase();
  }

}
