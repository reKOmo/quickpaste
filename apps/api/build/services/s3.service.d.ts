import AWS from "aws-sdk";
declare function uploadFile(name: string, file: string): Promise<AWS.S3.ManagedUpload.SendData>;
declare function retriveFile(name: string): Promise<AWS.S3.GetObjectOutput>;
declare function deleteFile(name: string): Promise<AWS.S3.DeleteObjectOutput>;
declare function deleteFiles(names: string[]): Promise<AWS.S3.DeleteObjectOutput>;
export { uploadFile, retriveFile, deleteFile, deleteFiles };
//# sourceMappingURL=s3.service.d.ts.map