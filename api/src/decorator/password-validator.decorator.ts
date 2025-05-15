import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class PasswordValidatorConstraint
  implements ValidatorConstraintInterface
{
  validate(password: string) {
    if (!password) return true;

    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) /* MAISCULA */ &&
      /[a-z]/.test(password) /* MINUSCLA */ &&
      /[\W_]/.test(password) /* NUMERO */ &&
      /\d/.test(password) /* CARACTERE */
    );
  }

  defaultMessage() {
    return 'The password must be at least 8 characters long, including one uppercase letter, one lowercase letter, one number, and one special character.';
  }
}
export function IsValidPassword(opt?: ValidationOptions) {
  return function (obj: object, name: string) {
    registerDecorator({
      target: obj.constructor,
      propertyName: name,
      options: opt,
      constraints: [],
      validator: PasswordValidatorConstraint,
    });
  };
}
