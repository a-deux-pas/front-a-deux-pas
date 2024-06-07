import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { ProfileService } from '../../routes/account/profile/profile.service';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsyncValidatorService {

  constructor(private profileService: ProfileService) {}

  // Validator for unique email adress
  uniqueEmailAddressValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.profileService.isEmailAddressAlreadyExist(control.value).pipe(
        map(exist => (exist? { emailAddressExists: true } : null)),
        catchError(() => of(null))
      );
    };
  }
}
