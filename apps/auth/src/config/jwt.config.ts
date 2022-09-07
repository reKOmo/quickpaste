import { env } from "process";

const config = {
    secretKey: env.JWT_SECRET_KEY
};

export {
    config
};