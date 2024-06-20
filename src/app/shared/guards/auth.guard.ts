import {
  CanActivateFn,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable, map} from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

//The authGuard is defined as a CanActivateFn function that can return multiple types (Observable, Promise, boolean, UrlTree).
export const AuthGuard: CanActivateFn = ():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const authService = inject(AuthService); // Inject the AuthenticationService
  const router = inject(Router); // Inject the Router

  // Checking the user's login status
  return authService.isLoggedIn().pipe(
    map(isLoggedIn => isLoggedIn ? true : router.createUrlTree(['/']))
  );
};
