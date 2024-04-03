import { Upload } from "@aws-sdk/lib-storage";
import { NodeJsClient } from "@smithy/types";

import {
    CompleteMultipartUploadCommandOutput,
    DeleteObjectCommand,
    DeleteObjectCommandOutput,
    DeleteObjectsCommand,
    GetObjectCommand,
    GetObjectCommandOutput,
    PutObjectCommandInput,
    S3Client,
} from "@aws-sdk/client-s3";

import s3Config from "../config/s3.config";

const s3Client = new S3Client({
    region: s3Config.region,
    credentials: {
        secretAccessKey: s3Config.secretKey,
        accessKeyId: s3Config.accessKey
    },
    endpoint: s3Config.endpoint,
    forcePathStyle: true
}) as NodeJsClient<S3Client>;

async function uploadFile(name: string, file: string): Promise<CompleteMultipartUploadCommandOutput> {
    const uploadConfig: PutObjectCommandInput = {
        Bucket: s3Config.bucketName,
        Key: name,
        Body: file
    };

    const r = await new Upload({
        client: s3Client,
        params: uploadConfig
    }).done();
    return r;
}

async function retriveFile(name: string): Promise<GetObjectCommandOutput> {
    const requestConfig = new GetObjectCommand({
        Bucket: s3Config.bucketName,
        Key: name
    });

    //@ts-ignore
    const response = await s3Client.send(requestConfig);
    return response;
}

async function deleteFile(name: string): Promise<DeleteObjectCommandOutput> {
    const requestConfig = new DeleteObjectCommand({
        Bucket: s3Config.bucketName,
        Key: name
    });
    //@ts-ignore
    const response = await s3Client.send(requestConfig);
    return response;
}

async function deleteFiles(names: string[]): Promise<DeleteObjectCommandOutput> {
    const requestConfig = new DeleteObjectsCommand({
        Bucket: s3Config.bucketName,
        Delete: {
            Objects: names.map(n => ({ Key: n }))
        }
    });
    //@ts-ignore
    const response = await s3Client.send(requestConfig);
    return response;
}

export {
    uploadFile,
    retriveFile,
    deleteFile,
    deleteFiles
};
