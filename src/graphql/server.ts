import { ApolloServer } from "apollo-server-express";
import responseCachePlugin from "apollo-server-plugin-response-cache";
import { gqlSchema } from "./schema";

  // Root resolver
  const root = {
    message: () => 'Hello!!! I can see you.'
  };

export default function server() {
    return new ApolloServer({
        schema: gqlSchema,
        rootValue: root,
        subscriptions: {
            path: "/subscriptions",
            onConnect: async () => {
                console.log(`Subscription client connected using Apollo server's built-in SubscriptionServer.`)
            },
            onDisconnect: async () => {
                console.log(`Subscription client disconnected.`);
            },
        },
        cacheControl: {
            defaultMaxAge: 5,
        },
        introspection: true,
        plugins: [responseCachePlugin()],
    });
}
