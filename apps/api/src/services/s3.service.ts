import AWS from "aws-sdk";
import s3Config from "../config/s3.config";

AWS.config.update({
    region: s3Config.region,
    s3ForcePathStyle: true
});

const s3endpoint = process.env.NODE_ENV === 'development' ? { endpoint: new AWS.Endpoint(s3Config.endpoint) } : {};

const S3 = new AWS.S3(s3endpoint);

function uploadFile(name: string, file: string): Promise<AWS.S3.ManagedUpload.SendData> {
    const uploadConfig: AWS.S3.PutObjectRequest = {
        Bucket: s3Config.bucketName,
        Key: name,
        Body: file
    };


    return new Promise((resolve, reject) => {
        S3.upload(uploadConfig, (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function retriveFile(name: string): Promise<AWS.S3.GetObjectOutput> {
    const requestConfig: AWS.S3.GetObjectRequest = {
        Bucket: s3Config.bucketName,
        Key: name
    };

    return new Promise((resolve, reject) => {
        S3.getObject(requestConfig, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function deleteFile(name: string): Promise<AWS.S3.DeleteObjectOutput> {
    const requestConfig: AWS.S3.DeleteObjectRequest = {
        Bucket: s3Config.bucketName,
        Key: name
    };

    return new Promise((resolve, reject) => {
        S3.deleteObject(requestConfig, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function deleteFiles(names: string[]): Promise<AWS.S3.DeleteObjectOutput> {
    const requestConfig: AWS.S3.DeleteObjectsRequest = {
        Bucket: s3Config.bucketName,
        Delete: {
            Objects: names.map(n => ({ Key: n }))
        }
    };

    return new Promise((resolve, reject) => {
        S3.deleteObjects(requestConfig, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

export {
    uploadFile,
    retriveFile,
    deleteFile,
    deleteFiles
};