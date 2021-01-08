import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UserType } from "./user.type";
import { storage } from '../../mongo/storage';

export const RootQueryType = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getUsers: {
            type: new GraphQLList(UserType),
            resolve() {
                // Storage is replacing the DB until the DB is implemented
                return storage;
            },
        },
        getUserById: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(_value, { id }) {
                // Storage is replacing the DB until the DB is implemented
                return storage.find(x => x.id === id);
            },
        },
    },
});