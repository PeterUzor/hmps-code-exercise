import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

export const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: {
        id: { type: GraphQLInt },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        identificationNumber: { type: GraphQLString },
        email: { type: GraphQLString },
        dateOfBirth: { type: GraphQLString }
    },
});