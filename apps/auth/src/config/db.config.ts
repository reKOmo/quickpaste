import { env } from "process";

const config = {
    host: env.PG_HOST,
    port: parseInt(env.PG_PORT),
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.PG_DB_NAME,
    ssl: true
};

export {
    config
};