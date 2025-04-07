import { env } from "process";
var config = {
    host: env.PG_HOST,
    port: parseInt(env.PG_PORT),
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.PG_DB_NAME,
    ssl: env.NODE_ENV == "production"
};
export { config };
