import { AbstractControl, ValidationErrors } from "@angular/forms";

export function alreadyExistValidator(listToBrowse: Array<any>, objectProperty: string): ValidationErrors | null {
  return (control:AbstractControl) : ValidationErrors | null => {
  // obtain the value to be validated
  const value = control.value;
  // return null if no errors were found in the field value
  if (!value) {
    return null;
  }
  // check if the element is already in the list
  const isAlreadyRegistered = listToBrowse.some(element => element[objectProperty] === value);
  // return an error if it's the case
  return isAlreadyRegistered ? {alreadyExists: true} : null;
  }
}
