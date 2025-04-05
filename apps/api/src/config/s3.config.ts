import { env } from "process";

const config = {
    region: env.AWS_REGION,
    bucketName: env.AWS_BUCKET_NAME,
    accessKey: env.AWS_ACCESS_KEY_ID,
    secretKey: env.AWS_SECRET_ACCESS_KEY,
    endpoint: env.AWS_ENDPOINT
};

console.log(config);

export default config;