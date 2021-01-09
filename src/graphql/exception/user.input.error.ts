import { ApolloError } from 'apollo-server-express';

export class UserInputError extends ApolloError {
  constructor(errors: Record<string, any>) {
    super('Validation failed', 'BAD_USER_INPUT', { errors });

    Object.defineProperty(this, 'name', { value: 'UserInputError' });
  }
}