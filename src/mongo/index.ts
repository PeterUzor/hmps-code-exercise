import { MongoClient } from "mongodb";

export async function connect() {
    // tslint:disable-next-line:max-line-length
    const URL = process.env.MONGO_URL || "local mongo instance connection URL";

    const client = new MongoClient(URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });

    const conn = await client.connect();
    console.log("🔗 Connected to Mongo");
    return conn.db("allocations-prod");
}