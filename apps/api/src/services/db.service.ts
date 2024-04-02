import { Pool } from "pg";
import { config } from "../config/db.config";

const pool = new Pool({
    user: config.user,
    password: config.password,
    host: config.host,
    port: config.port,
    database: config.database,
    ssl: config.ssl
});

export async function query(query: string, params: unknown[]) {
    return await pool.query(query, params);
}

export async function safeQuery(query: string, params: unknown[]): Promise<unknown> {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");
        const res = client.query(query, params);
        await client.query("COMMIT");
        return res;
    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    }
}

export async function getClient() {
    const client = await pool.connect();

    const query = client.query;
    const release = client.release;

    // set a timeout of 5 seconds, after which we will log this client's last query
    const timeout = setTimeout(() => {
        console.error('A client has been checked out for more than 5 seconds!');
        console.error(`The last executed query on this client was: ${client["lastQuery"]}`);
    }, 5000);

    // monkey patch the query method to keep track of the last query executed
    client.query = (...args: unknown[]) => {
        client["lastQuery"] = args;
        return query.apply(client, args);
    };

    client.release = () => {
        // clear our timeout
        clearTimeout(timeout);
        // set the methods back to their old un-monkey-patched version
        client.query = query;
        client.release = release;
        return release.apply(client);
    };

    return client;
}