import { getValidationErrors } from '../src/graphql/validators/user.validator';
const userdata = {
    "id": 1,
    "firstName": "John",
    "lastName": "Smith",
    "identificationNumber": "e12345",
    "email": "a@a.com",
    "dateOfBirth": "2000/01/30"
  };

describe("User Validator", () => {
    beforeEach(() => {
        jest.resetModules();
      })
    test("should return no validation errors", () => {
      expect(getValidationErrors(userdata).length).toEqual(0);
    });
    test("should return errors for first name is only one character", () => {
        userdata.firstName = 'w';
        const errors = getValidationErrors(userdata);
        expect(errors.length).toEqual(1);
        expect(errors[0].key).toEqual('firstName');
        expect(errors[0].message).toEqual('First Name must be at least 2 characters');
      });

      test("should return errors for last name is only one character", () => {
        userdata.lastName = 'w';
        const errors = getValidationErrors(userdata);
        console.log(errors);
        expect(errors.length).toEqual(1);
        expect(errors[0].key).toEqual('lastName');
      });

    //   test("should return error for email being wrong", () => {
    //     userdata.email = 'a,gfidf.com';
    //     const errors = getValidationErrors(userdata);
    //     expect(errors.length).toEqual(1);
    //     expect(errors[0].key).toEqual('email');
    //   });

    //   test("should return error because id is starts with number", () => {
    //     userdata.identificationNumber = '375868';
    //     const errors = getValidationErrors(userdata);
    //     expect(errors.length).toEqual(1);
    //     expect(errors[0].key).toEqual('identificationNumber');
    //   });

    //   test("should return error because id length is greater than 6", () => {
    //     userdata.identificationNumber = 'w3475832';
    //     const errors = getValidationErrors(userdata);
    //     expect(errors.length).toEqual(1);
    //     expect(errors[0].key).toEqual('identificationNumber');
    //   });
    //   test("should return error because date is not valid", () => {
    //     userdata.dateOfBirth = '5738-34-23454';
    //     const errors = getValidationErrors(userdata);
    //     expect(errors.length).toEqual(1);
    //     expect(errors[0].key).toEqual('dateOfBirth');
    //   });
    //   test("should return error because date is 18 years old", () => {
    //     userdata.dateOfBirth = '2002-01-01';
    //     const errors = getValidationErrors(userdata);
    //     expect(errors.length).toEqual(1);
    //     expect(errors[0].key).toEqual('dateOfBirth');
    //   });
    //   test("should return error because date is less than 18 years old", () => {
    //     userdata.dateOfBirth = '2019-01-01';
    //     const errors = getValidationErrors(userdata);
    //     expect(errors.length).toEqual(1);
    //     expect(errors[0].key).toEqual('dateOfBirth');
    //   });
    //   test("should return error because date is less than 18 years old", () => {
    //     userdata.dateOfBirth = '2019-01-01';
    //     userdata.identificationNumber = 'w3475832';
    //     userdata.email = 'a,gfidf.com';
    //     const errors = getValidationErrors(userdata);
    //     expect(errors.length).toEqual(3);
    //   });
  });