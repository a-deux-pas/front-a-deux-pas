import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const authService = inject(AuthService); // Inject the AuthenticationService
  const router = inject(Router); // Inject the Router

  return authService.isLoggedIn().pipe(
    map(() => true),
    catchError(() => {
      return of(router.createUrlTree(['/login'])); // Redirect to login page
    })
  );
};
