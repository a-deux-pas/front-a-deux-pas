import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, catchError, debounceTime, map, of, switchMap, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AsyncValidatorService {

  constructor(private authService: AuthService) {}

  // Validator to check if credentials are correct
  credentialsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.get('email')?.value;
      const password = control.get('password')?.value;
      return this.authService.validateCredentials(email, password).pipe(
        map(isValid => isValid ? null : { invalidCredentials: true }),
        catchError(() => of({ invalidCredentials: true }))
      );
    };
  }

  // Validator to check if an email address already exists
  uniqueEmailAddressValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.authService.isEmailAddressAlreadyExist(control.value).pipe(
        map(exist => !exist ? null : { emailAddressExists: true }),
        catchError(() => of(null))
      );
    };
  }

  // Validator to check if an alias already exists
  uniqueAliasValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return control.valueChanges.pipe(
        debounceTime(200), // Adds a delay to reduce the frequency of calls
        take(1), // Takes the first emitted value and completes the Observable
        switchMap(value =>
          this.authService.isAliasAlreadyExist(value).pipe(
            map(exist => (exist ? { aliasExists : true } : null)),
            catchError(() => of(null)),
          )
        )
      );
    };
  }
}
