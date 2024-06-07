import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function alreadyExistValidator(listToBrowse: Array<any>, objectProperty: string): ValidatorFn {
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

export function checkEqualityValidator(firstControlName: string, secondControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const firstControl = formGroup.get(firstControlName);
    const secondControl = formGroup.get(secondControlName);

    if (firstControl && secondControl
      && firstControl !== secondControl.value
    ) {
      return {
        mismatch: {
          rules: 'Les mots de passe ne correspondent pas. Veuillez vérifier et essayer à nouveau'
        }
      }
    }
    // return null if no errors were found in the field value
    return null;
  };
}

export function passwordValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {
  // obtain the value to be validated
    const password = control.value;
    const validations = [
      {
        regex: /.{8,}/,
        error: {
          minLength: {
            rules: 'Le mot de passe doit avoir au moins 8 caractères'
          }
        }
      },
      {
        regex: /(?=.*\d)/,
        error: {
          requiresDigit: {
            rules: 'Le mot de passe doit contenir au moins un chiffre'
          }
        }
      },
      {
        regex: /(?=.*[A-Z])/,
        error: {
          requiresUppercase: {
            rules: 'Le mot de passe doit contenir au moins une majuscule'
          }
        }
      },
      {
        regex: /(?=.*[a-z])/,
        error: {
          requiresLowercase: {
            rules: 'Le mot de passe doit contenir au moins une minuscule'
          }
        }
      },
      {
        regex: /(?=.*[$@^!%*?&])/,
        error: {
          requiresSpecialChars: {
            rules: 'Le mot de passe doit contenir au moins un caractère spécial'
          }
        }
      }
    ];

    if (!password) {
      return {
        minLength: {
          rules: 'Veuillez renseigner un mot de passe'
        }
      };
    }

    for (let validation of validations) {
      if (!validation.regex.test(password)) {
        return validation.error;
      }
    }

    return null;  // Si toutes les conditions sont remplies, retourner null (aucune erreur)
  };
}
