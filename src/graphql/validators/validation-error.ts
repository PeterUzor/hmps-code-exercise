import { GraphQLError } from 'graphql';

class ValidationError extends GraphQLError {
  constructor(errors: any) {
    super('The request is invalid.');
    this.message = errors.reduce((result: any, error: any) => {
      if (Object.prototype.hasOwnProperty.call(result, error.key)) {
        result[error.key].push(error.message);
      } else {
        result[error.key] = [error.message];
      }
      return result;
    }, {});
  }
}

export default ValidationError;