import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../layouts/auth/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
 console.log('Auth Guard')
 const router = inject(Router)
 const authService = inject(AuthService)
//  
// return !!authService.authUser 
// ? true 
// : router.createUrlTree(['auth', 'login'])
return authService.verifyToken().pipe(map((isAuthenticated)=> isAuthenticated ? true :router.createUrlTree(['auth', 'login'])))
};
