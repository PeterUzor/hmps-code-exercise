import validator from 'validator';
import ValidationError from './validation-error';

export default function userValidator(user: any){
  const errors = getValidationErrors(user);
  if (errors.length) throw new ValidationError(errors);
}

export function getValidationErrors(user: any) {
  const errors = [];
  if (validator.isEmpty(user.firstName) || !validator.isLength(user.firstName, { min: 2 })) {
    errors.push({ key: 'firstName', message: 'First Name must be at least 2 characters' });
  }

  if (validator.isEmpty(user.lastName) || !validator.isLength(user.lastName, { min: 2 })) {
    errors.push({ key: 'lastName', message: 'Last Name must be at least 2 characters' });
  }

  if (validator.isEmpty(user.identificationNumber) || !validator.isLength(user.identificationNumber, { max: 6 }) || !validator.isAlpha(user.identificationNumber.substring(0,1))) {
    errors.push({ key: 'identificationNumber', message: 'Identification number must start with an alphabet and is max length of six character' });
  }

  if (validator.isEmpty(user.dateOfBirth) || isNaN(new Date(user.dateOfBirth).getTime()) || getAge(user.dateOfBirth) <= 18) {
    errors.push({ key: 'dateOfBirth', message: 'Date of birth must be a Date and age above 18' });
  }

  if (!validator.isEmail(user.email)) {
    errors.push({ key: 'email', message: 'email must be valid' });
  }
  return errors;
}

function getAge(dob: string) {
  var today = new Date();
  var birthDate = new Date(dob);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }    
  return age;
}