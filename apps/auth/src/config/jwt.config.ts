import { env } from "process";

const config = {
    secretKey: env.SECRET_KEY
};

export {
    config
};