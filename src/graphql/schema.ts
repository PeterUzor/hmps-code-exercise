import { GraphQLSchema } from "graphql";
import { RootQueryType } from "./types/root-query-type";
import { RootMutationType } from "./types/root-mutation-type";

export const gqlSchema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});