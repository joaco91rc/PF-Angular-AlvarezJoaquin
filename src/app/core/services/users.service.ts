import { Inject, Injectable } from '@angular/core';
import { MY_USER_TOKEN } from '../injection-tokens';

@Injectable()
export class UsersService {

  constructor(@Inject(MY_USER_TOKEN) userToken: string) {

    console.log("El servicio se ha instanciado", userToken)
   }

   getUsers(){
    console.log("Se obtuvieron Usuarios de la BD",);
    return ['Juan','Joaco','Maverick']
   }
}
