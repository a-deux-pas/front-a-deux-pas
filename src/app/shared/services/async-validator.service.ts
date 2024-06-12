import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AsyncValidatorService {

  constructor(private authService: AuthService) {}

  // Validator to check if an email address already exists
  uniqueEmailAddressValidator(isSignup: boolean): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.authService.isEmailAddressAlreadyExist(control.value).pipe(
        map(exist => {
          if (isSignup && !exist) {
            return { emailAddressNotFound: true };
          } else if (!isSignup && exist) {
            return { emailAddressExists: true };
          } else {
            return null;
          }
        }),
        catchError(() => of(null))
      );
    };
  }

  // Validator to check if password match with user email
  passwordMatchesEmailValidator(email: AbstractControl): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.authService.isPasswordMatchesEmail(email.value, control.value).pipe(
        map(correct => (!correct? { incorrectPassword : true } : null)),
        catchError(() => of(null))
      );
    };
  }

  // Validator to check if an alias already exists
  uniqueAliasValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.authService.isAliasAlreadyExist(control.value).pipe(
        map(exist => (exist? { aliasExists : true } : null)),
        catchError(() => of(null))
      );
    };
  }
}
