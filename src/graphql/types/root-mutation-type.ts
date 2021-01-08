import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { storage } from '../../mongo/storage';
import userValidator from '../validators/user.validator';
import { UserType } from './user.type';

export const RootMutationType = new GraphQLObjectType({
  name: 'MutationType',
  fields: () => ({
    createUser: {
      type: UserType,
      description: 'User creating',
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        identificationNumber: { type: GraphQLString },
        email: { type: GraphQLString },
        dateOfBirth: { type: GraphQLString },
      },
      resolve: (
        _value,
        { firstName, lastName, identificationNumber, email, dateOfBirth }
      ) => {
        // validate
        userValidator({ firstName, lastName, identificationNumber, email, dateOfBirth });

        const storageLength = storage.length + 1;
        storage.push({
          id: storageLength,
          firstName,
          lastName,
          identificationNumber,
          email,
          dateOfBirth,
        });
        return storage.find((x) => x.id === storageLength);
      },
    },
    updateUser: {
      type: UserType,
      description: 'User updating',
      args: {
        id: { type: GraphQLInt },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        identificationNumber: { type: GraphQLString },
        email: { type: GraphQLString },
        dateOfBirth: { type: GraphQLString },
      },
      resolve: (
        _value,
        { id, firstName, lastName, identificationNumber, email, dateOfBirth }
      ) => {
        // validate
        userValidator({ firstName, lastName, identificationNumber, email, dateOfBirth });
        const index = storage.findIndex((user) => {
          return user.id === parseInt(id, 10);
        });
        if (index !== -1) {
          Object.assign(storage[index], {
            firstName,
            lastName,
            identificationNumber,
            email,
            dateOfBirth,
          });
          return storage[index];
        }
        return Promise.reject('User not found!');
      },
    },
    deleteUser: {
      type: UserType,
      description: 'User deleting',
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve: (_value, { id }) => {
        const index = storage.findIndex((user) => {
          return user.id === parseInt(id, 10);
        });

        if (index !== -1) {
          storage.splice(index, 1);
          return { id };
        }
        return Promise.reject('User not found!');
      },
    },
  }),
});
